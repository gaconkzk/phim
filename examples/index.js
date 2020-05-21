const server = require('../lib/server')

server.listen(3100, () => {
  console.log(`app run on http://0.0.0.0:${3100}`)
  server.isStarted = true
})
