const bot = require('../../Server/config.js');
var request = require("request");
var striptags = require('striptags');
var fs = require('fs');

module.exports = {
  news: function(msg){
    //Something
    console.log("News module request");
    request({
      uri: "http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0"
    }, function(error, response, body) {

      // File module

      if(error){
        console.log("File reading");
        body = fs.readFile('./Calls/News/oldNews.txt',function(err,data){
          if(err){
            return console.log("File read "+err);
          }
          else {
            console.log("File read end");
            return data;
          }
        })
      }
      console.log("File writing");
      fs.writeFile('./Calls/News/oldNews.txt',body, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      console.log("File write end");

      // File module end

      var new1 = body.split("<table>")
      var i = 1
      while (new1[i] != undefined) {
        var app = new1[i].split("<img src=/images/new.gif>&nbsp;")
        var title = app[1].split("<br>")
        app = new1[i].split("<tr><td><p>")
        var body = app[1].split("</p><span>")
        title = striptags(title[0])
        var uri = undefined
        if (body[0].split("https")[1] != undefined && i < 4) {
          var uri = body[0].split("https")[1]
          uri = uri.split('">')
          uri = uri[0]
          uri = uri.replace('\"', "")
          uri = "https" + uri
        } else if (body[0].split("http")[1] != undefined && i < 4) {
          var uri = body[0].split("http")[1]
          uri = uri.split('">')
          uri = uri[0]
          uri = uri.replace('\"', "")
          uri = "http" + uri
        }
        body = striptags(body[0]);
        body = body.replace(/&nbsp;/gi, " ")
        body = body.replace(/&ugrave;/gi, "ù")
        body = body.replace(/&bull;/gi, "•")
        if (uri != undefined) {
          let replyMarkup = bot.bot.inlineKeyboard([
            [bot.bot.inlineButton('url', {url: uri})]
          ]);
          uri = uri.split(" target")
          uri = uri[0]
          bot.bot.sendMessage(msg.from.id, title + "\n" + body, {replyMarkup}).then((response) => {
          }).catch((error) => {
          });
        } else {
          bot.bot.sendMessage(msg.from.id, title + "\n" + body).then((response) => {}).catch((error) => {});
        }
        i++
      }
    });
  }
}
