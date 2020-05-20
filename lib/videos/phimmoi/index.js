const aes = require("../../aes")
const urllib = require("urllib")
const cheerio = require("cheerio")
const qs = require("querystring")
// const tunnel = require('tunnel')
const DOMAIN = "http://www.phimmoi.net"
const provider = "PM"

const searchOptions = {
  headers: {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.3",
    "upgrade-insecure-requests": 1,
    'content-type': 'text/html;charset=UTF-8'
  },
  timeout: 5000,
  retries: 0,
};

exports.search = ({ query, type, category, country, year, page }) => {
  let url = `${DOMAIN}/`
  if (query) {
    let q = qs.escape(query)
    url = `${url}tim-kiem/${q}/`
  } else if (type) {
    url = `${url}${type}/`
    if (category) {
      url = `${url}/${category}/`
    }
    if (country) {
      url = `${url}/${country}/`
    }
    if (year) {
      url = `${url}/${year}/`
    }
    if (page>1) {
      url = `${url}/page-${page}.html`
    }
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
      return $(".list-movie")
        .find(".movie-item")
        .map((i, elem) => {
          let url = $(elem).find("a.block-wrapper").attr("href");
          let title = $(elem).find("a.block-wrapper").attr("title");
          // get last elem of arr without modified it
          let id = url.split("-").slice(-1).pop().replace("/", "");
          let style = $(elem)
            .find("a.block-wrapper .movie-thumbnail")
            .attr("style");
          let thumbnail = style.match(
            /.*((http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)).*/
          )[1];
          return {
            provider,
            id,
            title,
            url,
            thumbnail,
          }
        })
        .get()
      }
    )
}

exports.findMedias = (url) => {
  return findEpisodeUrl(url)
    .then(u => Promise.all([Promise.resolve({url, ... u}), urllib.request(u.epiUrl)]))
    .then(result => ({ ...result[0], lines: result[1].data.toString("utf-8").split("\n")}))
    .then(html => ({slug: html.url, ...html }))
    .then(takeMediaInfo)
    .then(findLinks)
    .then(updateMediaUrl)
}

const updateMediaUrl = (res) => {
  if (!Array.isArray(res) || res.length < 2)
    return res
  let json = res[0]
  let html3rd = res[1]
  let lines = html3rd.split('\n')

  let videoLine = lines.find(l => l.indexOf('var VIDEO_URL=swap')>0)
  let url = videoLine.match(/\s+var VIDEO_URL=swapServer\("(.+)"\).*/)[1]

  console.log(`what the fuck: ${process.env.SERVER_HOST||'localhost'}:${process.env.SERVER_PORT||'3100'}`)
  url = `http://${process.env.SERVER_HOST||'localhost'}:${process.env.SERVER_PORT||'3100'}/api/movies/${Buffer.from(aes.enc(JSON.stringify({ url, referer: json.referer }), process.env.SECRET)).toString('base64')}/list.m3u8`

  json.url = url
  let videoType = lines.find(l => l.indexOf('var VIDEO_TYPE="')>0)
  let type = videoType.match(/\s+var VIDEO_TYPE="(.+)".*/)[1]
  json.type = type
  json.resolution = ((json.medias || [])[0] || {}).resolution || undefined
  return json
}

// so this is the func
const wise = (w, i, s, e) => {
  var lIll = 0;
  var ll1I = 0;
  var Il1l = 0;
  var ll1l = [];
  var l1lI = [];
  while (true) {
    if (lIll < 5) l1lI.push(w.charAt(lIll));
    else if (lIll < w.length) ll1l.push(w.charAt(lIll));
    lIll++;
    if (ll1I < 5) l1lI.push(i.charAt(ll1I));
    else if (ll1I < i.length) ll1l.push(i.charAt(ll1I));
    ll1I++;
    if (Il1l < 5) l1lI.push(s.charAt(Il1l));
    else if (Il1l < s.length) ll1l.push(s.charAt(Il1l));
    Il1l++;
    if (
      w.length + i.length + s.length + e.length ==
      ll1l.length + l1lI.length + e.length
    )
      break;
  }
  var lI1l = ll1l.join("");
  var I1lI = l1lI.join("");
  ll1I = 0;
  var l1ll = [];
  for (lIll = 0; lIll < ll1l.length; lIll += 2) {
    var ll11 = -1;
    if (I1lI.charCodeAt(ll1I) % 2) ll11 = 1;
    l1ll.push(String.fromCharCode(parseInt(lI1l.substr(lIll, 2), 36) - ll11));
    ll1I++;
    if (ll1I >= l1lI.length) ll1I = 0;
  }
  return l1ll.join("");
}

const findLinks = (json) => {
  let haveLink = json.medias.find(m => m.url.indexOf('://') > 0)
  if (haveLink) {
    json.url = haveLink.url
    return Promise.resolve(json)
  } else {
    // get first third party link
    let thirdpt = json.thirdParty[0].embed
    return urllib.request(thirdpt, {
      headers: {
        referer: json.referer
      }
    })
      .then(res => [json, res.data.toString('utf-8')])
    }
}

const takeMediaInfo = (media) => {
  let { lines } = media
  console.log('2. Parsing lines of episode info for ', media.slug)
  let regex = /var _responseJson='{.*/
  let jsonline = lines.find(l => l.match(regex))

  regex = /;eval\(function\(w,i,s,e\){var lIll=0.*;}\('(\w+)','(\w+)','(\w+)','(\w+)'\)\);/
  let evalline = takeEvalLine(lines, regex)

  regex = /\n\t\t.+watching\.setDecryptKey\(\'(.+)\'\);watching\.setRequestSig.+/
  let decryptkey = evalline.match(regex)[1]

  // regex = /\n\t\t.+watching\.setDecryptKey\(\'.+\'\);watching\.setRequestSig\(\'(.+)\'\);}else.+/
  // let sig = evalline.match(regex)[1]

  let json = JSON.parse(jsonline.substring(jsonline.indexOf('{"requestId'), jsonline.length - 2))

  // json.sig = sig
  // json.decryptkey  = decryptkey
  if (decryptkey) {
    console.log('decrypt `medias` using keys: ', `PhimMoi.Net@${json.episodeId}`, decryptkey)
    json.medias = json.medias.map(m => Object.assign(m, { url: decodeUrl(m.url, `PhimMoi.Net@${m.episodeId || json.episodeId}`, decryptkey)}))
    json.embedUrls = json.embedUrls.map(e => decodeUrl(e, decryptkey))
  }
  console.log('decrypt `thirdParty` using key: `@@@3rd`')
  json.thirdParty = json.thirdParty.map(u => Object.assign(u, { embed: decodeUrl(u.embed, '@@@3rd') }))
  json = Object.assign({}, media, json)

  console.log('finished getting media information')

  json.lines = undefined
  json.epiUrl = undefined

  return json
}

const takeEvalLine = (lines, regex) => {
  let evalline = lines.find(l => l.match(regex))
  if (evalline) {
    for (let i of Array(3).keys()) {
      let evalVars = evalline.match(regex)
      let warr = [evalVars[1], evalVars[2], evalVars[3], evalVars[4]]

      evalline = wise(...warr)
    }
  }

  return evalline
}

const takeEpisodeData = (id, referer) => {
  return ((lines) => {
    console.log('0. getting episode information for id: ', id)
    let title = lines.filter(l => l.match(/filmInfo\.title=\'(.+)\';/))
      .map(l => l.match(/filmInfo\.title=\'(.+)\';/)[1])[0]

    let trailerUrl = lines.filter(l => l.match(/filmInfo\.trailerUrl=\'(.+)\';/))
      .map(l => l.match(/filmInfo\.trailerUrl=\'(.+)\';/)[1])[0]

    let previewUrl = lines.filter(l => l.match(/filmInfo\.previewUrl=\'(.+)\';/))
      .map(l => l.match(/filmInfo\.previewUrl=\'(.+)\';/)[1])[0]

    let isSeries = lines.filter(l => l.match(/filmInfo\.isSeries=\(\'(.+?)\'.+?\);/))
      .map(l => l.match(/filmInfo\.isSeries=\(\'(.+?)\'.+?\);/)[1])[0] === 'serial'

    let description = lines.filter(l => l.match(/.+?\<meta\sname="description" content="(.+?)".+?\/\>.*/))
      .map(l => l.match(/.+?\<meta\sname="description" content="(.+?)".+?\/\>.*/)[1])[0]

    description = description.substr(description.indexOf('. ')+2)

    // currentEpisode.number=parseInt('22')
    let number = lines.filter(l => l.match(/currentEpisode\.number=parseInt\(\'(\d+?)\'\);/))
    .map(l => l.match(/currentEpisode\.number=parseInt\(\'(\d+?)\'\);/)[1])[0]
    number = parseInt(number)

    console.log('1. getting episode url for id: ', id)
    let regex = /;eval\(function\(w,i,s,e\){var lIll=0.*;}\('(\w+)','(\w+)','(\w+)','(\w+)'\)\);/
    let evalline = takeEvalLine(lines, regex)

    if (!evalline) {
      return Promise.reject('Can\'t get movie information')
    }

    // window.TOKEN_EPISODE
    let tokreg = /\n\t\t\t.+window\.TOKEN_EPISODE='(.+)';if\(.*/
    let token = evalline.match(tokreg)[1]

    // the url
    let eureg = /\n\t\t\t.+\'url\':\'(.+)\',\'method.*/
    let epiUrl = evalline.match(eureg)[1] + '&token=' + token
    // if (epiUrl.indexOf(id)<0) {
    //   epiUrl = epiUrl + '&filmslug=' + id
    // }

    console.log('   got: ', { token, epiUrl })

    let episodes = (isSeries &&
       _takeEpiList(lines)) || undefined

    return { token, epiUrl, referer, title, number,
      trailerUrl, previewUrl, description, isSeries, episodes
      //, , categories }
    }
  })
}

const _takeEpiList = (lines) => {
  return lines.filter(l => l.match(/.+?data-episodeid="(.+?)"\sdata-number="(\d+?)"\sdata-part="(\d+?)".*?/))
      .map(l => l.match(/.+?data-episodeid="(.+?)"\sdata-number="(\d+?)"\sdata-part="(\d+?)".+?href="(.+?)".*?/))
      .map(m => ({
        episodeId: parseInt(m[1]),
        number: parseInt(m[2]),
        part: parseInt(m[3]),
        href: m[4],
        hash: Buffer.from(aes.enc(provider + '|' + m[4], process.env.SECRET)).toString('base64')
      }))
}

const findEpisodeUrl = (id) => {
  let referer = `${DOMAIN}/${id}xem-phim.html`
  if (id.indexOf('/tap-')>0) {
    referer = `${DOMAIN}/${id}`
  }
  return urllib
    .request(referer)
    .then(result => result.data)
    .then((html) => html.toString("utf-8").split("\n"))
    .then(takeEpisodeData(id, referer))
};

// decode url using the password
const decodeUrl = (url, password1, password2) => {
  try {
    return aes.dec(url, password1)
  } catch (e) {
    console.error(`error using ${password1}`, e)
  }

  if (!password2) {
    return url
  }

  try {
    return aes.dec(url, password2)
  } catch (e) {
    console.error(`error using ${password2}`, e)
  }

  return url
}

exports.watchmovie = ({url, referer}) => {
  return urllib.request(url, {
    headers: {
      referer
    }
  }).then(res => {
    return res.data
  }).catch(e => {
    console.error(e)
  })
}

exports.segment = ({url, referer}, segment, writeStream ) => {
  let surl = url.replace('playlist.m3u8', segment)
  return urllib.request(surl, {
    headers: {
      referer
    },
    writeStream
  })
}
