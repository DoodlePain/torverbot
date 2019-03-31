const bot = require('../../Server/config.js');
const fixedText = require('../../Server/textCheck.js');
var request = require("request");
var striptags = require('striptags');
var fileSaver = require('../FileSaver/FileSaver');
const fs = require('fs');

module.exports = {
  news: function (msg) {
    //Something
    console.log(Date() + "News module request");
    request({
      uri: "http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0"
    }, function (error, response, body) {

      body = fileSaver.checkAndWrite(response, body, './Server/LocalFiles/oldNews.txt');

      body = body.split("<body>")[1]
      body = body.split("</body>")[0]
      body = body.replace(/\u00a0/g, " ");
      var news = body.split("<table>")
      i = news.length - 1
      list(news, i, msg)
    });
  },
  update: function (msg, oldV) {
    //Something
    console.log(Date() + "News module request");
    request({
      uri: "http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0"
    }, function (error, response, body) {

      // File module

      if (error) {
        console.log("Huston, we've got some problems... \nThe site is offline!");
      } else {
        fs.writeFile('./Calls/News/oldNews.txt', body, function (err) {
          if (err) throw err;
        });
        // File module end


        oldV = oldV.split("<body>")[1]
        oldV = oldV.split("</body>")[0]
        oldV = oldV.replace(/\u00a0/g, " ");
        var oldVlen = oldV.length
        console.log("Old news length: " + oldVlen);

        body = body.split("<body>")[1]
        body = body.split("</body>")[0]
        body = body.replace(/\u00a0/g, " ");
        var news = body.split("<table>")
        var currentNewsLen = news.length
        console.log("Current length : " + currentNewsLen);
        if (oldVlen <= currentNewsLen) {
          i = news.length - 1
          var users = fs.readFileSync('./Server/notifications.txt', 'utf8');
          users = users.split(',')
          var j = 0
          while (users[j] != undefined) {
            up(news, i, users[j])
            j++
          }
        }
      }
    });
  }

}
up = (news, i, user) => {
  if (i - 1 == 0) {
    var title = news[i].split("<img src=/images/new.gif>&nbsp;")[1]

    var date = title.split("</span>")[0]
    var text = title.split("</td></tr>")[0]
    var response = ""
    let parseMode = 'html';
    title = title.split("<br>")[0]
    date = date.split("\">")[1]
    date = date.split(" inviato")[0]
    text = text.split("<tr><td>")[1]
    response = "<b>" + striptags(title) + "  \n" + striptags(date) + "</b>\n" + striptags(text)
    response = fixedText.fix(response)
    bot.bot.sendMessage(user, response, {
      parseMode
    })
      .then(() => {
        return up(news, i - 1, user)
      })
  } else if (i != 0) {
    return up(news, i - 1, user)
  }
}

list = (news, i, msg) => {
  if (i != 0) {
    var title = news[i].split("<img src=/images/new.gif> ")[1]
    var date = title.split("</span>")[0]
    var text = title.split("</td></tr>")[0]
    var response = ""
    let parseMode = 'html';
    title = title.split("<br>")[0]
    date = date.split("\">")[1]
    date = date.split(" inviato")[0]
    text = text.split("<tr><td>")[1]
    response = "<b>" + striptags(title) + "  \n" + striptags(date) + "</b>\n" + striptags(text)
    response = fixedText.fix(response)
    bot.bot.sendMessage(msg.from.id, response, {
      parseMode
    })
      .then(() => {
        return list(news, i - 1, msg)
      }).catch((error) => {
        console.log(Date() + 'Error:', error);
      });
  }
}