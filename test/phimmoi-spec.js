'use strict'
const test = require('ava')
const phimmoi = require('../lib/videos/phimmoi')

const aes = require('../lib/aes')

test('phimmoi search videos', async t => {
  const videos = await phimmoi.search('kubo')
  t.is(videos.length, 1)
})

test.only('decode aes', async t => {
  const url = 'U2FsdGVkX1\\/VqYDmwy6dyGC5TcL6HWNpBSiYyXEeJe9whGxVuDKoyeZv9PkaqhZwjXCoPcXxlodpNxeTa2GlfzI+vZqMguqc2jF9PTH+Y5E='
  const pass = 'PhimMoi.Net@116213'
  const pass2 = 'LQ4VM9HjX3xwcf1589364896e1780af3'

  t.is(aes.dec(url, pass2), 'a')
})
