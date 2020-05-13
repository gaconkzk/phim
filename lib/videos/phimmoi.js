"use strict";

const aes = require("../aes");
const got = require("got");
const urllib = require("urllib");
const cheerio = require("cheerio");
const qs = require("querystring");
// const tunnel = require('tunnel')
const DOMAIN = "http://www.phimmoi.net";
const provider = "PM";

const gotOptions = {
  headers: {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.3",
    "Upgrade-Insecure-Requests": 1,
  },
  timeout: 5000,
  retries: 0,
};

exports.search = (query) => {
  let q = qs.escape(query);

  return new Promise((resolve) => {
    _search(q)
      .then((result) => resolve(result))
      .catch((err) => {
        console.log(err);
        resolve([]);
      });
  });
};

function _search(q) {
  return got(`${DOMAIN}/tim-kiem/${q}/`, gotOptions)
    .then((response) => cheerio.load(response.body))
    .then(($) =>
      $(".list-movie")
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

          const provider = "PM";
          return {
            provider,
            id,
            title,
            url,
            thumbnail,
          };
        })
        .get()
    );
}

exports.findMedias = (url) => {
  return findEpisodeUrl(url)
    .then(u => Promise.all(u, urllib.request(u)))
    .then(result => ({ slug: result[0], data: result[1].data}))
    .then((html) => ({slug: html.slug, lines: html.toString("utf-8").split("\n" })))
    .then(takeMediaInfo)
    .then(takeRealMediaInfo)
    .then(result => result.data)
  .then(media => {
    console.log(media)
    return media
    // const password1 = 'PhimMoi.Net@' + media.episodeId
    // // there are a new descryptkey - need to find where they set it
    // const password2 = media.decryptkey
    // return media.medias.map(video => ({
    //   episodeId: media.episodeId,
    //   provider,
    //   url: decodeUrl(video.url, password1, password2),
    //   type: video.type,
    //   width: video.width,
    //   height: video.height,
    //   resolution: parseFloat(video.resolution),
    //   label: video.resolution
    // }))
  })
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

const takeRealMediaInfo = (rawMedia) => {
  let media = rawMedia
  return urllib.request(`${DOMAIN}/episodeinfo.php`, {
    data: media,
    dataAsQueryString: true,
    dataType: 'json',
    headers: {
      "user-agent": 'Android CUCBrowser'
    }
  }).catch(err => console.error(err))


  // return rawMedia
}

const takeMediaInfo = (slug, lines) => {
  let regex = /var _responseJson='{.*/
  let jsonline = lines.find(l => l.match(regex))

  regex = /;eval\(function\(w,i,s,e\){var lIll=0.*;}\('(\w+)','(\w+)','(\w+)','(\w+)'\)\);/
  let evalline = takeEvalLine(lines, regex)

  regex = /\n\t\t.+watching\.setDecryptKey\(\'(.+)\'\);watching\.setRequestSig.+/
  let decryptkey = evalline.match(regex)[1]

  let json = JSON.parse(jsonline.substring(jsonline.indexOf('{"requestId'), jsonline.length - 2))
  json.decryptkey  = decryptkey

  let data = {
    'ip': json.clientIp,
    'filmid': json.filmId,
    'episodeid': json.episodeId,
    'number': json.episodeNumber,
    'part': json.episodePart,
    'filmslug': slug,
    'type': "json",
    'requestid': `${json.episodeId}-${Math.ceil(Math.random() * 1000)}`,
    // 'token': ,
    // 'cs': ,
    // 'sig': ,
    // 'decryptkey': ,
  }
  console.log(json)

  return json
}

const takeEvalLine = (lines, regex) => {
  let evalline = lines.find(l => l.match(regex))
  for (let i of Array(3).keys()) {
    let evalVars = evalline.match(regex)
    let warr = [evalVars[1], evalVars[2], evalVars[3], evalVars[4]]

    evalline = wise(...warr)
  }

  return evalline
}

const takeEpisodeUrl = (lines) => {
  let regex = /;eval\(function\(w,i,s,e\){var lIll=0.*;}\('(\w+)','(\w+)','(\w+)','(\w+)'\)\);/
  let evalline = takeEvalLine(lines, regex)

  // window.TOKEN_EPISODE
  let tokreg = /\n\t\t\t.+window\.TOKEN_EPISODE='(.+)';if\(.*/
  let token = evalline.match(tokreg)[1]

  // the url
  let eureg = /\n\t\t\t.+\'url\':\'(.+)\',\'method.*/
  let epiUrl = evalline.match(eureg)[1] + '&token=' + token

  return epiUrl;
};

const findEpisodeUrl = (id) => {
  return urllib
    .request(`${DOMAIN}/${id}xem-phim.html`)
    .then((result) => {
      return result.data;
    })
    .then((html) => html.toString("utf-8").split("\n"))
    .then(takeEpisodeUrl)
};

// decode url using the password
const decodeUrl = (url, password1, password2) => {
  let decUrl = url
  try {
    console.log(`dec with ${password1}`)
    decUrl = aes.dec(url, password1)
  } catch (e) {
    try {
      console.log(`retry dec with ${password2}`)
      decUrl = aes.dec(url, password2)

      console.log('good: ', decUrl)
    } catch (ignored) {console.error('error2: ', e)}
  }

  return decUrl
}
