'use strict'

const aes = require('../aes')
const urllib = require('urllib')
const video = require('../video')
const escapeHtml = require('escape-html')

exports.index = (req, res, next) => {
  res.render('home.html', { videos: [] })
}

exports.watch = (req, res, next) => {
  if (!req.query.id) {
    return res.end('invalid id')
  }
  let id = []
  try {
    id = aes.dec(
      Buffer.from(req.query.id, 'base64').toString('ascii'),
      process.env.SECRET
    )
  } catch (err) {
    console.log(err)
    return res.end('ID không hợp lệ')
  }

  const [provider, url] = id.split('|')
  video
    .findMedias({ provider, url })
    .then(medias => {
      return res.render('watch.html', {
        medias,
        video: medias[0]
      })
    })
    .catch(console.log)
}

exports.playlist = (req, res, next) => {
  if (!req.params.link) {
    return res.end('invalid link')
  }

  if (!req.params.ref) {
    return res.end('missing referer')
  }

  // todo replace me dom with known dom
  // call them and return data
  return urllib.request(req.params.link, {
    headers: {
      referer: res.params.ref
    }
  }).then(r => res.write(r.data))
}

exports.info = (req, res, next) => {
  if (!req.query.id) {
    return res.end('invalid id')
  }
  let id = []
  try {
    id = aes.dec(
      Buffer.from(req.query.id, 'base64').toString('ascii'),
      process.env.SECRET
    )

    console.log(id)
  } catch (err) {
    console.log(err)
    return res.end('ID không hợp lệ')
  }

  const [provider, url] = id.split('|')

  console.log('getting info of ', provider, url)
  video
    .findMedias({ provider, url })
    .then(medias => {
      res.setHeader('referer', medias.referer)
      res.json(medias)
    })
    .catch(err => {
      res.statusCode = 412
      if (typeof err === 'string')
        res.end(JSON.stringify({msg: err}))
      else
        res.end(JSON.stringify({err}))
    })
}

exports.changelog = (req, res, next) => {
  res.render('changelog.html')
}

exports.handleApi = (req, res, next) => {
  if (!req.query.q) {
    return next(new Error('mising query q'))
  }
  const q = escapeHtml(req.query.q)
  video
    .search(q)
    .then(videos => {
      let varr = videos
        .map(v => Object.assign({}, v, {
          hash: Buffer.from(aes.enc(v.provider + '|' + v.url, process.env.SECRET)).toString('base64')
        }))
      return res.json(varr)
    })
    .catch(next)
}

exports.watchmovie = (req, res, next) => {
  if (!req.params.url) {
    res.end('url not found')
  }

  let url = JSON.parse(aes.dec(Buffer.from(req.params.url, 'base64').toString('ascii'), process.env.SECRET))
  let result = video.watchmovie(url)
    .then(r => res.end(r))
    .catch(e => res.end(e))
    // then(r => {
    //   res.write(r)
    //   res.end()
    // })
    // .catch(e => res.error(e))
}

exports.segment = (req, res, next) => {
  if (!req.params.url) {
    res.end('url not found')
  }

  let url = JSON.parse(aes.dec(Buffer.from(req.params.url, 'base64').toString('ascii'), process.env.SECRET))
  let result = video.segment(url, req.params.segment, res)
    .catch(e => res.end('End'))
    // .then(r => res.end(r))
    // .catch(e => res.end(e))
}
