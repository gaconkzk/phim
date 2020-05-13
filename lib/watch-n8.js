//--Code by: Vu Thanh Lai - SinhVienIT.Net | PhimMoi.Net
//--www.facebook.com/vuthanhlai
//---For v8.0 | 2019-01-01

if (typeof filmInfo.previewUrl == "string") {
  var reg = /%3F_iv%3D[0-9]{10}/i;
  filmInfo.previewUrl = filmInfo.previewUrl.replace(reg, "");
  //console.log(filmInfo.previewUrl);
}

var watching = null;
var episodeLoadedCallback = null;
var loadedEpisodeInfo = null;
var removePlayerLoading = null;
var phimMoiPlayer = null;
var checkEpisodeInfoLoaded = function (scriptObj) {
  try {
    if (typeof checkEpisodeInfoLoaded.checkedFlag != "undefined") return false;
    checkEpisodeInfoLoaded.checkedFlag = 1;
    if (typeof _responseJson == "undefined") {
      var scriptUrl = jQuery(scriptObj).attr("src");
      var querySep = "?";
      if (scriptUrl.indexOf("?") != -1) querySep = "&";
      scriptUrl += querySep + "retry=1";
      setTimeout(function () {
        jQuery(scriptObj).attr("src", scriptUrl);
        console.log("Episode Info Script Retry Complete: true");
      }, 300);
      console.log("Episode Info Script Will Retry: true");
    }
    console.log("Episode Info Script loaded OK: true");
    jQuery(scriptObj).remove();
    return true;
  } catch (err) {
    console.error("Episode Info Script loaded Error: " + err.message);
    return false;
  }
};
var readyCalled = 0;
var readyCallback = function () {
  if (readyCalled) return false;
  //--Display player loading
  //jQuery('#media-player-box').css({'position':'relative','height':'auto','overflow':'hidden'});
  //jQuery('#media-player-box').append('<div id="player-loading" class="player-loading"><div class="status"></div></div>');
  removePlayerLoading = function () {
    jQuery("#player-loading").fadeOut("fast", function () {
      jQuery(this).remove();
      jQuery("#media-player-box").removeClass("loading");
    });
  };

  if (typeof preventConstructPlayer != "undefined" && preventConstructPlayer) {
    return false;
  }

  watching = new Watching();
  watching.setInfoPath("https://episode.pmcontent.com/episodeinfo-v1.2.php");
  //watching.testBlogspot();
  watching.setCurrentEpisode(currentEpisode);
  watching.scrollFitOnload();
  watching.setSkipWaiting(10);
  try {
    if (watching.getDeviceType() == "tv") {
      //TV thì chèn preroll inline
      watching.addAdBreak("PrerollAds", "pre", vastList.tv);
    } else if (watching.getDeviceType() == "desktop") {
      //desktop thì chèn thêm 1 ở phút 20
      watching.addAdBreak("Mid20", 1200, vastList.desktop);
    }
  } catch (err) {
    console.error("set Vastlist Error: " + err.message);
  }
  watching.setRequestId(currentEpisode.requestId);

  //--Overlay Preroll Ads
  if (watching.getDeviceType() != "tv") {
    watching.setupPreroll("media-player-box", "media-player");
  }
  //--Chọn xem tập đã lưu
  watching.choiseRememberEpisode();

  //--Current EpisodeInfo Loaded Callback
  episodeLoadedCallback = function (data) {
    watching.cancelSkipWaiting();
    watching.handleData(data);
    //removePlayerLoading();
  };
  //--If EpisodeInfo loaded
  if (loadedEpisodeInfo != null) episodeLoadedCallback(loadedEpisodeInfo);

  //--For other use
  phimMoiPlayer = watching.getPlayer();

  jQuery(window).load(function () {
    try {
      if (window.location.href.indexOf("#debug") != -1)
        console.log(phimMoiPlayer.getVideoObj().src);
    } catch (err) {}
  });

  //--Set sự kiện cho các nút chuyển tập khác
  jQuery("a[id^=btn-episode-]").click(function () {
    try {
      if (navigator.userAgent.indexOf("UCBrowser") != -1) {
        return true;
      }
      try {
        watching.setPrerollLoop(2);
      } catch (err) {}
      var reloadPage = watching.changeEpisode(this);
      return reloadPage;
    } catch (err) {
      console.log("reloadPage=" + true);
      console.log(err.stack);
      return true;
    }
  });

  readyCalled = true;
};

// setTimeout(function () {
//   readyCallback();
// }, 3500);

// setTimeout(function () {
//   try {
//     phimMoiPlayer.getJwPlayer().on("adStarted", function (e) {
//       if (typeof window.onAdStarted == "function") {
//         window.onAdStarted(e);
//       }
//     });
//     phimMoiPlayer.getJwPlayer().setMute(false);
//   } catch (err) {}
// }, 1000);

window.hlsAjaxResponseCallback = function (t, context, obj) {
  var markLimit = 0;
  if (
    context.responseType == "arraybuffer" &&
    t.currentTarget.readyState == 4
  ) {
    window.hlsLastSegmentResult = {
      status: t.currentTarget.status,
      responseUrl: t.currentTarget.responseURL,
    };
  }
  if (
    t.currentTarget.readyState == 4 &&
    (t.currentTarget.responseURL.indexOf("hls.phimmoi.net/v2/segment/") != -1 ||
      t.currentTarget.responseURL.indexOf("hls.phimmoi.link/v2/segment/") != -1)
  ) {
    if (
      context.responseType == "arraybuffer" &&
      t.currentTarget.status == 200
    ) {
      try {
        phimMoiPlayer.getJwPlayer().stop();
        phimMoiPlayer.getJwPlayer().trigger("error");
        markLimit = 1;
        eval(
          "console.error('Segment Url '+t.currentTarget.responseURL+':'+t.currentTarget.status+' has been limited.');"
        );
      } catch (err) {
        console.error(err.message);
      }
    } else if (
      context.responseType == "arraybuffer" &&
      t.currentTarget.status >= 400
    ) {
      try {
        phimMoiPlayer.getJwPlayer().stop();
        phimMoiPlayer.getJwPlayer().trigger("error");
        eval(
          "console.error('Segment Url '+t.currentTarget.responseURL+':'+t.currentTarget.status+' Error.');"
        );
      } catch (err) {
        console.error(err.message);
      }
    }
  } else if (
    t.currentTarget.readyState == 4 &&
    t.currentTarget.responseURL.indexOf(".googleusercontent.com/") != -1
  ) {
    if (
      context.responseType == "arraybuffer" &&
      t.currentTarget.status >= 400 &&
      t.currentTarget.status < 600
    ) {
      try {
        phimMoiPlayer.getJwPlayer().stop();
        phimMoiPlayer.getJwPlayer().trigger("error");
        markLimit = 1;
        eval(
          "console.error('Segment Url '+t.currentTarget.status+' Error: '+t.currentTarget.responseURL);"
        );
      } catch (err) {
        console.error(err.message);
      }
    }
  } else if (
    t.currentTarget.readyState == 4 &&
    (t.currentTarget.responseURL.indexOf(".phimmoi.net/") != -1 ||
      t.currentTarget.responseURL.indexOf(".phimmoi.link/") != -1)
  ) {
    if (
      context.responseType == "arraybuffer" &&
      t.currentTarget.status >= 400 &&
      t.currentTarget.status < 600
    ) {
      try {
        phimMoiPlayer.getJwPlayer().stop();
        phimMoiPlayer.getJwPlayer().trigger("error");
        eval(
          "console.error('Segment Url '+t.currentTarget.status+' Error: '+t.currentTarget.responseURL);"
        );
      } catch (err) {}
    }
  }
  if (
    context.responseType == "arraybuffer" &&
    t.currentTarget.readyState == 4 &&
    ((t.currentTarget.status == 0 &&
      context.url.indexOf("focus-opensocial.googleusercontent.com/") != -1) ||
      (t.currentTarget.status >= 400 &&
        t.currentTarget.responseURL.indexOf(
          "focus-opensocial.googleusercontent.com/"
        ) != -1))
  ) {
    window.NO_PROXY_SEGMENT = 1;
    setTimeout(function () {
      window.NO_PROXY_SEGMENT = 0;
    }, 60000);
  }
  if (
    markLimit &&
    typeof window.hlsLastSegmentUrl == "string" &&
    window.hlsLastSegmentUrl != ""
  ) {
    var pingUrl = window.hlsLastSegmentUrl
      .replace("/segment/", "/error/")
      .replace(".ts?", ".ts/limited?");
    jQuery("body").append(
      '<iframe src="' +
        pingUrl +
        '" style="border:0;margin:0;padding:0;width:1px;height:1px;position: absolute;left: -2000px;" onload="jQuery(this).remove();"></iframe>'
    );
    eval(
      "console.error('Mark Limited: Segment Url '+t.currentTarget.status+'; Error: '+t.currentTarget.responseURL);"
    );
  }
};
window.hlsAjaxBeforeSendCallback = function (t, context) {
  try {
    if (context.url.indexOf("/segment/")) {
      window.hlsLastSegmentUrl = context.url;
    }
  } catch (err) {}
  //t.withCredentials=true;
};
window.hlsAjaxBeforeOpenCallback = function (context) {
  try {
    eval("console.log('Before Open:');");
    eval("console.log(context);");
    //if(document.cookie.indexOf('testgg')!=-1 && context.responseType=="arraybuffer"){
    if (context.responseType == "arraybuffer") {
      var url = context.url;
      if (
        (typeof window.NO_PROXY_SEGMENT == "undefined" ||
          !window.NO_PROXY_SEGMENT) &&
        url.indexOf("so-trym-") != -1 &&
        (typeof window.hlsLastSegmentResult == "undefined" ||
          (window.hlsLastSegmentResult.status >= 200 &&
            window.hlsLastSegmentResult.status < 400))
      ) {
        var gsv = Math.floor(Math.random() * 10) + 1;
        context.url =
          "https://images" +
          gsv +
          "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=3600&url=" +
          encodeURIComponent(url);
      }
    }
  } catch (err) {}
};
jQuery(document).ready(function () {
  readyCallback();
});

var handleSeek = function (e) {
  try {
    if (["body", "div", "span"].includes(e.target.nodeName.toLowerCase())) {
      var usingIframe = jQuery("iframe.player-embed-iframe").length > 0;
      switch (e.keyCode) {
        case 32:
          if (phimMoiPlayer.getState() == "playing") {
            phimMoiPlayer.pause();
          } else {
            phimMoiPlayer.play();
          }
          if (usingIframe) {
            jQuery("iframe.player-embed-iframe")[0].contentWindow.postMessage(
              "togglePlay",
              "*"
            );
          }
          e.preventDefault();
          break;
        case 39:
          if (usingIframe) {
            jQuery("iframe.player-embed-iframe")[0].contentWindow.postMessage(
              "seek+5s",
              "*"
            );
          } else {
            var currentPosition = phimMoiPlayer.getPosition();
            phimMoiPlayer.seek(
              Math.min(currentPosition + 5, phimMoiPlayer.getDuration())
            );
          }
          e.preventDefault();
          break;
        case 37:
          if (usingIframe) {
            jQuery("iframe.player-embed-iframe")[0].contentWindow.postMessage(
              "seek-5s",
              "*"
            );
          } else {
            var currentPosition = phimMoiPlayer.getPosition();
            phimMoiPlayer.seek(Math.max(0, currentPosition - 5));
          }
          e.preventDefault();
          break;
      }
    }
  } catch (err) {}
};
jQuery("body").on("keydown", function (e) {
  handleSeek(e);
});
window.embedPlayerErrorList = [];
window.EMBED_TIME = {
  lockUpdate: 0,
  position: 0,
  source: "",
  midrollActivated: 0,
};
jQuery(window).on("message", function (e) {
  try {
    var msgStr = e.originalEvent.data;
    var msgReg = /^([a-zA-Z0-9_]+)\:(.*)$/;

    if (typeof msgStr == "string" && msgReg.test(msgStr)) {
      var msgParam = msgReg.exec(msgStr);
      var msgAction = msgParam[1];
      var msgData = jQuery.parseJSON(msgParam[2]);

      switch (msgAction) {
        case "activeMidRoll":
          if (
            jQuery("#main_preroll_ads").length == 0 &&
            !window.EMBED_TIME.midrollActivated
          ) {
            try {
              //watching.restartAd();
              window.setupOverlayPreroll(
                "#media-player",
                "main_preroll_ads",
                1
              );
              window.EMBED_TIME.midrollActivated = 1;
            } catch (err) {}
          }
          break;
        case "embedPlayerError":
          var errorId = msgData.source;
          if (typeof msgData.id == "string") errorId += msgData.id;
          jQuery("#media-player #player-embed").html(
            '<div style="text-align: center;margin-top: 26%;">Link này hiện không khả dụng.<br>Hãy thử chọn link dự phòng khác ở bên dưới.</div>'
          );
          if (window.embedPlayerErrorList.includes(errorId)) {
            return false;
          }
          window.embedPlayerErrorList.push(errorId);
          eval('console.log("Embed Player Error: "+msgParam[2]);');
          setTimeout(function () {
            window.embedPlayerErrorList = [];
          }, 3000);
          //watching.playerErrorCallback();
          watching.selectThirdPartyLink();

          break;
        case "embedTimeUpdate":
          if (!window.EMBED_TIME.lockUpdate) {
            if (typeof msgData.position == "number") {
              window.EMBED_TIME.position = msgData.position;
            }
            if (typeof msgData.source == "string") {
              window.EMBED_TIME.source = msgData.source;
            }
            try {
              watching.rememberPosition(window.EMBED_TIME.position);
            } catch (err) {}
          }
          break;
        case "embedPlayComplete":
          window.EMBED_TIME.position = 0;
          window.EMBED_TIME.midrollActivated = 0;
          window.EMBED_TIME.lockUpdate = 0;
          try {
            if (watching.isAutoNext()) {
              watching.setGoNext(3);
            }
          } catch (err) {}
          break;
        case "embedDocumentReady":
          fx.hideLoad();
          break;
        default:
          eval('console.log("Received message: "+msgStr);');
      }
    }
    //--Van Long Message
    try {
      var msgData = jQuery.parseJSON(msgStr);
      if (
        typeof msgData == "object" &&
        typeof msgData["name"] == "string" &&
        msgData["name"] == "nolink"
      ) {
        jQuery("#media-player #player-embed").html(
          '<div style="text-align: center;margin-top: 26%;">Link này hiện không khả dụng.<br>Hãy thử chọn link dự phòng khác ở bên dưới.</div>'
        );
        fx.hideLoad();
        watching.selectThirdPartyLink();
      }
    } catch (err) {}
  } catch (err) {
    console.log(err);
  }
});
window.changeEmbedLinkCallback = function (obj) {
  if (
    typeof window.EMBED_TIME != "undefined" &&
    typeof window.EMBED_TIME.position == "number"
  ) {
    if (obj.embedUrl.indexOf("#") != -1) {
      obj.embedUrl += "&";
    } else {
      obj.embedUrl += "#";
    }
    obj.embedUrl += "position=" + Math.floor(window.EMBED_TIME.position);
  }
};
window.changeEpisodeBeforeSendCallback = function (rqData) {
  window.EMBED_TIME.position = 0;
  window.EMBED_TIME.midrollActivated = 0;
  window.EMBED_TIME.lockUpdate = 1;
  setTimeout(function () {
    window.EMBED_TIME.lockUpdate = 0;
  }, 10000);
  delete rqData.ip;
  delete rqData.token;
  delete rqData.sig;
  if (typeof rqData.cs != "undefined") {
    delete rqData.cs;
  }
  rqData.requestid = rqData.requestid.replace(/\-.+$/, "-0");
  watching.setRequestId(rqData.requestid);
  rqData.__ax__ = "ax2";
};
window.thirdPartyStorageHandle = function (episodeData) {};

window.handleDataCompleteCallback = function (episodeData) {
  if (jQuery(".btn-episode.active.history-episode").length > 0) {
    var historyPosition = jQuery(".btn-episode.active.history-episode").attr(
      "data-history-position"
    );
    if (typeof historyPosition == "string") {
      historyPosition = parseInt(historyPosition);
    }
    if (!isNaN(historyPosition) && historyPosition > 60) {
      window.EMBED_TIME.lockUpdate = 1;
      window.EMBED_TIME.position = historyPosition;
      setTimeout(function () {
        window.EMBED_TIME.lockUpdate = 0;
      }, 2000);
    }
  }
};
