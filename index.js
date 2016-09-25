'use strict'
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.end('Hello World')
})

app.get('/*', (req, res) => {
  console.log(req.params)
  res.json(req.params)
})

app.listen(3000)
