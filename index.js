'use strict'

require('dotenv').config({ silent: true })
require('now-logs')('phim.clgt.vn')
require('./lib/array-concatAll')

const server = require('./lib/server')

const port = process.env.PORT || 3100

server.listen(port, () => {
  console.log(`app run on http://0.0.0.0:${port}`)
})
