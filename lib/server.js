'use strict'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const finalhandler = require('finalhandler')
const app = require('./router')
const http = require('http')

module.exports = http.createServer(
  (req, res) => app(
    req, res, finalhandler(req, res)
  )
)
