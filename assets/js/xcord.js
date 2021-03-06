var discordWidget =
  discordWidget ||
  (function() {
    var e = {},
      s = "1.0";
    return {
      init: function(s) {
        (s.serverId = "undefined" != typeof s.serverId ? s.serverId : !1),
          (s.title = "undefined" != typeof s.title ? s.title : !1),
          (s.join = "undefined" != typeof s.join ? s.join : !0),
          (s.alphabetical =
            "undefined" != typeof s.alphabetical ? s.alphabetical : !1),
          (s.theme = "undefined" != typeof s.theme ? s.theme : "light"),
          (s.hideChannels =
            "undefined" != typeof s.hideChannels ? s.hideChannels : !1),
          (s.showAllUsers =
            "undefined" != typeof s.showAllUsers ? s.showAllUsers : !1),
          (s.allUsersDefaultState =
            "undefined" != typeof s.allUsersDefaultState
              ? s.allUsersDefaultState
              : !0),
          (s.showNick = "undefined" != typeof s.showNick ? s.showNick : !0),
          (e.serverId = s.serverId),
          (e.title = s.title),
          (e.join = s.join),
          (e.alphabetical = s.alphabetical),
          (e.theme = s.theme),
          (e.hideChannels = s.hideChannels),
          (e.showAllUsers = s.showAllUsers),
          (e.allUsersDefaultState = s.allUsersDefaultState),
          (e.showNick = s.showNick);
      },
      render: function() {
        function n() {
          function n(e, s) {
            return e.position < s.position
              ? -1
              : e.position > s.position
              ? 1
              : 0;
          }
          function i(e) {
            return (
              '<li class="discord-channel">' +
              e +
              '</li><ul class="discord-userlist">'
            );
          }
          function r(s, n) {
            var i = "";
            i = 1 == e.showNick && s.nick ? s.nick : s.username;
            var r = "";
            return (
              s.game && (r = " - " + s.game.name),
              s.channel_id == n
                ? "online" != s.status
                  ? '<li class="discord-user"><img src="' +
                    s.avatar_url +
                    '" class="discord-avatar"/><div class="discord-user-status discord-dnd"></div>' +
                    i +
                    "<span>" +
                    r +
                    "</span></li>"
                  : 
                    '<li class="discord-user"><img src="' +
                    s.avatar_url +
                    '" class="discord-avatar"/><div class="discord-user-status discord-online"></div>' +
                    i +
                    "<span>" +
                    r +
                    "</span></li>"
                : ''
                 
            );
          }
          function a(e, a) {
            var l = $(".discord-widget")[0];
            $(l).attr("version", s);
            var t,
              d,
              o,
              c,
              h,
              u,
              f =
                '<ul class="discord-tree"></ul><p class="discord-users-online"></p><p class="discord-join"></p><div class="discord-fade"></div>',
              p = "";
            switch (
              (a.title !== !1
                ? ((l.innerHTML =
                    '<div class="discord-title"><h3>' +
                    a.title +
                    "</h3></div>" +
                    f),
                  (t = $(".discord-tree")[0]))
                : ((l.innerHTML = f),
                  (t = $(".discord-tree")[0]),
                  (t.style.marginTop = "0")),
              e)
            ) {
              case "404":
                t.innerHTML =
                  '<span class="discord-error">Ge??ersiz Sunucu ID</span>';
                break;
              case "522":
                t.innerHTML =
                  '<span class="discord-error">Discord Uyu??mazl??k Sorunu</span>';
            }
            if (!e) return void (t.innerHTML = e);
            if (
              ((d = $(".discord-users-online")[0]),
              (o = $(".discord-join")[0]),
              a.alphabetical)
            ) {
              (c = []), (u = []);
              for (var m = 0; m < e.channels.length; m++) {
                h = !1;
                for (var v = 0; v < a.hideChannels.length; v++)
                  e.channels[m].name.indexOf(a.hideChannels[v]) >= 0 &&
                    (h = !0);
                h ? u.push(e.channels[m].id) : c.push(e.channels[m]);
              }
              for (var m = 0; m < c.length; m++) {
                p += i(c[m].name);
                for (var v = 0; v < e.members.length; v++)
                  p += r(e.members[v], c[m].id);
                p += "</ul>";
              }
            } else {
              (c = []), (u = []);
              for (var m = 0; m < e.channels.length; m++) {
                h = !1;
                for (var v = 0; v < a.hideChannels.length; v++)
                  e.channels[m].name.indexOf(a.hideChannels[v]) >= 0 &&
                    (h = !0);
                h ? u.push(e.channels[m].id) : c.push(e.channels[m]);
              }
              c.sort(n);
              for (var m = 0; m < c.length; m++) {
                p += i(c[m].name);
                for (var v = 0; v < e.members.length; v++)
                  p += r(e.members[v], c[m].id);
                p += "</ul>";
              }
            }
            if (a.showAllUsers) {
              p +=
                '<li class="discord-channel discord-allusers-toggle">&#9662; ??evrimi??i Kullan??c??lar</li><ul class="discord-userlist discord-allusers">';
              for (var m = 0; m < e.members.length; m++)
                (!e.members[m].channel_id ||
                  $.inArray(e.members[m].channel_id, u) >= 0) &&
                  (p += r(e.members[m], e.members[m].channel_id));
              p += "</ul>";
            }
            var g = "";
            "null" != e.instant_invite &&
              (g =
                '<a href="' +
                e.instant_invite +
                '" target="_blank">Sunucuya Kat??l</a>'),
              (t.innerHTML = p),
              (d.innerHTML = "??evrimi??i Kullan??c??: " + e.members.length),
              a.join ? (o.innerHTML = g) : (o.style.display = "none");
          }
          var l = "";
          switch (e.theme) {
            case "dark":
              l = "dark.min.css";
              break;
            case "light":
              l = "light.min.css";
              break;
            case "none":
              l = "https://xirdevteam.xyz/assets/css/xnone.css";
              break;
            default:
              l = "light.min.css";
          }
          $("head").append(
            '<link rel="stylesheet" href="//cdn.jsdelivr.net/discord-widget/latest/' +
              l +
              '" type="text/css" />'
          );
          var t =
              "https://discordapp.com/api/servers/" +
              e.serverId +
              "/embed.json",
            d = new XMLHttpRequest();
          (d.onreadystatechange = function() {
            if (4 == d.readyState && 200 == d.status) {
              var s = JSON.parse(d.responseText);
              a(s, e),
                e.allUsersDefaultState ||
                  ($(".discord-allusers").toggle(),
                  $(".discord-allusers-toggle").html(
                    "&#9656; ??evrimi??i Kullan??c??lar"
                  )),
                $(".discord-allusers-toggle").click(function() {
                  $(".discord-allusers").toggle(100, function() {
                    $(".discord-allusers").is(":visible")
                      ? $(".discord-allusers-toggle").html(
                          "&#9662; ??evrimi??i Kullan??c??lar"
                        )
                      : $(".discord-allusers-toggle").html(
                          "&#9656; ??evrimi??i Kullan??c??lar"
                        );
                  });
                });
            } else
              4 == d.readyState && 404 == d.status
                ? a("404", e)
                : 4 == d.readyState && a(d.status, e);
          }),
            d.open("GET", t, !0),
            d.send();
        }
        if (window.jQuery) n();
        else {
          var i = document.createElement("script");
          (i.type = "text/javascript"),
            (i.src =
              "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"),
            document.head.appendChild(i),
            (i.onload = function() {
              n();
            });
        }
      }
    };
  })();
