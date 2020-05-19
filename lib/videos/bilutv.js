// document['domain'] + '4590481877' + _0x55bax2b
'use strict'

const qs = require('querystring')
const aes = require('../aes')
const got = require('got')
const urllib = require('urllib')
const parse = require('fast-json-parse')
const cheerio = require('cheerio')
const provider = 'BL'
const DOMAIN = 'https://bilutv.org'

const searchOptions = {
  headers: {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.3",
    "upgrade-insecure-requests": 1,
    'content-type': 'text/html;charset=UTF-8'
  },
  timeout: 5000,
  retries: 0,
}

exports.search = ({ query, type, category, country, year, page }) => {
  let url = `${DOMAIN}/`
  if (query) {
    let q = qs.escape(query)
    url = `${url}tim-kiem/${q}.html`
  // } else if (type) {
  //   url = `${url}${type}/`
  //   if (category) {
  //     url = `${url}/${category}/`
  //   }
  //   if (country) {
  //     url = `${url}/${country}/`
  //   }
  //   if (year) {
  //     url = `${url}/${year}/`
  //   }
  //   if (page>1) {
  //     url = `${url}/trang-${p}.html`
  //   }
  }
  return _search(url)
}

function _search(url) {
  return urllib.request(url, searchOptions)
    .then((response) => {
      let html = response.data.toString('utf-8')
      return cheerio.load(html)
    })
    .then(($) => {
      return $('.list-film')
        .find('.film-item ')
        .map((idx, elem) => {
          const id = $(elem)
            .find('a')
            .attr('href')
            .replace('.html', '')
            .split('-')
            .slice(-1)
            .pop()
          const url = $(elem)
            .find('a')
            .attr('href')
            .replace('/phim/', 'xem-phim/phim-')
          const title = $(elem)
            .find('a')
            .attr('title')
          const thumbnail = $(elem)
            .find('img')
            .attr('src')

          console.log(thumbnail)
          return {
            provider,
            id,
            title,
            url,
            thumbnail
          }
        })
        .get()
      }
    )
}

// /xem-phim/phim-gai-goi-berlin-3224.html
exports.findMedias = url => {
  // https://bilutv.org/phim-dac-cong-7228.html?1589439236
  // => https://bilutv.org/phim-dac-cong-7228.1589439236.html
  let filmid = url.substring(url.lastIndexOf('-')+1, url.lastIndexOf('.'))
  let epid = url.substr(url.lastIndexOf('?')+1)
  let newurl = `${DOMAIN}/ajax/player`

  return urllib.request(newurl, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2977.0 Safari/537.36',
        referer: DOMAIN
      },
      dataType: 'text',
      method: 'POST',
      data: {
        id: filmid,
        ep: epid,
        sv: 0
      },
      contentType: 'multipart/form-data'
    })
    .then(reponse => extractMedia(reponse.data))
    .then(playerSetting => {
      console.log(playerSetting)

      return playerSetting
    //   return playerSetting.sourceLinks
    //     .map(sourceLink => sourceLink.links)
    //     .concatAll()
    //     .map(video => ({
    //       provider,
    //       id: playerSetting.modelId,
    //       title: playerSetting.title,
    //       thumb: playerSetting.poster,
    //       url: decodeUrl(
    //         video.file,
    //         'bilutv.com' + '4590481877' + playerSetting.modelId
    //       ),
    //       resolution: parseFloat(video.label),
    //       label: video.label
    //     }))
    })
}

function extractMedia(body) {
  console.log(body)
  const beginSlice = body.indexOf('var playerSetting = {') + 20
  const endSlice = body.indexOf('"};') + 2
  const result = parse(body.slice(beginSlice, endSlice).trim())
  if (result.err) {
    return {
      sources: []
    }
  }
  return result.value
}

// decode url using the password
const decodeUrl = (url, password) => {
  return aes.dec(url, password)
}
