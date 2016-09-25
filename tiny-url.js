const request = require('request')

module.exports = {
  shorten (url, callback) {
    if (typeof callback !== 'function') {
      throw new Error('shorten requires a call back for the second argument')
    }

    const uri = 'http://tinyurl.com/api-create.php?url='
    request(uri + encodeURIComponent(url), (err, res, body) => {
      if (err) return callback(err)
      callback(null, body)
    })
  }
}
