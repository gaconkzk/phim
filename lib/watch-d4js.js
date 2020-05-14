var Watching = function () {
  var _0x83dfx2 = 0;
//   var _0x83dfx3 = new FxPlayer("media-player");
  var _0x83dfx4 = false;
  var _0x83dfx5 = "/episodeinfo.php";
//   this.getPlayer = function () {
//       return _0x83dfx3
//   };
  var _currentEpisode = null;
  var _decryptKey = "";
  var decryptUrl = function (movieData) {
      if (typeof movieData.medias == "object" && movieData.medias.length > 0) {
          var oldkey = "PhimMoi.Net@" + movieData.episodeId;
          if (_decryptKey) {
              var newkey = _decryptKey
          } else {
              var newkey = ((typeof KEY_MEDIA_URL == "string") ? KEY_MEDIA_URL : "") + movieData.episodeId
          };
          for (var _0x83dfxc in movieData.medias) {
              if (typeof movieData.medias[_0x83dfxc].url == "string" && movieData.medias[_0x83dfxc].url.indexOf("://") == -1) {
                  var _0x83dfxd = movieData.medias[_0x83dfxc].url;
                  try {
                      movieData.medias[_0x83dfxc].url = GibberishAES.dec(_0x83dfxd, oldkey)
                  } catch (err) {};
                  if (movieData.medias[_0x83dfxc].url.indexOf("://") == -1) {
                      try {
                          movieData.medias[_0x83dfxc].url = GibberishAES.dec(_0x83dfxd, newkey)
                      } catch (err) {}
                  }
              }
          }
      };
      return movieData
  };
  this.setDecryptKey = function (_0x83dfxe) {
      _decryptKey = _0x83dfxe
  };
  var _0x83dfxf = "";
  this.setRequestSig = function (_0x83dfx10) {
      _0x83dfxf = _0x83dfx10
  };
  this.setCurrentEpisode = function (movieData) {
      _currentEpisode = movieData
  };
  this.setInfoPath = function (_0x83dfx12) {
      if (typeof _0x83dfx12 == "string" && _0x83dfx12 != "") {
          _0x83dfx5 = _0x83dfx12
      }
  };
  this.getInfoPath = function (_0x83dfx12) {
      return _0x83dfx5
  };
  this.parseUrl = function (_0x83dfx13) {
      try {
          var _0x83dfx14 = document.createElement("a");
          _0x83dfx14.href = _0x83dfx13;
          _0x83dfx14.protocol;
          _0x83dfx14.host;
          _0x83dfx14.hostname;
          _0x83dfx14.port;
          _0x83dfx14.pathname;
          _0x83dfx14.hash;
          _0x83dfx14.search;
          _0x83dfx14.origin;
          return _0x83dfx14
      } catch (err) {};
      return false
  };
  var _0x83dfx15 = "";
  this.setBackupFile = function (_0x83dfx13) {
      if (typeof _0x83dfx13 == "string") {
          _0x83dfx15 = _0x83dfx13
      }
  };
  this.getBackupFile = function (_0x83dfx13) {
      return _0x83dfx15
  };
  var _0x83dfx16 = {};
  this.setCustomFlag = function (_0x83dfx17, _0x83dfx18) {
      try {
          _0x83dfx16[_0x83dfx17] = _0x83dfx18
      } catch (err) {}
  };
  this.getCustomFlag = function (_0x83dfx17) {
      try {
          if (typeof _0x83dfx16[_0x83dfx17] != "undefined") {
              return _0x83dfx16[_0x83dfx17]
          }
      } catch (err) {};
      return ""
  };
//   var _0x83dfx19 = (typeof window.history.pushState != "function");
//   this.setNeedReload = function (_0x83dfx1a) {
//       try {
//           if (typeof window.history.pushState != "function") {
//               _0x83dfx19 = true
//           } else {
//               var _0x83dfx1b = /Android.+UCBrowser/i;
//               var _0x83dfx1c = _0x83dfx1b.exec(window.navigator.userAgent);
//               if (_0x83dfx1c != null && _0x83dfx1c.length > 0) {
//                   _0x83dfx19 = true
//               } else {
//                   if (_0x83dfx1a) {
//                       _0x83dfx19 = true
//                   } else {
//                       _0x83dfx19 = false
//                   }
//               }
//           }
//       } catch (err) {
//           _0x83dfx19 = true
//       };
//       return _0x83dfx19
//   };
  this.getNeedReload = function () {
      return _0x83dfx19
  };
  this.setRequestId = function (_0x83dfx1d) {
      if (typeof _0x83dfx1d == "undefined") {
          var _0x83dfx1d = ""
      };
      _0x83dfx2 = _0x83dfx1d
  };
  this.getRequestId = function () {
      return _0x83dfx2
  };
  var _0x83dfx1e = "";
  this.getDeviceType = function () {
      if (_0x83dfx1e != "") {
          return _0x83dfx1e
      };
      if (typeof device == "object" && typeof device.mobile == "function") {
          if (typeof device.television == "function" && device.television()) {
              _0x83dfx1e = "tv"
          } else {
              if (navigator.userAgent.toLowerCase().indexOf("opr/") != -1 && navigator.userAgent.toLowerCase().indexOf("omi/") != -1 && navigator.userAgent.toLowerCase().indexOf("unicorn") != -1) {
                  _0x83dfx1e = "tv"
              } else {
                  if (device.mobile()) {
                      _0x83dfx1e = "mobile"
                  } else {
                      if (device.tablet()) {
                          _0x83dfx1e = "tablet"
                      } else {
                          _0x83dfx1e = "desktop"
                      }
                  }
              }
          }
      } else {
          _0x83dfx1e = "desktop";
          console.warn("device object is not found!")
      };
      return _0x83dfx1e
  };
  this.trackPageview = function () {
      if (typeof _gaq != "undefined" && typeof _gaq.push == "function") {
          _gaq.push(["_trackPageview", window.location.pathname]);
          console.log("GA Pageview Tracking Sent")
      } else {
          if (typeof ga == "function") {
              ga("send", "pageview", window.location.pathname);
              console.log("GA Pageview Tracking Sent")
          }
      }
  };
  this.trackEvent = function (_0x83dfx1f, _0x83dfx20, _0x83dfx21) {
      if (typeof _0x83dfx1f != "string" || _0x83dfx1f == "") {
          return false
      };
      if (typeof _0x83dfx20 != "string" || _0x83dfx20 == "") {
          return false
      };
      if (typeof _0x83dfx21 != "string" || _0x83dfx21 == "") {
          _0x83dfx21 = ""
      };
      if (typeof ga == "function") {
          ga("send", "event", _0x83dfx1f, _0x83dfx20, _0x83dfx21);
          console.log("GA Tracking Sent: Category=" + _0x83dfx1f + "; Action=" + _0x83dfx20 + "; Label=" + _0x83dfx21)
      } else {
          _gaq.push(function () {
              var _0x83dfx22 = _gat._getTrackerByName();
              _0x83dfx22._trackEvent(_0x83dfx1f, _0x83dfx20, _0x83dfx21);
              console.log("GA Tracking Sent: Category=" + _0x83dfx1f + "; Action=" + _0x83dfx20 + "; Label=" + _0x83dfx21)
          })
      }
  };
  var _0x83dfx23 = [];
  var _0x83dfx24 = false;
  this.autoReport = function () {
      try {
          if (!_0x83dfx24) {
              return false
          };
          if (_0x83dfx23.indexOf(_currentEpisode.episodeId) != -1) {
              return false
          };
          var _0x83dfx25 = "autoreport.php/\?_fxAjax=1";
          var _0x83dfx26 = {
              'episodeId': _currentEpisode.episodeId,
              'episodeNumber': _currentEpisode.number,
              'episodePart': _currentEpisode.part,
              'encodedUrl': _currentEpisode.url,
              'filmId': filmInfo.filmId
          };
          _0x83dfx23.push(_currentEpisode.episodeId);
          jQuery.ajax({
              'url': _0x83dfx25,
              'method': "POST",
              'data': _0x83dfx26,
              'context': {
                  'silentError': true
              },
              'silentLoad': true
          }).done(function (_0x83dfx26) {
              console.log("Đã gửi báo lỗi tự động.")
          }).fail(function () {
              console.error("Lỗi khi gửi báo lỗi tự động.")
          })
      } catch (err) {
          console.error("Lỗi gưi báo lỗi: " + err.message)
      }
  };
  this.enableAutoReport = function (_0x83dfx27) {
      if (typeof _0x83dfx27 == "undefined") {
          var _0x83dfx27 = true
      };
      if (_0x83dfx27) {
          _0x83dfx24 = true
      } else {
          _0x83dfx24 = false
      }
  };
  this.addToFav = function (_0x83dfx28) {
      if (typeof fx.userId == "number" && fx.userId <= 0) {
          fx.displayPopup("Lỗi", "Bạn cần đăng nhập để sử dụng chức năng này", null, 1);
          return false
      };
      var _0x83dfx25 = jQuery(_0x83dfx28).attr("href");
      jQuery.ajax({
          'url': _0x83dfx25 + "\?_fxAjax=1&_fxResponseType=JSON",
          'method': "POST",
          'dataType': "JSON",
          'data': {}
      }).done(function (_0x83dfx26) {
          if (typeof _0x83dfx26._fxMessage == "string") {
              fx.displayMessage(_0x83dfx26._fxMessage)
          } else {
              fx.displayMessage("Phim đã được thêm vào tủ.")
          };
          if (typeof _0x83dfx26.newText == "string" && typeof _0x83dfx26.newUrl == "string") {
              jQuery("#btn-add-favorite").attr("href", _0x83dfx26.newUrl);
              jQuery("#btn-add-favorite .btn-text").text(_0x83dfx26.newText)
          } else {
              jQuery("#btn-add-favorite").fadeOut(function () {
                  jQuery(this).remove()
              })
          }
      });
      return false
  };
  var _0x83dfx29 = true;
  this.isUseAutoNext = function () {
      if (!filmInfo.isSeries && !_currentEpisode.part) {
          return false
      };
      if (_0x83dfx29) {
          return true
      };
      return false
  };
  this.isAutoNext = function () {
      return this.isUseAutoNext()
  };
  this.autoNextToggle = function (_0x83dfx2a) {
      if (typeof _0x83dfx2a == "undefined") {
          var _0x83dfx2a = -1
      };
      if (_0x83dfx29 || !_0x83dfx2a) {
          _0x83dfx29 = 0;
          jQuery("#autonext-status").text("Tắt")
      } else {
          _0x83dfx29 = 1;
          jQuery("#autonext-status").text("Bật")
      }
  };
  var _0x83dfx2b = 0;
  var _0x83dfx2c = -1;
  this.isFinalEpisode = function () {
      if (_0x83dfx2b == _currentEpisode.episodeId && _0x83dfx2c != -1) {
          return _0x83dfx2c
      };
      var _0x83dfx1a = false;
      var _0x83dfx2d = this.getNextEpisodeElem();
      if (_0x83dfx2d == null) {
          _0x83dfx1a = true
      };
      _0x83dfx2b = _currentEpisode.episodeId;
      _0x83dfx2c = _0x83dfx1a;
      return _0x83dfx1a
  };
  this.getNextEpisodeElem = function () {
      var _0x83dfx2d = null;
      try {
          var _0x83dfx2e = _currentEpisode.episodeId;
          jNextEpisodeElem = jQuery("a\[data-episodeid=" + _0x83dfx2e + "\]").parent().next().find("a");
          if (jNextEpisodeElem.length > 0) {
              _0x83dfx2d = jNextEpisodeElem[0]
          }
      } catch (err) {
          _0x83dfx2d = null
      };
      return _0x83dfx2d
  };
  this.goNext = function () {
      this.clearGoNextCountDown();
      this.hideAutoNextMessage();
      if (this.isFinalEpisode()) {
          return false
      };
      var _0x83dfx2f = this.getNextEpisodeElem();
      this.changeEpisode(_0x83dfx2f);
      this.scrollFit()
  };
  this.setGoNext = function (_0x83dfx30) {
      if (this.isFinalEpisode()) {
          return false
      };
      if (typeof _0x83dfx30 != "number" || _0x83dfx30 < 0) {
          var _0x83dfx30 = 0
      };
      this.goNextCountDown(_0x83dfx30)
  };
  var _0x83dfx31 = null;
  var _0x83dfx32 = 0;
  var _0x83dfx33 = 0;
  this.clearGoNextCountDown = function () {
      if (_0x83dfx31 != "null") {
          clearTimeout(_0x83dfx31);
          _0x83dfx31 = null
      }
  };
  this.goNextCountDown = function (_0x83dfx30) {
      if (typeof _0x83dfx30 == "number" && _0x83dfx30 >= 0) {
          _0x83dfx32 = _0x83dfx30
      };
      this.clearGoNextCountDown();
      if (_0x83dfx32 <= 0) {
          if (this.isAutoNext()) {
              this.goNext()
          }
      } else {
          var _0x83dfx34 = _0x83dfx32.toFixed(1);
          var _0x83dfx35 = "Chuẩn bị chuyển tập sau " + _0x83dfx34 + "s nữa";
          this.displayAutoNextMessage(_0x83dfx35);
          var _0x83dfx36 = this;
          _0x83dfx32 = parseFloat((_0x83dfx32 - 0.1).toFixed(1));
          _0x83dfx31 = setTimeout(function () {
              _0x83dfx36.goNextCountDown()
          }, 100)
      }
  };
  this.initAutoNextMessage = function () {
      if (jQuery("#autonext-overlay").length > 0) {
          return false
      };
      jQuery("body").append('<div id="autonext-overlay" style="display: none;"><div class="inner"><span class="text" id="autonext-message"></span><button type="button" id="btn-autonext-cancel" class="btn btn-default btn-small">Hủy chuyển tập</button><button type="button" id="btn-autonext-force" class="btn btn-default btn-small" style="margin-left: 5px;">Chuyển luôn</button><span class="close" id="btn-autonext-close">×</span></div></div>');
      var _0x83dfx36 = this;
      jQuery("#btn-autonext-cancel").click(function () {
          _0x83dfx36.clearGoNextCountDown();
          _0x83dfx36.hideAutoNextMessage();
          _0x83dfx36.autoNextToggle(0)
      });
      jQuery("#btn-autonext-close").click(function () {
          _0x83dfx36.hideAutoNextMessage()
      });
      jQuery("#btn-autonext-force").click(function () {
          _0x83dfx36.goNext()
      })
  };
  this.displayAutoNextMessage = function (_0x83dfx37) {
      if (typeof _0x83dfx37 != "string") {
          return false
      };
      if (_0x83dfx33 == _currentEpisode.episodeId) {
          return false
      };
      this.initAutoNextMessage();
      jQuery("#autonext-message").html(_0x83dfx37);
      jQuery("#autonext-overlay").fadeIn("fast");
      return true
  };
  this.hideAutoNextMessage = function () {
      _0x83dfx33 = _currentEpisode.episodeId;
      jQuery("#autonext-overlay").fadeOut("fast")
  };
  this.rememberEpisode = function () {
      try {
          var _0x83dfx38 = filmInfo.filmId;
          var _0x83dfx39 = _0x83dfx38 + "-watching-episode";
          var _0x83dfx3a = JSON.stringify({
              'number': _currentEpisode.number,
              'part': _currentEpisode.part,
              'language': _currentEpisode.language,
              'edition': _currentEpisode.edition
          });
          fx.localStorage.set(_0x83dfx39, _0x83dfx3a)
      } catch (err) {
          console.error("Lỗi lưu tập đang xem: " + err.message)
      }
  };
  this.getRememberEpisode = function () {
      try {
          var _0x83dfx38 = filmInfo.filmId;
          var _0x83dfx39 = _0x83dfx38 + "-watching-episode";
          var _0x83dfx3a = fx.localStorage.get(_0x83dfx39);
          if (!_0x83dfx3a) {
              return false
          };
          var _0x83dfx26 = jQuery.parseJSON(_0x83dfx3a);
          return _0x83dfx26
      } catch (err) {
          console.error("Lỗi lấy tập đã xem: " + err.message);
          return false
      }
  };
  var _0x83dfx3b = null;
  var _0x83dfx3c = null;
  this.choiseRememberEpisode = function () {
      try {
          var _0x83dfx3d = watching.getRememberEpisode();
          if (typeof _0x83dfx3d == "object" && _0x83dfx3d && typeof _0x83dfx3d.number != "undefined") {
              var _0x83dfx3e = ".btn-episode";
              if (typeof _0x83dfx3d.number != "undefined" && _0x83dfx3d.number) {
                  _0x83dfx3e += "\[data-number=" + _0x83dfx3d.number + "\]"
              };
              if (typeof _0x83dfx3d.part != "undefined" && _0x83dfx3d.part !== "") {
                  _0x83dfx3e += "\[data-part=" + _0x83dfx3d.part + "\]"
              };
              if (typeof _0x83dfx3d.language != "undefined" && _0x83dfx3d.language) {
                  _0x83dfx3e += "\[data-language=" + _0x83dfx3d.language + "\]"
              };
              if (typeof _0x83dfx3d.edition != "undefined" && _0x83dfx3d.edition) {
                  _0x83dfx3e += "\[data-edition=" + _0x83dfx3d.edition + "\]"
              };
              jQuery(_0x83dfx3e).addClass("history-episode");
              var _0x83dfx3f = this.getRememberPosition();
              if (typeof _0x83dfx3f != "number" || _0x83dfx3f < 0) {
                  _0x83dfx3f = 0
              };
              if (_0x83dfx3f < 60) {
                  var _0x83dfx40 = " \(Lần trước bạn đang xem dở tập này\)"
              } else {
                  var _0x83dfx40 = " \(Lần trước bạn đang xem dở tập này tại phút thứ " + Math.floor(_0x83dfx3f / 60) + "\)";
                  jQuery(_0x83dfx3e).attr("data-history-position", _0x83dfx3f);
                  jQuery(_0x83dfx3e).attr("href", jQuery(_0x83dfx3e).attr("href") + "#position=" + _0x83dfx3f)
              };
              jQuery(_0x83dfx3e).attr("title", jQuery(_0x83dfx3e).attr("title") + _0x83dfx40);
              if (typeof window.choiseRemeberEpisodeCallback == "function") {
                  _0x83dfx3d.selector = _0x83dfx3e;
                  window.choiseRemeberEpisodeCallback(_0x83dfx3d, _0x83dfx3f)
              } else {
                  console.warn('console.warn\("choiseRemeberEpisodeCallback is not defined."\);')
              }
          } else {
              return false
          }
      } catch (err) {};
      return true;
      var _0x83dfx41 = this.getRememberEpisode();
      if (!_0x83dfx41) {
          return false
      };
      var _0x83dfx36 = this;
      var _0x83dfx42 = this.getRememberPosition();
      var _0x83dfx43 = Math.floor(this.getRememberPosition() / 60);
      var _0x83dfx44 = (_0x83dfx43 > 0) ? " \(phút " + _0x83dfx43 + "\)" : "";
      var _0x83dfx45 = {
          'subtitle': "bản <b>Vietsub</b>",
          'illustrate': "bản <b>Thuyết minh</b>",
          'dubbing': "bản <b>Lồng tiếng</b>",
          'vietnam': "bản <b>Tiếng Việt</b>",
          'raw': "bản <b>Raw</b>-Chưa Vietsub"
      };
      var _0x83dfx46 = (typeof _0x83dfx45[_0x83dfx41.language] == "string") ? _0x83dfx45[_0x83dfx41.language] : "";
      var _0x83dfx47 = _0x83dfx41.number;
      if (_0x83dfx41.part) {
          _0x83dfx47 += "." + _0x83dfx41.part
      };
      var _0x83dfx48 = 1;
      var _0x83dfx49 = 1;
      if (typeof window.filmInfo == "object" && typeof window.filmInfo.isSeries != "undefined") {
          _0x83dfx48 = (window.filmInfo.isSeries) ? 1 : 0
      };
      if (!_0x83dfx48) {
          _0x83dfx47 = "";
          if (_0x83dfx41.part) {
              _0x83dfx47 = "<b>Part " + _0x83dfx41.part + "</b>"
          }
      };
      var _0x83dfx2d = null;
      var _0x83dfx4a = "";
      if (_0x83dfx41.part) {
          var _0x83dfx4b = jQuery("a\[data-number=" + _0x83dfx41.number + "\]\[data-part=" + (_0x83dfx41.part + 1) + "\]");
          if (_0x83dfx4b.length == 0) {
              var _0x83dfx4b = jQuery("a\[data-number=" + (_0x83dfx41.number + 1) + "\]")
          };
          if (_0x83dfx4b.length == 0) {
              _0x83dfx49 = 0
          }
      } else {
          var _0x83dfx4b = jQuery("a\[data-number=" + (_0x83dfx41.number + 1) + "\]");
          if (_0x83dfx4b.length == 0) {
              _0x83dfx49 = 0
          }
      };
      _0x83dfx3b = _0x83dfx41;
      if (_0x83dfx49) {
          var _0x83dfx4c = _0x83dfx4b[0];
          var _0x83dfx4d = this.episodeInfoFromElem(_0x83dfx4c);
          _0x83dfx3c = _0x83dfx4c;
          var _0x83dfx4e = _0x83dfx4d.number;
          if (_0x83dfx4d.part) {
              _0x83dfx4e += "." + _0x83dfx4d.part
          };
          var _0x83dfx35 = "Hệ thống ghi nhận lần trước bạn đang xem dở <b>tập " + _0x83dfx47 + "</b> " + _0x83dfx46 + ((_0x83dfx43 > 0) ? (" tại <b>phút thứ " + _0x83dfx43 + "</b>") : "") + ", Bạn có muốn xem tiếp <b>tập " + _0x83dfx47 + "</b> không hay chuyển sang xem <b>tập " + _0x83dfx4e + "</b>\?";
          this.messageBox("Chọn tập phim", _0x83dfx35, [{
              "text": "Xem tập " + _0x83dfx47 + _0x83dfx44,
              "callback": function () {
                  _0x83dfx36.loadRemember(_0x83dfx43 * 60)
              }
          }, {
              "text": "Chuyển sang tập " + _0x83dfx4e,
              "callback": function () {
                  _0x83dfx36.loadNextRemember()
              }
          }])
      } else {
          if (_0x83dfx48) {
              var _0x83dfx35 = "Hệ thống ghi nhận lần trước bạn đang xem dở <b>tập " + _0x83dfx47 + "</b> " + _0x83dfx46 + ((_0x83dfx43 > 0) ? (" tại <b>phút thứ " + _0x83dfx43 + "</b>") : "") + ", Bạn có muốn xem tiếp <b>tập " + _0x83dfx47 + "</b> không\?";
              this.messageBox("Chọn tập phim", _0x83dfx35, [{
                  "text": "Xem tiếp tập " + _0x83dfx47 + _0x83dfx44,
                  "callback": function () {
                      _0x83dfx36.loadRemember(_0x83dfx43 * 60)
                  }
              }])
          } else {
              var _0x83dfx35 = "Hệ thống ghi nhận lần trước bạn đang xem dở " + _0x83dfx47 + " " + _0x83dfx46 + ((_0x83dfx43 > 0) ? (" tại <b>phút thứ " + _0x83dfx43 + "</b>") : "") + ", Bạn có muốn xem tiếp tại đó không\?";
              this.messageBox("Xem tiếp từ lần trước", _0x83dfx35, [{
                  "text": "Xem tiếp " + _0x83dfx47 + _0x83dfx44,
                  "callback": function () {
                      _0x83dfx36.loadRemember(_0x83dfx43 * 60)
                  }
              }])
          }
      };
      return true
  };
  this.loadRemember = function (_0x83dfx4f) {
      try {
          if (_0x83dfx3b == null) {
              return false
          };
          if (typeof _0x83dfx4f != "number" || _0x83dfx4f < 0) {
              var _0x83dfx4f = 0
          };
          var _0x83dfx48 = 1;
          if (typeof window.filmInfo == "object" && typeof window.filmInfo.isSeries != "undefined") {
              _0x83dfx48 = (window.filmInfo.isSeries) ? 1 : 0
          };
          var _0x83dfx50 = "a\[data-number=" + _0x83dfx3b.number + "\]\[data-part=" + _0x83dfx3b.part + "\]\[data-language=" + _0x83dfx3b.language + "\]";
          var _0x83dfx51 = "a\[data-number=" + _0x83dfx3b.number + "\]\[data-part=" + _0x83dfx3b.part + "\]";
          var _0x83dfx52 = "a\[data-number=" + _0x83dfx3b.number + "\]";
          var _0x83dfx53 = jQuery(_0x83dfx50);
          if (_0x83dfx53.length == 0) {
              var _0x83dfx53 = jQuery(_0x83dfx51)
          };
          if (_0x83dfx53.length == 0) {
              var _0x83dfx53 = jQuery(_0x83dfx52);
              if (_0x83dfx53.length > 0) {
                  _0x83dfx4f = 0
              }
          };
          if (_0x83dfx53.length == 0) {
              eval('console.warn\("Remember: Không tìm được dữ liệu phù hợp"\);');
              if (_0x83dfx4f > 60) {
                  if (this.getPlayer().getState() == "playing" && this.getPlayer().getDuration() > _0x83dfx4f) {
                      this.getPlayer().seek(_0x83dfx4f)
                  } else {
                      this.getPlayer().setStartPosition(_0x83dfx4f)
                  }
              };
              return false
          };
          var _0x83dfx54 = this.episodeInfoFromElem(_0x83dfx53[0]);
          if (_0x83dfx54.episodeId == _currentEpisode.episodeId) {
              if (_0x83dfx4f > 60) {
                  if (this.getPlayer().getState() == "playing") {
                      this.getPlayer().seek(_0x83dfx4f)
                  } else {
                      this.getPlayer().setStartPosition(_0x83dfx4f)
                  }
              };
              return false
          };
          this.getPlayer().setStartPosition(_0x83dfx4f);
          this.changeEpisode(_0x83dfx53[0]);
          return true
      } catch (err) {
          console.error("Remember: " + err.message);
          return false
      }
  };
  this.loadNextRemember = function () {
      try {
          if (_0x83dfx3c == null) {
              return false
          };
          this.changeEpisode(_0x83dfx3c);
          return true
      } catch (err) {
          return false
      }
  };
  this.rememberPosition = function (_0x83dfx55) {
      try {
          if (typeof _0x83dfx55 != "number" || _0x83dfx55 < 0) {
              if (jQuery("#player-embed").length > 0) {
                  return false
              };
              var _0x83dfx55 = this.getPlayer().getPosition();
              if (_0x83dfx55 <= 0) {
                  return false
              }
          };
          var _0x83dfx38 = filmInfo.filmId;
          var _0x83dfx39 = _0x83dfx38 + "-watching-position";
          fx.localStorage.set(_0x83dfx39, _0x83dfx55.toString())
      } catch (err) {
          console.error("Lỗi lưu vị trí đang xem: " + err.message)
      }
  };
  this.getRememberPosition = function () {
      try {
          var _0x83dfx38 = filmInfo.filmId;
          var _0x83dfx39 = _0x83dfx38 + "-watching-position";
          var _0x83dfx56 = fx.localStorage.get(_0x83dfx39);
          var _0x83dfx57 = parseInt(_0x83dfx56);
          if (isNaN(_0x83dfx57)) {
              return 0
          };
          return _0x83dfx57
      } catch (err) {
          console.error("Lỗi lưu vị trí đang xem: " + err.message);
          return 0
      }
  };
  var _0x83dfx58 = null;
  this.startRememberPositionTimer = function () {
      try {
          if (_0x83dfx58 != null) {
              clearInterval(_0x83dfx58);
              _0x83dfx58 = null
          }
      } catch (err) {};
      if (jQuery("#player-embed").length > 0) {
          return false
      };
      var _0x83dfx36 = this;
      _0x83dfx58 = setInterval(function () {
          if (jQuery("#player-embed").length > 0) {
              clearInterval(_0x83dfx58);
              return false
          };
          _0x83dfx36.rememberPosition()
      }, 10000)
  };
  this.episodeInfoFromElem = function (_0x83dfx28) {
      try {
          var _0x83dfx54 = {};
          _0x83dfx54.episodeId = parseInt(jQuery(_0x83dfx28).attr("data-episodeid"));
          _0x83dfx54.number = parseInt(jQuery(_0x83dfx28).attr("data-number"));
          _0x83dfx54.part = parseInt(jQuery(_0x83dfx28).attr("data-part"));
          _0x83dfx54.language = jQuery.trim(jQuery(_0x83dfx28).attr("data-language"));
          _0x83dfx54.edition = jQuery.trim(jQuery(_0x83dfx28).attr("data-edition"));
          return _0x83dfx54
      } catch (err) {
          return false
      }
  };
  var _0x83dfx59 = {};
  this.addAdBreak = function (_0x83dfx5a, _0x83dfx5b, _0x83dfx5c) {
      if (typeof _0x83dfx5a == "string" && (typeof _0x83dfx5b == "string" || typeof _0x83dfx5b == "number") && (typeof _0x83dfx5c == "string" || (typeof _0x83dfx5c == "object" && typeof _0x83dfx5c.length == "number" && _0x83dfx5c.length > 0))) {
          _0x83dfx59[_0x83dfx5a] = {
              'offset': _0x83dfx5b,
              'tag': _0x83dfx5c
          };
          return true
      };
      console.error("FxPlayer: Quảng cáo cần add không hợp lệ.");
      return false
  };
  this.removeAdBreak = function (_0x83dfx5a) {
      if (typeof _0x83dfx5a == "string") {
          delete _0x83dfx59[_0x83dfx5a];
          return true
      };
      return false
  };
  this.clearAdBreak = function () {
      _0x83dfx59 = {}
  };
  this.getAllAdBreak = function () {
      return _0x83dfx59
  };
  this.getAdBreakCount = function () {
      try {
          if (!Object.keys) {
              Object.keys = (function () {
                  "use strict";
                  var _0x83dfx5d = Object.prototype.hasOwnProperty,
                      _0x83dfx5e = !({
                          toString: null
                      }).propertyIsEnumerable("toString"),
                      _0x83dfx5f = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                      _0x83dfx60 = _0x83dfx5f.length;
                  return function (_0x83dfx53) {
                      if (typeof _0x83dfx53 !== "object" && (typeof _0x83dfx53 !== "function" || _0x83dfx53 === null)) {
                          throw new TypeError("Object.keys called on non-object")
                      };
                      var _0x83dfx61 = [],
                          _0x83dfx62, _0x83dfxc;
                      for (_0x83dfx62 in _0x83dfx53) {
                          if (_0x83dfx5d.call(_0x83dfx53, _0x83dfx62)) {
                              _0x83dfx61.push(_0x83dfx62)
                          }
                      };
                      if (_0x83dfx5e) {
                          for (_0x83dfxc = 0; _0x83dfxc < _0x83dfx60; _0x83dfxc++) {
                              if (_0x83dfx5d.call(_0x83dfx53, _0x83dfx5f[_0x83dfxc])) {
                                  _0x83dfx61.push(_0x83dfx5f[_0x83dfxc])
                              }
                          }
                      };
                      return _0x83dfx61
                  }
              }())
          };
          return Object.keys(_0x83dfx59).length
      } catch (err) {
          return 0
      }
  };
  this.setVastList = function (_0x83dfx63) {
      this.addAdBeak("prerollAds", "pre", _0x83dfx63);
      console.warn("Phương thức setVastList không còn được khuyến nghị, nên dùng addAdBreak\(id,offset,tag\)")
  };
  this.getVastList = function () {
      var _0x83dfx64 = [];
      for (var _0x83dfxc in _0x83dfx59) {
          if (_0x83dfx59[_0x83dfxc].offset == "pre") {
              if (typeof _0x83dfx59[_0x83dfxc].tag == "string") {
                  _0x83dfx64.push(_0x83dfx59[_0x83dfxc].tag)
              } else {
                  _0x83dfx64 = _0x83dfx64.concat(_0x83dfx59[_0x83dfxc].tag)
              }
          }
      };
      console.warn("Phương thức setVastList/getVastList không còn được khuyến nghị, nên dùng addAdBreak\(id,offset,tag\)");
      return _0x83dfx64
  };
  this.getPrerollTag = function () {
      return this.getVastList()
  };
  this.initNoticeBox = function () {
      try {
          if (jQuery("#player-notice").length > 0) {
              jQuery("#player-notice").css("display", "none");
              jQuery("#player-notice").html("");
              return false
          };
          var _0x83dfx65 = '<div id="player-notice" style="border: 1px solid #D7E000;padding: 10px;background-color: #000;width: 100%;box-sizing: border-box;text-align: left;display: none;"></div>';
          jQuery("#media-player").before(_0x83dfx65)
      } catch (err) {
          console.log(err)
      }
  };
  this.handleData = function (movieData) {
      jQuery("#media-player #player-embed").remove();
      if (typeof movieData == "object") {
          window.lastEpisodeData = movieData
      };
      this.cancelReloadTimer();
      this.initNoticeBox();
      var _0x83dfx66 = this.getRequestId();
      if (typeof movieData.requestId != "undefined" && movieData.requestId && movieData.requestId != _0x83dfx66) {
          console.warn("requestId không khớp! " + _0x83dfx66 + "!=" + movieData.requestId);
          return false
      };
      if (typeof movieData != "object") {
          console.error("episodeData không phải là 1 object");
          return false
      };
      if (typeof movieData.reload != "undefined" && movieData.reload) {
          if (typeof movieData.reloadUrl == "string" && movieData.reloadUrl != "") {
              fx.displayMessage("Chuẩn bị chuyển trang...");
              setTimeout(function () {
                  window.location.replace(movieData.reloadUrl)
              }, 2000)
          } else {
              fx.displayMessage("Chuẩn bị tải lại trang...!");
              setTimeout(function () {
                  window.location.reload()
              }, 2000)
          };
          return true
      };
      movieData = decryptUrl(movieData);
      var playlist = this.getPlaylist(movieData);
      if (!playlist) {
          console.error("Không tạo được playlist");
          return false
      };
      if (typeof movieData.original == "string") {
          this.setBackupFile(movieData.original)
      } else {
          this.setBackupFile("")
      };
      _currentEpisode = movieData;
      try {
          if (typeof movieData.medias == "object" && movieData.medias.length > 0) {
              if (movieData.medias[0].url.indexOf("googleapis.com") != -1) {
                  this.trackEvent("Stream Server", "Google Storage", filmInfo.title)
              } else {
                  if (movieData.medias[0].url.indexOf("googleusercontent.com") != -1) {
                      this.trackEvent("Stream Server", "Google User Content", filmInfo.title)
                  } else {
                      if (movieData.medias[0].url.indexOf("googlevideo.com") != -1) {
                          this.trackEvent("Stream Server", "Google Video", filmInfo.title)
                      } else {
                          if (movieData.medias[0].url.indexOf("google") != -1) {
                              this.trackEvent("Stream Server", "Other Google Server", filmInfo.title)
                          } else {
                              if (movieData.medias[0].url.indexOf(".phimmoi.net/s") != -1) {
                                  this.trackEvent("Stream Server", "PhimMoi Server", filmInfo.title)
                              }
                          }
                      }
                  }
              }
          }
      } catch (err) {};
      if (!_0x83dfx4) {
          _0x83dfx3.setPlaylist(playlist);
          if (typeof filmInfo.previewUrl == "string" && filmInfo.previewUrl != "") {
              _0x83dfx3.setImage(filmInfo.previewUrl)
          };
          _0x83dfx3.setGAOptions(null);
          var _0x83dfx68 = this.getAllAdBreak();
          for (var _0x83dfxc in _0x83dfx68) {
              if (_0x83dfx68[_0x83dfxc].offset != "pre") {
                  _0x83dfx3.addAdBreak(_0x83dfxc, _0x83dfx68[_0x83dfxc].offset, _0x83dfx68[_0x83dfxc].tag)
              }
          };
          if (this.getDeviceType() != "desktop") {
              _0x83dfx3.setAdTrackingCategory("Mobile")
          } else {
              _0x83dfx3.setAdTrackingCategory("PC")
          };
          _0x83dfx3.setup();
          this.setPlayerEvent();
          this.startRememberPositionTimer();
          _0x83dfx4 = true
      } else {
          _0x83dfx3.load(playlist)
      };
      try {
          if (typeof movieData.notice == "object" && movieData.notice && movieData.notice.length > 0) {
              var _0x83dfx69 = "\+ ";
              if (movieData.notice.length == 1) {
                  _0x83dfx69 = ""
              };
              for (var _0x83dfxc in movieData.notice) {
                  var _0x83dfx6a = _0x83dfx69 + movieData.notice[_0x83dfxc] + ((_0x83dfx69 != "") ? "<br>" : "");
                  jQuery("#player-notice").append(_0x83dfx6a)
              };
              jQuery("#player-notice").slideDown("fast")
          }
      } catch (err) {
          console.log(err)
      };
      this.rememberEpisode();
      this.rememberPosition(0);
      this.trackEvent("episodeView", "onPage", movieData.episodeId);
      if (typeof window.thirdPartyStorageHandle == "function") {
          try {
              window.thirdPartyStorageHandle(movieData)
          } catch (err) {}
      };
      try {
          if (document.cookie.indexOf("test_new") == -1) {};
          if (typeof movieData.thirdParty == "object" && movieData.thirdParty.length > 0) {
              if (jQuery("#third-party-server ul.server-list").length <= 0) {
                  jQuery("#third-party-server").append('<ul class="server-list">						<li class="backup-server">							<span class="server-title">Link dự phòng</span>							<ul class="list-episode">								<li class="episode">									<a rel="nofollow" data-embedurl="" class="btn-link-backup btn-episode black episode-link active">HRX</a></li>									<a rel="nofollow" data-embedurl="" class="btn-link-backup btn-episode black episode-link">GDP</a></li>									<a rel="nofollow" data-embedurl="" class="btn-link-backup btn-episode black episode-link">GPM</a></li>								</li>							</ul>						</li>					</ul>')
              };
              jQuery("#third-party-server a.btn-link-backup").remove();
              for (var _0x83dfx6b in movieData.thirdParty) {
                  var _0x83dfx6c = movieData.thirdParty[_0x83dfx6b];
                  jQuery("#third-party-server .backup-server .list-episode li.episode").append('						<a rel="nofollow" data-embedurl="' + _0x83dfx6c.embed + '" class="btn-link-backup btn-episode black episode-link" href="javascript://;">' + _0x83dfx6c.displayName + "</a></li>					")
              };
              jQuery("#third-party-server a.btn-link-backup").click(function () {
                  var _0x83dfx6d = jQuery(this).attr("data-embedurl");
                  if (_0x83dfx6d != "") {
                      try {
                          this.getPlayer().stop()
                      } catch (err) {};
                      jQuery("#media-player #player-embed").remove();
                      if (typeof window.changeEmbedLinkCallback == "function") {
                          var _0x83dfx6e = {
                              'embedUrl': _0x83dfx6d,
                              'linkObj': this
                          };
                          window.changeEmbedLinkCallback(_0x83dfx6e);
                          if (_0x83dfx6e.embedUrl && _0x83dfx6d != _0x83dfx6e.embedUrl) {
                              _0x83dfx6d = _0x83dfx6e.embedUrl
                          }
                      } else {
                          eval('console.warn\("changeEmbedLinkCallback is not defined."\);')
                      };
                      if (_0x83dfx6d.indexOf("://") == -1) {
                          try {
                              _0x83dfx6d = GibberishAES.dec(_0x83dfx6d, "@@@3rd")
                          } catch (err) {}
                      };
                      if (_0x83dfx6d.indexOf("://") == -1) {
                          eval('console.error\("Không thể giải mã link của bên thứ 3"\);');
                          eval('window.alert\("Không thể giải mã link của bên thứ 3"\);')
                      };
                      jQuery("#media-player").append('<div id="player-embed" style="width: 100%;height: auto;border:0;padding:0;margin:0;position: absolute;top:0;left:0;bottom:0;right:0;z-index:10;background-color:#000;"><iframe class="player-embed-iframe" src="' + _0x83dfx6d + '"  width="100%" height="100%" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no"  allow="autoplay" onload="fx.hideLoad\(\)" onerror="fx.hideLoad\(\)"></iframe></div>');
                      watching.scrollFit();
                      try {
                          fx.showLoad()
                      } catch (err) {}
                  };
                  jQuery("#third-party-server a.btn-link-backup").removeClass("active");
                  jQuery(this).addClass("active")
              })
          } else {
              jQuery("#third-party-server").html("")
          }
      } catch (err) {
          eval('console.error\("thirdParty Error:"\+err.message\)')
      };
      try {
          window.EMBED_TIME.lockUpdate = 0
      } catch (err) {};
      try {
          if (typeof window.handleDataCompleteCallback == "function") {
              window.handleDataCompleteCallback(movieData)
          } else {
              eval('console.warn\("handleDataCompleteCallback is not defined."\);')
          }
      } catch (err) {};
      return true
  };
  var _0x83dfx6f = null;
  this.setSkipWaiting = function (_0x83dfx70) {
      if (typeof _0x83dfx70 != "number" || _0x83dfx70 < 3) {
          var _0x83dfx70 = 3
      };
      var _0x83dfx71 = parseInt(_0x83dfx70);
      var _0x83dfx36 = this;
      _0x83dfx6f = setTimeout(function () {
          _0x83dfx36.loadCurrentEpisode()
      }, _0x83dfx71 * 1000)
  };
  this.cancelSkipWaiting = function () {
      try {
          if (_0x83dfx6f != null) {
              clearTimeout(_0x83dfx6f);
              _0x83dfx6f = null;
              console.log("skipWaiting has been canceled!")
          }
      } catch (err) {
          console.error("Lỗi hủy bộ định thời: " + err.message)
      }
  };
  var _0x83dfx72 = null;
  this.setReloadTimer = function (_0x83dfx70) {
      this.cancelReloadTimer();
      if (typeof _0x83dfx70 != "number" || _0x83dfx70 < 3) {
          var _0x83dfx70 = 3
      };
      var _0x83dfx73 = parseInt(_0x83dfx70);
      _0x83dfx72 = setTimeout(function () {
          if (typeof fx.displayMessage == "function") {
              fx.displayMessage("Chuẩn bị tải lại trang...");
              setTimeout(function () {
                  window.location.reload()
              }, 500)
          } else {
              window.location.reload()
          }
      }, _0x83dfx73 * 1000)
  };
  this.cancelReloadTimer = function () {
      if (_0x83dfx72 != null) {
          clearTimeout(_0x83dfx72);
          _0x83dfx72 = null;
          console.log("reloadTimer has been canceled!")
      }
  };
  this.loadCurrentEpisode = function () {
      this.cancelSkipWaiting();
      this.handleData(_currentEpisode);
      removePlayerLoading()
  };
  this.changeEpisode = function (_0x83dfx28, _0x83dfx74) {
      try {
          if (_0x83dfx19) {
              return true
          };
          var _0x83dfx1b = /Android.+UCBrowser/i;
          if (_0x83dfx1b.test(window.navigator.userAgent)) {
              return true
          };
          var _0x83dfx75 = parseInt(jQuery(_0x83dfx28).attr("data-episodeid"));
          var _0x83dfx76 = parseInt(jQuery(_0x83dfx28).attr("data-number"));
          var _0x83dfx77 = parseInt(jQuery(_0x83dfx28).attr("data-part"));
          var _0x83dfx78 = jQuery(_0x83dfx28).attr("href");
          if (_0x83dfx75 <= 0 || _0x83dfx76 <= 0) {
              return true
          };
          if (typeof CLIENT_IP != "string") {
              this.messageBox("Phát sinh lỗi", "Hệ thống không nhận diện được IP của bạn. Vui lòng thử tải lại trang.", [{
                  "text": "Tải lại trang",
                  "callback": function () {
                      window.location.reload()
                  }
              }]);
              return false
          };
          var _0x83dfx1d = _0x83dfx75 + "-" + Math.ceil(Math.random() * 1000);
          var _0x83dfx79 = {
              'ip': CLIENT_IP,
              'filmid': filmInfo.filmId,
              'episodeid': _0x83dfx75,
              'number': _0x83dfx76,
              'part': _0x83dfx77,
              'filmslug': filmInfo.url,
              'type': "json",
              'requestid': _0x83dfx1d
          };
          if (typeof TOKEN_EPISODE == "string" && TOKEN_EPISODE != "") {
              _0x83dfx79.token = TOKEN_EPISODE
          };
          if (typeof TOKEN_CS == "string" && TOKEN_CS != "") {
              _0x83dfx79.cs = TOKEN_CS
          };
          if (typeof _0x83dfxf == "string" && _0x83dfxf != "") {
              _0x83dfx79.sig = _0x83dfxf
          };
          if (typeof _decryptKey == "string" && _decryptKey != "") {
              _0x83dfx79.decryptkey = _decryptKey
          };
          this.setRequestId(_0x83dfx1d);
          var _0x83dfx7a = this.getInfoPath();
          if (typeof _0x83dfx7a != "string") {
              var _0x83dfx7a = "episodeinfo2.php"
          };
          var _0x83dfx36 = this;
          try {
              if (typeof window.changeEpisodeBeforeSendCallback == "function") {
                  window.changeEpisodeBeforeSendCallback(_0x83dfx79)
              } else {
                  eval('console.warn\("changeEpisodeBeforeSendCallback is not defined."\);')
              }
          } catch (err) {};
          jQuery.ajax({
              'url': _0x83dfx7a,
              'type': "GET",
              'dataType': "json",
              'context': {
                  'silentError': true
              },
              'noToken': true,
              'cache': true,
              'xhrFields': {
                  'withCredentials': true
              },
              'data': _0x83dfx79
          }).done(function (_0x83dfx26) {
              _0x83dfx36.handleData(_0x83dfx26)
          }).fail(function (_0x83dfx7b, _0x83dfx7c, _0x83dfx7d) {});
          if (typeof _0x83dfx78 == "string" && _0x83dfx78 != "") {
              this.changeUrl(_0x83dfx78)
          };
          jQuery("a\[id\^=btn-episode-\]").removeClass("active");
          jQuery(_0x83dfx28).addClass("active");
          try {
              if (typeof _0x83dfx74 == "undefined" || _0x83dfx74) {
                  this.restartAd()
              };
              watching.scrollFit()
          } catch (err) {
              console.error("Lỗi load lại quảng cáo: " + err.message)
          };
          try {
              if (typeof window.changeEpisodeComplete == "function") {
                  window.changeEpisodeComplete(data)
              } else {
                  eval('console.warn\("changeEpisodeComplete is not defined."\);')
              }
          } catch (err) {};
          eval('console.log\("Change to episode: ' + _0x83dfx76 + '"\);');
          return false
      } catch (err) {
          console.error(err.message);
          return true
      }
  };
  this.getPlaylist = function (movieData) {
      if (typeof movieData.original == "string") {
          var _0x83dfx7e = this.getCustomFlag("googleVideoOk");
          var _0x83dfx7f = this.getCustomFlag("originalFileOk");
          var _0x83dfx80 = movieData.original;
          if (!_0x83dfx7e && _0x83dfx7f) {
              movieData.medias = [{
                  'url': _0x83dfx80,
                  'resolution': "720p",
                  'type': "mp4",
                  'width': 1280,
                  'height': 720
              }];
              try {
                  console.log("FxPlayer: Auto change to Original");
                  this.trackEvent("Auto Action", "Change To Original", "Auto change to Original File")
              } catch (err) {}
          }
      };
      var _0x83dfx81 = "&token=" + ((typeof TOKEN_HTML5_VIDEO == "string" && TOKEN_HTML5_VIDEO != "") ? TOKEN_HTML5_VIDEO : "");
      if (typeof movieData.medias == "object" && (typeof movieData.medias.video == "object" || (typeof movieData.medias.length == "number" && movieData.medias.length > 0))) {
          var _0x83dfx82 = [];
          var _0x83dfx83 = "";
          var _0x83dfx84 = [];
          if (typeof movieData.medias.audio == "string" && movieData.medias.audio != "") {
              _0x83dfx83 = movieData.medias.audio
          };
          if (typeof movieData.medias.video == "object") {
              _0x83dfx84 = movieData.medias.video
          } else {
              _0x83dfx84 = movieData.medias
          };
          for (var _0x83dfx85 in _0x83dfx84) {
              var _0x83dfx86 = _0x83dfx84[_0x83dfx85];
              if ((_0x83dfx84[0].resolution == 360 && _0x83dfx86.resolution != 720 && _0x83dfx86.resolution != 360) && this.getDeviceType() != "desktop") {
                  continue
              };
              _0x83dfx82.push({
                  'file': _0x83dfx86.url,
                  'label': _0x83dfx86.resolution + "p",
                  'type': _0x83dfx86.type
              })
          };
          var playlist = [{
              'sources': _0x83dfx82,
              'audioUrl': _0x83dfx83
          }]
      } else {
          if (typeof movieData.url == "string" && movieData.url != "") {
              var _0x83dfx87 = "/player.php\?url=" + encodeURIComponent(movieData.url) + _0x83dfx81;
              var _0x83dfx88 = "/player.php\?url=" + encodeURIComponent(movieData.url) + _0x83dfx81 + "&res=720";
              var playlist = [{
                  'sources': [{
                      'file': _0x83dfx87,
                      'label': "360p",
                      'type': "mp4"
                  }, {
                      'file': _0x83dfx88,
                      'label': "720p",
                      'type': "mp4"
                  }]
              }]
          } else {
              console.error("Không tìm thấy link để play.");
              return false
          }
      };
      if (typeof movieData.vttUrl == "string" && movieData.vttUrl != "") {
          playlist[0].tracks = [{
              'file': movieData.vttUrl,
              'kind': "subtitles",
              'label': "Vietsub",
              'default': true
          }]
      };
      if (typeof filmInfo.previewUrl == "string" && filmInfo.previewUrl != "") {
          playlist[0].image = filmInfo.previewUrl
      };
      if (typeof movieData.number == "undefined" && typeof movieData.episodeNumber != "undefined") {
          movieData.number = movieData.episodeNumber
      };
      if (typeof movieData.part == "undefined" && typeof movieData.episodePart != "undefined") {
          movieData.part = movieData.episodePart
      };
      if (typeof filmInfo.title == "string" && filmInfo.title != "") {
          playlist[0].title = filmInfo.title;
          if (typeof movieData.number == "number") {
              playlist[0].description = "";
              if (typeof movieData.edition == "string" && movieData.edition != "") {
                  var _0x83dfx89 = {
                      'theatrical': "Bản chiếu rạp",
                      'uncut': "Bản không cắt",
                      'extended': "Bản mở rộng",
                      'tv': "Bản truyền hình"
                  };
                  var _0x83dfx8a = movieData.edition;
                  if (typeof _0x83dfx89[_0x83dfx8a] != "undefined") {
                      playlist[0].description += _0x83dfx89[_0x83dfx8a]
                  }
              };
              if (filmInfo.isSeries) {
                  if (movieData.number > 0) {
                      if (playlist[0].description != "") {
                          playlist[0].description += " - "
                      };
                      playlist[0].description += "Tập " + movieData.number;
                      if (typeof movieData.part == "number" && movieData.part > 0) {
                          playlist[0].description += "." + movieData.part
                      }
                  }
              } else {
                  if (typeof movieData.part == "number" && movieData.part > 0) {
                      if (playlist[0].description != "") {
                          playlist[0].description += " - "
                      };
                      playlist[0].description += "Part " + movieData.part
                  }
              };
              if (typeof movieData.language == "string" && movieData.language != "") {
                  var _0x83dfx8b = {
                      'subtitle': "Vietsub",
                      'illustrate': "Thuyết minh",
                      'dubbing': "Lồng tiếng",
                      'vietnam': "Phim VN"
                  };
                  var _0x83dfx8c = movieData.language;
                  if (typeof _0x83dfx8b[_0x83dfx8c] != "undefined") {
                      playlist[0].description += " \(" + _0x83dfx8b[_0x83dfx8c] + "\)"
                  }
              }
          };
          playlist[0].trackTitle = playlist[0].title + " / " + playlist[0].description;
          playlist[0].trackLabel = playlist[0].title
      };
      return playlist
  };
  var _0x83dfx8d = 0;
  this.setPauseOnReady = function (_0x83dfx18) {
      if (typeof _0x83dfx18 != "undefined" && !_0x83dfx18) {
          _0x83dfx8d = 0
      } else {
          _0x83dfx8d = 1
      }
  };
  this.isPauseOnReady = function () {
      return _0x83dfx8d
  };
  var _0x83dfx8e = 0;
  this.setAutoExpand = function () {
      _0x83dfx8e = 1
  };
  this.isAutoExpand = function () {
      return _0x83dfx8e
  };
  this.setPlayerEvent = function () {
      try {
          _w = this;
        //   _0x83dfx3.on("ready", function () {
        //       if (typeof removePlayerLoading == "function") {
        //           removePlayerLoading()
        //       };
        //       if (_w.isEnableExpand()) {
        //           try {
        //               _0x83dfx3.setExpandFunction(function () {
        //                   _w.resizeToggle("large")
        //               }, function () {
        //                   _w.resizeToggle("small")
        //               })
        //           } catch (err) {
        //               console.error("Lỗi thiết lập chức năng phóng to Player: " + err.message)
        //           }
        //       }
        //   });
        //   _0x83dfx3.on("firstFrame", function (_0x83dfx8f) {
        //       try {
        //           if (_w.isPauseOnReady()) {
        //               _w.setPauseOnReady(0);
        //               this.pause(true)
        //           };
        //           if (_w.isAutoExpand()) {
        //               var _0x83dfx90 = _0x83dfx3.getResolution();
        //               if (typeof _0x83dfx90 == "object" && _0x83dfx90.width > 800 && jQuery(window).width() >= 960) {
        //                   if (typeof _0x83dfxa9 == "string" && _0x83dfxa9 == "small") {
        //                       _flagScrollFitOnload = true;
        //                       jQuery("#btn-resize-player").click()
        //                   }
        //               };
        //               _autoExpanded = true
        //           };
        //           var _0x83dfx21 = filmInfo.title;
        //           var playlist = this.getPlaylist();
        //           if (playlist.length > 0) {
        //               if (typeof playlist[0].trackTitle == "string") {
        //                   _0x83dfx21 = playlist[0].trackTitle
        //               } else {
        //                   if (typeof playlist[0].title == "string") {
        //                       _0x83dfx21 = playlist[0].title
        //                   }
        //               }
        //           };
        //           _w.trackEvent("Watching", "First Frame Film", filmInfo.title);
        //           var _0x83dfx91 = this._vidObj.currentSrc;
        //           var _0x83dfx92 = (new RegExp("://\(\[\^/\]\+\)/", "i")).exec(_0x83dfx91);
        //           var _0x83dfx93 = "N/A Domain";
        //           var _0x83dfx94 = "Unknow";
        //           if (_0x83dfx92) {
        //               _0x83dfx93 = _0x83dfx92[1]
        //           };
        //           if (typeof _0x83dfx8f.loadTime == "number" && _0x83dfx8f.loadTime > 0) {
        //               if (_0x83dfx8f.loadTime <= 3000) {
        //                   _0x83dfx94 = "0-3s"
        //               } else {
        //                   if (_0x83dfx8f.loadTime <= 6000) {
        //                       _0x83dfx94 = "3.x-6s"
        //                   } else {
        //                       if (_0x83dfx8f.loadTime <= 9000) {
        //                           _0x83dfx94 = "6.x-9s"
        //                       } else {
        //                           if (_0x83dfx8f.loadTime <= 12000) {
        //                               _0x83dfx94 = "9.x-12s"
        //                           } else {
        //                               if (_0x83dfx8f.loadTime <= 15000) {
        //                                   _0x83dfx94 = "12.x-15s"
        //                               } else {
        //                                   if (_0x83dfx8f.loadTime <= 18000) {
        //                                       _0x83dfx94 = "15.x-18s"
        //                                   } else {
        //                                       _0x83dfx94 = ">18s"
        //                                   }
        //                               }
        //                           }
        //                       }
        //                   }
        //               }
        //           }
        //       } catch (err) {
        //           console.warn("Error on First Frame: " + err.message)
        //       }
        //   });
        //   _0x83dfx3.on("play", function () {
        //       try {
        //           if (_w.isPauseOnReady()) {
        //               _w.setPauseOnReady(0);
        //               this.pause(true)
        //           };
        //           _w.setCanRetry(true);
        //           var _0x83dfx35 = _w.getOnPlayMessage();
        //           if (_0x83dfx35 != "") {
        //               _w.trackEvent("On Play Message", "On Play", _0x83dfx35)
        //           };
        //           var _0x83dfx95 = this.getPlaylist();
        //           if (typeof _0x83dfx95 == "object" && typeof _0x83dfx95[0].sources == "object") {
        //               var _0x83dfx96 = _0x83dfx95[0].sources[0].file;
        //               if (_0x83dfx96.indexOf("googlevideo.com") != -1) {
        //                   _w.setCustomFlag("googleVideoOk", true)
        //               } else {
        //                   if (_0x83dfx96.indexOf("docs.googleusercontent.com") != -1) {
        //                       _w.setCustomFlag("originalFileOk", true)
        //                   }
        //               }
        //           }
        //       } catch (err) {
        //           console.warn("Error on Play: " + err.message)
        //       }
        //   });
        //   _0x83dfx3.on("complete", function () {
        //       if (_w.isAutoNext()) {
        //           _w.setGoNext(3)
        //       }
        //   });
        //   _0x83dfx3.on("error", function (_0x83dfx8f) {
        //       try {
        //           _w.playerErrorCallback(_0x83dfx8f)
        //       } catch (err) {}
        //   })
      } catch (err) {
          console.error("Lỗi set player Event: " + err.message);
          console.error(err.stack)
      }
  };
  var _0x83dfx97 = 1;
  var _0x83dfx98 = 0;
  var _0x83dfx99 = null;
  var _0x83dfx9a = "";
  var _0x83dfx9b = "";
  var _0x83dfx9c = false;
  this.setPrerollLoop = function (_0x83dfx9d) {
      if (typeof _0x83dfx9d == "number" && _0x83dfx9d >= 1) {
          _0x83dfx97 = parseInt(_0x83dfx9d)
      }
  };
  this.getPrerollLoop = function (_0x83dfx9d) {
      return _0x83dfx97
  };
  this.increasePrerollPlayed = function () {
      _0x83dfx98++
  };
  this.getPrerollPlayedCount = function () {
      return _0x83dfx98
  };
  this.getPrerollPlayer = function () {
      return _0x83dfx99
  };
  this.addPrerollToPlayer = function (_0x83dfx9e) {
      var _0x83dfx9f = this.getAllAdBreak();
      var _0x83dfxa0 = 0;
      for (var _0x83dfxc in _0x83dfx9f) {
          if (_0x83dfx9f[_0x83dfxc].offset == "pre") {
              _0x83dfx9e.addAdBreak(_0x83dfxc, _0x83dfx9f[_0x83dfxc].offset, _0x83dfx9f[_0x83dfxc].tag);
              _0x83dfxa0++
          }
      };
      return _0x83dfxa0
  };
  var _0x83dfxa1 = [];
  this.setPrerollOverlayVast = function (_0x83dfxa2) {
      _0x83dfxa1 = _0x83dfxa2
  };
  this.setupPreroll = function (_0x83dfxa3, _0x83dfxa4) {
      if (typeof _0x83dfxa5 != "number" || _0x83dfxa5 < 0) {
          var _0x83dfxa5 = 5
      };
      if ((typeof _0x83dfxa3 != "string" || _0x83dfxa3 == "") && _0x83dfx9a == "") {
          console.error("wrapperId không hợp lệ.");
          return false
      };
      if (jQuery("#" + _0x83dfxa3).length <= 0) {
          console.error("Không tìm thấy element nào có Id là: " + _0x83dfxa3);
          return false
      };
      if ((typeof _0x83dfxa4 != "string" || _0x83dfxa4 == "")) {
          _0x83dfxa4 = _0x83dfxa3
      };
      _0x83dfx9b = _0x83dfxa4;
      _0x83dfx9a = _0x83dfxa3;
      if (typeof window.setupOverlayPreroll == "function") {
          return window.setupOverlayPreroll("#" + _0x83dfxa3, "main_preroll_ads", 2)
      }
  };
  this.restartAd = function () {
      if (this.getDeviceType() == "tv") {
          console.log("Ad is canceled because TV detected....");
          return false
      };
      if (_0x83dfx9b != "" && typeof window.setupOverlayPreroll == "function") {
          console.log("Ad is restarting....");
          return this.setupPreroll(_0x83dfx9b)
      }
  };
  this.removeAd = function (_0x83dfxa6) {
      try {
          jQuery(".ad-container,.balloon-ad-wrap,.uniad-ad-wraper").fadeOut("fast", function () {
              jQuery(this).remove()
          });
          jQuery(".uniad-zonetype-floatleft,.uniad-zonetype-floatright").remove();
          if (typeof removeBalloon == "function") {
              removeBalloon()
          };
          var _0x83dfx36 = this;
          setTimeout(function () {
              _0x83dfx36.scrollFit()
          }, 500);
          if (typeof _0x83dfxa6 == "object") {
              jQuery(_0x83dfxa6).fadeOut("fast", function () {
                  jQuery(this).remove()
              })
          };
          if (this.getPlayerSize() == "large") {
              var _0x83dfxa7 = jQuery(".block-comments").offset().top - jQuery("#block-player").offset().top;
              jQuery("#sidebar").animate({
                  marginTop: _0x83dfxa7
              })
          }
      } catch (err) {
          console.error("Remove Ad Error: " + err.message)
      }
  };
  var _0x83dfxa8 = false;
  this.getLightStatus = function () {
      return (_0x83dfxa8) ? "off" : "on"
  };
  this.isLightOff = function () {
      return _0x83dfxa8
  };
  this.setLightOffStatus = function (_0x83dfx1a) {
      if (_0x83dfx1a) {
          _0x83dfxa8 = true
      } else {
          _0x83dfxa8 = false
      }
  };
  this.lightToggle = function () {
      if (jQuery("#light-overlay").length == 0) {
          console.error("Không tìm thấy #light-overlay")
      };
      var _0x83dfx36 = this;
      if (_0x83dfxa8 == 0) {
          jQuery("#watch-block").css("z-index", "1000");
          jQuery("#light-overlay").fadeIn("slow", function () {
              jQuery("#light-status").text("Bật đèn");
              _0x83dfx36.setLightOffStatus(1);
              _0x83dfx36.scrollFit();
              jQuery("body").css("overflow", "hidden");
              var _0x83dfx9e = _0x83dfx36.getPlayer();
              _0x83dfx9e.expandPlayer()
          })
      } else {
          jQuery("#light-overlay").fadeOut("slow", function () {
              jQuery("#light-status").text("Tắt đèn");
              _0x83dfx36.setLightOffStatus(0);
              jQuery("body").css("overflow", "auto")
          })
      }
  };
  var _0x83dfxa9 = "small";
  var _0x83dfxaa = false;
  this.setEnableExpand = function (_0x83dfx1a) {
      if (typeof _0x83dfx1a == "undefined") {
          var _0x83dfx1a = true
      };
      if (_0x83dfx1a) {
          _0x83dfxaa = true
      } else {
          _0x83dfxaa = false
      }
  };
  this.isEnableExpand = function (_0x83dfx1a) {
      return _0x83dfxaa
  };
  this.getPlayerSize = function () {
      return _0x83dfxa9
  };
  this.resizeToggle = function (_0x83dfxab) {
      if (!_0x83dfxaa) {
          console.warn("Tính năng phóng to/thu nhỏ player chưa được bật!");
          return false
      };
      if (typeof _0x83dfxab == "string") {
          if (this.getPlayerSize() == _0x83dfxab) {
              return false
          }
      };
      var _0x83dfxac = 0;
      var _0x83dfxad = {
          'width': 0,
          'height': 0
      };
      var _0x83dfxae = 34;
      if (_0x83dfxa9 == "small") {
          this._orgBoxWidth = jQuery("#block-player").outerWidth();
          var _0x83dfxaf = jQuery("#media-player-box").width();
          var _0x83dfxb0 = jQuery("#media-player-box").height();
          var _0x83dfxb1 = 960;
          var _0x83dfxb2 = 980;
          var _0x83dfxb3 = Math.ceil(_0x83dfxb1 / 16 * 9) + 40;
          var _0x83dfxb4 = _0x83dfxb3 - _0x83dfxb0;
          var _0x83dfxb5 = jQuery("#sidebar").offset().top;
          var _0x83dfxa7 = jQuery(".block-comments").offset().top + _0x83dfxb4 - _0x83dfxb5;
          jQuery("#sidebar").animate({
              marginTop: _0x83dfxa7
          });
          jQuery("#block-player").animate({
              width: _0x83dfxb2 + "px"
          }, function () {
              fx.scrollTo("#media-player-box", 1000)
          });
          jQuery("#watch-block").removeClass("small-player");
          jQuery("#watch-block").addClass("large-player");
          jQuery("#btn-resize-player #resize-status").text("Thu nhỏ");
          _0x83dfxa9 = "large"
      } else {
          jQuery("#block-player").animate({
              width: this._orgBoxWidth
          });
          jQuery("#sidebar").animate({
              marginTop: "0px"
          }, function () {
              fx.scrollTo("#media-player-box", 1000)
          });
          jQuery("#watch-block").addClass("small-player");
          jQuery("#watch-block").removeClass("large-player");
          jQuery("#btn-resize-player #resize-status").text("Phóng to");
          _0x83dfxa9 = "small"
      }
  };
  this.captureVideoFrame = function () {
      try {
          var _0x83dfx9e = this.getPlayer();
          var _0x83dfxb6 = _0x83dfx9e.getVideoObj();
          if (_0x83dfx9e.getPosition() <= 0 || _0x83dfxb6.readyState <= 1) {
              this.messageBox("Lỗi lưu ảnh từ video", "Hiện video chưa bắt đầu play nên không thể lưu ảnh được.<br><br>Trân trọng!");
              return false
          };
          var _0x83dfxb6 = _0x83dfx9e.getVideoObj();
          var _0x83dfxb7 = document.createElement("canvas");
          _0x83dfxb7.width = _0x83dfxb6.videoWidth;
          _0x83dfxb7.height = _0x83dfxb6.videoHeight;
          var _0x83dfxb8 = _0x83dfxb7.getContext("2d");
          _0x83dfx9e.pause();
          _0x83dfxb8.drawImage(_0x83dfxb6, 0, 0);
          jQuery(_0x83dfxb7).css("max-width", "100%");
          var _0x83dfxb9 = _0x83dfxb7.width + "x" + _0x83dfxb7.height;
          this.messageBox("Lưu ảnh từ video", "Nhấn phải vào ảnh bên dưới, chọn <b>Save image</b> hoặc <b>Lưu ảnh</b> \(" + _0x83dfxb9 + "\).<br>", [], {
              'innerElement': _0x83dfxb7
          });
          return _0x83dfxb7
      } catch (err) {
          this.messageBox("Lỗi lưu ảnh từ video", "Trình duyệt của bạn hiện không hỗ trợ tính năng này. PhimMoi.Net khuyến khích bạn sử dụng trình duyệt Chrome hoặc Firefox phiên bản mới nhất.<br><br>Trân trọng!")
      }
  };
  this.changeUrl = function (_0x83dfx13, _0x83dfxba, _0x83dfxbb) {
      if (typeof _0x83dfx13 != "string") {
          return false
      };
      if (typeof _0x83dfxba != "string") {
          _0x83dfxba = ""
      };
      if (typeof _0x83dfxbb == "undefined") {
          _0x83dfxbb = null
      };
      if (typeof window.history.replaceState != "function") {
          return false
      };
      window.history.replaceState(_0x83dfxbb, _0x83dfxba, _0x83dfx13);
      return true
  };
  this.scrollFit = function () {
      fx.scrollTo("#media-player-box")
  };
  this.scrollFitOnload = function () {
      if (typeof this._flagScrollFitOnload != "undefined" && this._flagScrollFitOnload) {
          return true
      };
      if (typeof window.orientation != "undefined" || (typeof device != "undefined" && (device.mobile() || device.tablet()))) {
          this.scrollFit()
      } else {
          if (jQuery(".movie-notice-box").length > 0) {
              fx.scrollTo(".movie-notice-box")
          } else {
              if (jQuery("#uniad-zone-8").length > 0) {
                  fx.scrollTo("#uniad-zone-8")
              } else {
                  fx.scrollTo("#block-player")
              }
          }
      };
      this._flagScrollFitOnload = 1
  };
  var _0x83dfxbc = [];
  var _0x83dfxbd = false;
  this.messageBox = function (_0x83dfxba, _0x83dfx35, _0x83dfxbe, _0x83dfxbf) {
      if (typeof _0x83dfxbf != "object" || _0x83dfxbf == null) {
          var _0x83dfxbf = {}
      };
      if (typeof _0x83dfxba != "string" || jQuery.trim(_0x83dfxba) == "") {
          return false
      };
      if ((typeof _0x83dfx35 != "string" || jQuery.trim(_0x83dfx35) == "") && (typeof _0x83dfxbf.innerElement != "object")) {
          return false
      };
      if (typeof _0x83dfx35 != "string") {
          _0x83dfx35 = ""
      };
      if (typeof _0x83dfxbf.innerElement != "object") {
          _0x83dfxbf.innerElement = null
      };
      if (typeof _0x83dfxbe != "object") {
          var _0x83dfxbe = null
      };
      if (_0x83dfxbd) {
          _0x83dfxbc.push({
              'title': _0x83dfxba,
              'message': _0x83dfx35,
              'buttons': _0x83dfxbe,
              'options': _0x83dfxbf
          });
          return false
      };
      this.initMessageBox();
      jQuery("#watching-messbox-wrapper .watching-messbox-button").remove();
      var _0x83dfxc0 = "";
      try {
          for (var _0x83dfxc in _0x83dfxbe) {
              var _0x83dfxc1 = _0x83dfxbe[_0x83dfxc];
              if (typeof _0x83dfxc1.callback != "function") {
                  continue
              };
              if (typeof _0x83dfxc1.text != "string") {
                  continue
              };
              if (typeof _0x83dfxc1.title != "string") {
                  _0x83dfxc1.title = _0x83dfxc1.text
              };
              _0x83dfxc1.ok = true;
              var _0x83dfxc2 = "watching-messbox-" + _0x83dfxc;
              _0x83dfxc0 = '<button id="' + _0x83dfxc2 + '" class="watching-messbox-button watching-messbox-cbutton" title="' + _0x83dfxc1.title + '">' + _0x83dfxc1.text + "</button>" + _0x83dfxc0
          };
          jQuery("#watching-messbox-wrapper > .watching-messbox-footer").append(_0x83dfxc0);
          var _0x83dfx36 = this;
          for (var _0x83dfxc in _0x83dfxbe) {
              if (typeof _0x83dfxbe[_0x83dfxc].ok == "undefined") {
                  continue
              };
              var _0x83dfxc2 = "watching-messbox-" + _0x83dfxc;
              var _0x83dfxc3 = jQuery("#" + _0x83dfxc2)[0];
              _0x83dfxc3.messCallback = _0x83dfxbe[_0x83dfxc].callback
          };
          jQuery("#watching-messbox-wrapper .watching-messbox-cbutton").click(function () {
              _0x83dfx36.closeMessageBox();
              try {
                  this.messCallback()
              } catch (err) {
                  console.error("MessageBox Button Callback Error: " + err.message)
              }
          })
      } catch (err) {};
      jQuery("#watching-messbox-wrapper > .watching-messbox-header").html(_0x83dfxba);
      jQuery("#watching-messbox-wrapper > .watching-messbox-body").html(_0x83dfx35);
      if (_0x83dfxbf.innerElement != null) {
          jQuery("#watching-messbox-wrapper > .watching-messbox-body").append(_0x83dfxbf.innerElement)
      };
      var _0x83dfxc4 = jQuery("#watching-messbox-wrapper").outerWidth();
      var _0x83dfxc5 = jQuery("#watching-messbox-wrapper").outerHeight();
      jQuery("#watching-messbox-wrapper").css({
          'left': "50%",
          'top': "50%",
          'margin-top': "-" + Math.ceil(_0x83dfxc5 / 2) + "px",
          'margin-left': "-" + Math.ceil(_0x83dfxc4 / 2) + "px"
      });
      _0x83dfxbd = true;
      jQuery("#watching-messbox-overlay,#watching-messbox-wrapper").fadeIn("fast")
  };
  this.initMessageBox = function () {
      if (jQuery("#watching-messbox-wrapper").length > 0) {
          return false
      };
      var _0x83dfxc6 = '<div class="watching-messbox-overlay" id="watching-messbox-overlay" style="display:none"></div>			<div class="watching-messbox-wrapper" id="watching-messbox-wrapper" style="display:none">			<div class="watching-messbox-header">				Thông báo			</div>			<div class="watching-messbox-body">							</div>			<div class="watching-messbox-footer">			<!--				<label for="watching-messbox-read-check">					<input type="checkbox" id="watching-messbox-read-check"/>					Không hiện lại vào lần sau				</label>			-->				<button id="watching-messbox-close" class="watching-messbox-close" title="Đóng thông báo này lại">Đóng</button>			</div>			</div>';
      jQuery("body").append(_0x83dfxc6);
      var _0x83dfx36 = this;
      jQuery("#watching-messbox-close").click(function () {
          _0x83dfx36.closeMessageBox()
      })
  };
  this.closeMessageBox = function () {
      var _0x83dfx36 = this;
      jQuery("#watching-messbox-overlay,#watching-messbox-wrapper").fadeOut("fast", function () {
          _0x83dfxbd = false;
          if (_0x83dfxbc.length > 0) {
              var _0x83dfxc7 = _0x83dfxbc.shift();
              _0x83dfx36.messageBox(_0x83dfxc7.title, _0x83dfxc7.message, _0x83dfxc7.buttons, _0x83dfxc7.options)
          }
      })
  };
  this.confirmAdult = function () {
      if (typeof filmInfo.isAdult && filmInfo.isAdult && document.cookie.indexOf("adultConfirm") == -1) {
          if (document.cookie.indexOf("adultConfirm") == -1) {
              this.setPauseOnReady(1);
              this.messageBox("Cảnh báo", "Phim này có cảnh quay nhạy cảm không phù hợp với khán giả dưới 18 tuổi.<br />Bạn cần cân nhắc trước khi xem.", [{
                  "text": "Quay lại",
                  "title": "Quay lại trang chủ",
                  "callback": function () {
                      fx.showLoad();
                      window.location.replace("/")
                  }
              }, {
                  "text": "Tôi đã đủ 18 tuổi",
                  "title": "Tôi đủ tuổi xem phim này",
                  "callback": function () {
                      document.cookie = "adultConfirm=1"
                  }
              }], null, true)
          }
      }
  };
  var _0x83dfxc8 = {
      'episodeId': 0,
      'errorCount': 0
  };
  this.increaseErrorCount = function () {
      if (_0x83dfxc8.episodeId == _currentEpisode.episodeId) {
          _0x83dfxc8.errorCount++
      } else {
          _0x83dfxc8.episodeId = _currentEpisode.episodeId;
          _0x83dfxc8.errorCount = 1
      }
  };
  this.getErrorCountInfo = function () {
      return _0x83dfxc8
  };
  this.getBackupLink = function () {
      var _0x83dfxc9 = jQuery('a.btn-episode\[data-episodeid!="' + _currentEpisode.episodeId + '"\]\[data-number="' + _currentEpisode.number + '"\]\[data-part="' + _currentEpisode.part + '"\]');
      if (_0x83dfxc9.length == 0) {
          if (_currentEpisode.part != 0) {
              _0x83dfxc9 = jQuery('a.btn-episode\[data-episodeid!="' + _currentEpisode.episodeId + '"\]\[data-number="' + _currentEpisode.number + '"\]\[data-part="0"\]')
          } else {
              _0x83dfxc9 = jQuery('a.btn-episode\[data-episodeid!="' + _currentEpisode.episodeId + '"\]\[data-number="' + _currentEpisode.number + '"\]\[data-part="1"\]')
          }
      };
      if (_0x83dfxc9.length > 0) {
          return _0x83dfxc9
      };
      return false
  };
  var _0x83dfxca = 0;
  this.setCanRetry = function (_0x83dfxcb) {
      try {
          if (_0x83dfxcb || typeof _0x83dfxcb == "undefined") {
              _0x83dfxca = 0;
              console.log("FxPlayer: You can auto retry in future!")
          } else {
              _0x83dfxca = _currentEpisode.episodeId;
              console.log("FxPlayer: You can't auto retry in future!")
          }
      } catch (err) {}
  };
  this.isCanRetry = function () {
      return _0x83dfxca != _currentEpisode.episodeId
  };
  this.retryUpdateLink = function (_0x83dfxcc) {
      try {
          if (typeof _0x83dfxcc == "undefined") {
              var _0x83dfxcc = false
          };
          if (!_0x83dfxcc && _0x83dfxca == _currentEpisode.episodeId) {
              return false
          };
          if (!_0x83dfxcc && this.getDeviceType() != "desktop") {
              return false
          };
          var _0x83dfxcd = this.getPlayer().getPosition();
          if (_0x83dfxcd > 0) {
              this.getPlayer().setStartPosition(_0x83dfxcd)
          };
          var _0x83dfxce = new Date();
          var _0x83dfxcf = _0x83dfxce.getTime();
          _0x83dfxce.setTime(_0x83dfxcf + 15000);
          document.cookie = "nocache=1; expires=" + _0x83dfxce.toUTCString() + "; path=/;";
          document.cookie = "retry=1; expires=" + _0x83dfxce.toUTCString() + "; path=/; domain=.phimmoi.net";
          try {
              document.cookie = "retry_position=" + _0x83dfxcd + "; expires=" + _0x83dfxce.toUTCString() + "; path=/; domain=.phimmoi.net";
              var playlist = this.getPlayer().getPlaylist();
              var _0x83dfxd0 = "";
              if (playlist.length > 0 && typeof playlist[0] == "object" && typeof playlist[0].sources[0].file == "string") {
                  var _0x83dfxd1 = this.parseUrl(playlist[0].sources[0].file);
                  if (typeof _0x83dfxd1 == "object" && typeof _0x83dfxd1.hostname == "string") {
                      _0x83dfxd0 = _0x83dfxd1.hostname
                  } else {
                      _0x83dfxd0 = playlist[0].sources[0].file
                  };
                  document.cookie = "retry_last_url=" + _0x83dfxd0 + "; expires=" + _0x83dfxce.toUTCString() + "; path=/; domain=.phimmoi.net";
                  if (typeof CLIENT_IP_COUNTRY == "string") {
                      document.cookie = "retry_country=" + CLIENT_IP_COUNTRY + "; expires=" + _0x83dfxce.toUTCString() + "; path=/; domain=.phimmoi.net"
                  }
              }
          } catch (err) {};
          _0x83dfxca = _currentEpisode.episodeId;
          if (jQuery("a.btn-episode.active").length > 0) {
              var _0x83dfxd2 = jQuery("a.btn-episode.active")[0]
          } else {
              var _0x83dfxd2 = document.createElement("a");
              jQuery(_0x83dfxd2).attr("data-episodeid", _currentEpisode.episodeId);
              jQuery(_0x83dfxd2).attr("data-number", _currentEpisode.number);
              jQuery(_0x83dfxd2).attr("data-part", _currentEpisode.part);
              jQuery(_0x83dfxd2).attr("data-language", _currentEpisode.language)
          };
          this.changeEpisode(_0x83dfxd2, false);
          return true
      } catch (err) {
          console.error("Error on retryUpdateLink: " + err.message);
          return false
      }
  };
  var _0x83dfxd3 = "";
  this.setOnPlayMessage = function (_0x83dfx37) {
      if (typeof _0x83dfx37 == "string") {
          _0x83dfxd3 = _0x83dfx37
      }
  };
  this.getOnPlayMessage = function () {
      var _0x83dfxd4 = _0x83dfxd3;
      _0x83dfxd3 = "";
      return _0x83dfxd4
  };
  var _0x83dfxd5 = false;
  this.setOnlyUseBackupLink = function (_0x83dfxcb) {
      if (typeof _0x83dfxcb != "undefined" && _0x83dfxcb) {
          _0x83dfxd5 = true
      } else {
          _0x83dfxd5 = false
      }
  };
  this.getOnlyUseBackupLink = function () {
      return _0x83dfxd5
  };
  this.isOnlyUseBackupLink = function () {
      return this.getOnlyUseBackupLink();;
  };
  this.selectThirdPartyLink = function () {
      if (jQuery(".btn-link-backup").length == 0) {
          return false
      };
      var _0x83dfxd6 = 0;
      var _0x83dfxd7 = 0;
      jQuery(".btn-link-backup").each(function (_0x83dfx70) {
          if (jQuery(this).hasClass("active")) {
              _0x83dfxd6 = 1
          } else {
              if (_0x83dfxd6 && !_0x83dfxd7) {
                  jQuery(this).click();
                  _0x83dfxd7 = 1
              }
          }
      });
      if (!_0x83dfxd6) {
          jQuery(jQuery(".btn-link-backup")[0]).click()
      };
      return true
  };
  this.playerErrorCallback = function (_0x83dfx8f) {
      try {
          if (_0x83dfx8f.reason.key == "cantLoadPlayer") {
              return false
          }
      } catch (err) {};
      try {
          if (this.getPlayer().getPlaylist()[0].sources[0].file.indexOf("blob:") != -1 && this.selectThirdPartyLink()) {
              return false
          }
      } catch (err) {};
      try {
          if (typeof window.lastEpisodeData == "object" && typeof window.lastEpisodeData.medias == "object" && window.lastEpisodeData.medias.length > 0) {
              if (window.lastEpisodeData.medias[0].url.indexOf("streaming.phimmoi.net") == -1 && (window.lastEpisodeData.medias[1].url.indexOf("streaming.phimmoi.net") != -1 || window.lastEpisodeData.medias[2].url.indexOf("streaming.phimmoi.net") != -1)) {
                  var _0x83dfxd8 = window.lastEpisodeData.medias;
                  window.lastEpisodeData.medias = [];
                  for (var _0x83dfxc in _0x83dfxd8) {
                      if (_0x83dfxd8[_0x83dfxc].url.indexOf("streaming.phimmoi.net") == -1) {
                          window.lastEpisodeData.medias.push(_0x83dfxd8[_0x83dfxc])
                      }
                  };
                  var _0x83dfxd9 = this;
                  setTimeout(function () {
                      _0x83dfxd9.handleData(window.lastEpisodeData);
                      _0x83dfxd9.getPlayer().play()
                  }, 500);
                  fx.displayMessage("Chất lượng HD bị tạm khóa vì 1 số máy chủ bị quá tải...");
                  return false
              }
          }
      } catch (err) {};
      var _0x83dfxcd = 0;
      try {
          _0x83dfxcd = this.getPlayer().getPosition()
      } catch (err) {};
      try {
          var _0x83dfxda = this.getErrorCountInfo();
          if (typeof window.lastEpisodeData == "object" && typeof window.lastEpisodeData.mediasBk == "object" && window.lastEpisodeData.mediasBk.length > 0) {
              window.lastEpisodeData.medias = window.lastEpisodeData.mediasBk;
              window.lastEpisodeData.mediasBk = [];
              if (_0x83dfxcd > 0) {
                  this.getPlayer().setStartPosition(_0x83dfxcd)
              };
              var _0x83dfxd9 = this;
              setTimeout(function () {
                  _0x83dfxd9.handleData(window.lastEpisodeData)
              }, 500);
              setTimeout(function () {
                  _0x83dfxd9.getPlayer().play()
              }, 800);
              fx.displayMessage("Đang thử link dự phòng...");
              return false
          }
      } catch (err) {};
      try {
          var _0x83dfxcd = this.getPlayer().getPosition();
          var _0x83dfxda = this.getErrorCountInfo();
          if (typeof window.lastEpisodeData == "object") {
              for (var _0x83dfxc = 0; _0x83dfxc <= 10; _0x83dfxc++) {
                  var _0x83dfxdb = "mediasBk" + _0x83dfxc;
                  if (typeof window.lastEpisodeData[_0x83dfxdb] == "object" && window.lastEpisodeData[_0x83dfxdb].length > 0) {
                      window.lastEpisodeData.medias = window.lastEpisodeData[_0x83dfxdb];
                      window.lastEpisodeData[_0x83dfxdb] = [];
                      var _0x83dfxd9 = this;
                      setTimeout(function () {
                          _0x83dfxd9.handleData(window.lastEpisodeData)
                      }, 500);
                      setTimeout(function () {
                          _0x83dfxd9.getPlayer().play()
                      }, 800);
                      if (_0x83dfxcd > 0) {
                          this.getPlayer().setStartPosition(_0x83dfxcd)
                      };
                      fx.displayMessage("Đang thử link dự phòng...#" + _0x83dfxc);
                      return false
                  }
              }
          }
      } catch (err) {};
      try {
          var _0x83dfxcd = this.getPlayer().getPosition();
          var _0x83dfxda = this.getErrorCountInfo();
          if (typeof window.lastEpisodeData == "object" && typeof window.lastEpisodeData.embedUrls == "object" && window.lastEpisodeData.embedUrls.length > 0) {
              var _0x83dfx6d = window.lastEpisodeData.embedUrls.shift();
              if (_0x83dfx6d.indexOf("://") == -1 && _decryptKey != "") {
                  _0x83dfx6d = GibberishAES.dec(_0x83dfx6d, _decryptKey)
              };
              if (_0x83dfx6d.indexOf("#") == -1) {
                  _0x83dfx6d += "#"
              };
              if (typeof window.TMP_EMBED_ERR_INFO == "object") {
                  if (typeof window.TMP_EMBED_ERR_INFO.position != "undefined") {
                      _0x83dfxcd = window.TMP_EMBED_ERR_INFO.position
                  }
              };
              _0x83dfx6d += "&position=" + _0x83dfxcd;
              if (typeof window.lastEpisodeData.episodeId != "undefined") {
                  _0x83dfx6d += "&episodeid=" + window.lastEpisodeData.episodeId
              };
              jQuery("#media-player #player-embed").remove();
              jQuery("#media-player").append('<div id="player-embed" style="width: 100%;height: auto;border:0;padding:0;margin:0;position: absolute;top:0;left:0;bottom:0;right:0;z-index:10;"><iframe class="player-embed-iframe" src="' + _0x83dfx6d + '"  width="100%" height="100%" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no"  allow="autoplay"></iframe></div>');
              fx.displayMessage("Đang thử link nhúng dự phòng...");
              return false
          }
      } catch (err) {};
      this.increaseErrorCount();
      try {
          var _0x83dfxdc = this.getPlayer().getPosition();
          var _0x83dfx20 = (_0x83dfxdc > 0) ? "Error On Playing Domain" : "Error On Start Domain";
          var playlist = this.getPlayer().getPlaylist();
          var _0x83dfxdd = "";
          var _0x83dfx21 = "Unknow Domain";
          var _0x83dfxde = false;
          if (playlist.length > 0) {
              var _0x83dfxde = playlist[0];
              if (typeof _0x83dfxde.trackTitle == "string") {
                  _0x83dfxdd = _0x83dfxde.trackTitle
              } else {
                  if (typeof _0x83dfxde.title == "string") {
                      _0x83dfxdd = _0x83dfxde.title
                  }
              };
              var _0x83dfxd1 = this.parseUrl(_0x83dfxde.sources[0].file);
              if (typeof _0x83dfxd1 == "object" && typeof _0x83dfxd1.hostname == "string") {
                  _0x83dfx21 = _0x83dfxd1.hostname
              }
          } else {
              _0x83dfx21 = "No Playlist"
          }
      } catch (err) {};
      if (_0x83dfxda.errorCount == 1 && _0x83dfxcd == 0) {
          try {
              console.log("FxPlayer: Try Alt Link");
              if (_0x83dfxcd > 0 && this.isCanRetry()) {
                  this.setOnPlayMessage("On Playing: Retry Second Link Success");
                  this.retryUpdateLink();
                  return false
              } else {
                  if (_0x83dfxcd == 0 && _0x83dfxde.sources[0].file.indexOf("googlevideo.com") != -1 && this.isCanRetry()) {
                      this.setOnPlayMessage("On Start: Retry Second Link Success");
                      this.retryUpdateLink();
                      return true
                  }
              }
          } catch (err) {
              console.error("FxPlayer: Retry Err => " + err.message)
          }
      };
      if (_0x83dfxda.errorCount == 2 && _0x83dfxcd == 0 && this.getBackupFile()) {
          try {
              console.log("FxPlayer: Try Org Link");
              var _0x83dfx95 = this.getPlaylist({
                  'medias': [{
                      'url': this.getBackupFile(),
                      'resolution': "720p",
                      'type': "mp4"
                  }]
              });
              this.getPlayer().load(_0x83dfx95);
              this.setOnPlayMessage("Retry Original File Success");
              return true
          } catch (err) {
              console.error("FxPlayer: Retry Original Err => " + err.message)
          }
      };
      this.trackEvent("Error", _0x83dfx20, _0x83dfx21);
      this.trackEvent("Error", "Error Film", filmInfo.title);
      if (_0x83dfxdd != "" && _0x83dfx20 == "Error On Start Domain") {
          this.trackEvent("Error", "Error Episode", _0x83dfxdd)
      };
      console.log("After Retry");
      var _0x83dfx36 = this;
      var _0x83dfxbe = [];
      var _0x83dfxdf = this.getBackupLink();
      if (_0x83dfxdf) {
          var _0x83dfxe0 = _0x83dfxdf[0];
          _0x83dfxbe.push({
              "text": "Thử link dự phòng",
              "callback": function () {
                  _0x83dfx36.changeEpisode(_0x83dfxe0, false)
              }
          })
      };
      if (jQuery("#media-player #player-embed").length > 0) {
          return false
      };
      this.messageBox("Phát sinh lỗi", "Xảy ra lỗi khi tải video, bạn có muốn thử tải lại lần nữa không \?<br />Hãy thử tải lại trang hoặc chọn server khác nếu thử tải lại video nhiều lần không được.", _0x83dfxbe);
      this.autoReport();
      return true
  };
  this.testBlogspotCallback = function (_0x83dfx53, _0x83dfxe1) {
      try {
          jQuery(_0x83dfx53).remove();
          if (typeof _0x83dfxe1 == "string" && _0x83dfxe1 == "error") {
              document.cookie = "blogspot_ok=; path=/;";
              document.cookie = "blogspot_ip=" + CLIENT_IP + "; path=/;";
              var _0x83dfx21 = CLIENT_IP;
              if (typeof CLIENT_ISP == "string" && CLIENT_ISP != "") {
                  _0x83dfx21 = CLIENT_ISP
              };
              this.trackEvent("Error", "Test Blogspot", _0x83dfx21)
          } else {
              document.cookie = "blogspot_ok=1; path=/;";
              document.cookie = "blogspot_ip=" + CLIENT_IP + "; path=/;"
          }
      } catch (err) {}
  };
  this.testBlogspot = function () {
      if (typeof CLIENT_IP == "string" && CLIENT_IP != "") {
          jQuery("body").append('<img style="width:0px;height:0px;" onload="watching.testBlogspotCallback\(this\);" onerror="watching.testBlogspotCallback\(this,\'error\'\);" src="https://3.bp.blogspot.com/-jW4MNmtTmkU/Vjqxr7VZTcI/AAAAAAAAJyA/P773ur93ehw/s0-Ic42/test.gif">')
      }
  };
  var _0x83dfxe2 = null;
  this.updateToken = function () {
      var _0x83dfx36 = this;
      var _0x83dfx79 = {
          'ip': CLIENT_IP,
          'token': TOKEN_EPISODE
      };
      var _0x83dfx7b = jQuery.ajax({
          'url': "episodetoken.php",
          'type': "GET",
          'dataType': "json",
          'silentLoad': true,
          'context': {
              'silentError': true
          },
          'data': _0x83dfx79
      }).done(function (_0x83dfx26) {
          if (typeof _0x83dfx26 == "object" && typeof _0x83dfx26.newToken == "string" && _0x83dfx26.newToken != "") {
              window.TOKEN_EPISODE = _0x83dfx26.newToken
          } else {
              _0x83dfx36.setNeedReload(true)
          }
      }).fail(function (_0x83dfx7b, _0x83dfx7c, _0x83dfx7d) {
          console.error("Episode Token Update Error")
      });
      _0x83dfxe2 = setTimeout(function () {
          _0x83dfx36.updateToken()
      }, 300000)
  };
  this.init = function () {
      var _0x83dfx36 = this;
      if (this.getDeviceType() != "desktop") {
          jQuery("#btn-light").remove()
      } else {
          jQuery("#light-status").text("Tắt đèn");
          jQuery("#btn-light").click(function () {
              _0x83dfx36.lightToggle()
          })
      };
      if (this.getDeviceType() == "desktop" && window.screen.width >= 1024) {
          this.setEnableExpand(true)
      };
      if (this.getDeviceType() != "desktop") {
          jQuery("#btn-remove-ad").remove()
      } else {
          jQuery("#btn-remove-ad").click(function () {
              _0x83dfx36.removeAd(this)
          })
      };
      jQuery("#btn-add-favorite").click(function () {
          return _0x83dfx36.addToFav(this)
      });
      jQuery("#btn-autonext").click(function () {
          _0x83dfx36.autoNextToggle()
      });
      jQuery("#btn-resize-player").click(function () {
          _0x83dfx36.resizeToggle()
      });
      try {
          var _0x83dfxe3 = /(iPhone|iPad|iPod)/i;
          if (!_0x83dfxe3.test(window.navigator.userAgent)) {
              jQuery("#btn-capture-frame").click(function () {
                  _0x83dfx36.captureVideoFrame()
              })
          } else {
              jQuery("#btn-capture-frame").remove()
          }
      } catch (err) {};
      setTimeout(function () {
          _0x83dfx36.scrollFitOnload()
      }, 3000);
      jQuery(window).load(function () {
          _0x83dfx36.scrollFitOnload()
      });
      if (typeof window.orientation != "undefined") {
          jQuery(window).on("orientationchange", function (_0x83dfxe4) {
              console.log("Orientation đổi thành: " + _0x83dfxe4.orientation);
              _0x83dfx36.scrollFit()
          })
      }
  };
//   this.init()
}

module.exports = Watching
