'use strict'
const express = require('express')
const shortUrl = require('./tiny-url')

const app = express()

app.get('/', (req, res) => {
  res.end('Hello World')
})

app.get('/*', (req, res) => {
  shortUrl.shorten(req.params, (err, url) => {
    if (err) {
      res.json({
        error: err.toString()
      })
    }
    console.log(url)
    res.json({
      original_url: req.params,
      short_url: url
    })
  })
})

app.listen(3000)
