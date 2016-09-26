'use strict'
const parse = require('url').parse
const express = require('express')
const isUri = require('valid-url').isUri
const tinyUrl = require('./tiny-url')

const app = express()

app.get('/', (req, res) => {
  res.send('Your url needs to be in the path')
})

app.get('/*', (req, res) => {
  const params = req.params
  const uri = params[0]
  if (!isUri(uri) || !parse(uri.slice(1)).hostname) {
    return res
      .status(400)
      .json({
        error: 'Bad Request',
        message: `'${uri.slice(1)}' is not a valid URL`
      })
  }
  tinyUrl.shorten(uri, (err, shortened) => {
    if (err) {
      return res
        .status(500)
        .json({ error: err.toString() })
    }
    res.json({
      original_url: uri,
      short_url: shortened
    })
  })
})

app.listen(3000, () => console.log('listening on 3000'))
