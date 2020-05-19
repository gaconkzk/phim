const urllib = require('urllib')
const video = require('../video')
const escapeHtml = require('escape-html')

const aes = require("../aes");
const phimmoi = require('../videos/phimmoi/constant')

exports.types = (req, res, next) => {
  res.json(phimmoi.types)
}

exports.search = (req, res, next) => {
  let params = {
    type: req.query.t,
    query: req.query.q,
    category: req.query.c,
    country: req.query.f,
    year: req.query.y,
    page: req.query.p || 1
  }
  video
    .search(params)
    .then(videos => {
      let varr = videos.map(v => Object.assign({}, v, {
        hash: new Buffer(aes.enc(v.provider + '|' + v.url, process.env.SECRET)).toString('base64')
      }))
      return res.json(varr)
    })
    .catch(function(err) {
      res.json([])
    })
}
