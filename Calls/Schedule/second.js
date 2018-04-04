const bot = require('../../Server/config.js');
var request = require("request");
var striptags = require('striptags');

module.exports = {
  list: function(msg) {
    //Something
    console.log("Hello world");
    request({
      uri: "http://informatica.uniroma2.it/pages/trien/orario/orario.htm"
    }, function(error, response, body) {
      var orario = [];
      body = body.split("00</td>");
      var app = [];
      var app2 = [];
      var app3 = [];
      var app4 = [];
      var app5 = [];
      var ore = ["9:00 : ", "10:00 : ", "11:00 : ", "12:00 : ", "13:00 : ", "14:00 : ", "15:00 : ", "16:00 : ", "17:00 : ", "18:00 : "]
      for (i = 11; i < 21; i++) {
        bodya = body[i].split("</tr><tr style=\"")
        bodya = bodya[0];
        bodya = bodya.split("<td");
        body1 = bodya[1];
        body1 = body1.split(">");
        if (body1[2] != '') {
          body1 = "\n" + ore[i - 11] + "" + body1[2].replace("</a", "");
        } else {
          body1 = "\n" + ore[i - 11] + "" + "Nulla"
        }
        app.push(body1);
        body2 = bodya[2];
        body2 = body2.split(">");
        if (body2[2] != '') {
          body2 = "\n" + ore[i - 11] + "" + body2[2].replace("</a", "");
        } else {
          body2 = "\n" + ore[i - 11] + "" + "Nulla"
        }
        app2.push(body2);
        body3 = bodya[3];
        body3 = body3.split(">");
        if (body3[2] != '') {
          body3 = "\n" + ore[i - 11] + "" + body3[2].replace("</a", "");
        } else {
          body3 = "\n" + ore[i - 11] + "" + "Nulla"
        }
        app3.push(body3);
        body4 = bodya[4];
        body4 = body4.split(">");
        if (body4[2] != '') {
          body4 = "\n" + ore[i - 11] + "" + body4[2].replace("</a", "");
        } else {
          body4 = "\n" + ore[i - 11] + "" + "Nulla"
        }
        app4.push(body4);
        body5 = bodya[5];
        body5 = body5.split(">");
        if (body5[2] == "</tr") {
          body5[2] = ''
        }
        if (body5[2] != '') {
          body5 = "\n" + ore[i - 11] + "" + body5[2].replace("</a", "");
        } else {
          body5 = "\n" + ore[i - 11] + "" + "Nulla"
        }
        app5.push(body5);
      }
      orario.push(app, app2, app3, app4, app5);
      let parseMode = 'html';
      bot.bot.sendMessage(msg.from.id, "<b>Lunedi</b>' :" + orario[0], {
        parseMode
      }).then(() => {
        return bot.bot.sendMessage(msg.from.id, "<b>Martedi'</b> :" + orario[1], {
          parseMode
        }).then(() => {
          return bot.bot.sendMessage(msg.from.id, "<b>Mercoledi'</b> :" + orario[2], {
            parseMode
          }).then(() => {
            return bot.bot.sendMessage(msg.from.id, "<b>Giovedi'</b> :" + orario[3], {
              parseMode
            }).then(() => {
              return bot.bot.sendMessage(msg.from.id, "<b>Venerdi'</b> :" + orario[4], {
                parseMode
              })
            })
          })
        })
      })
    })
  }
}