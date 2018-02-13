const http = require('http')
const port = 3000
var request = require("request");
var striptags = require('striptags');

const TeleBot = require('telebot');
const bot = new TeleBot('371457888:AAFPcUPqD8ki1vPOEem8P75L1pZdpBbuaCc');

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

bot.start();

bot.on([
  '/info', '/news', 'a'
], (msg) => {
  request({
    uri: "http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0"
  }, function(error, response, body) {

    var new1 = body.split("<table>")
    var i = 1
    while (new1[i] != undefined) {
      var app = new1[i].split("<img src=/images/new.gif>&nbsp;")
      var title = app[1].split("<br>")
      app = new1[i].split("<tr><td><p>")
      var body = app[1].split("</p><span>")
      title = striptags(title[0])
      body = striptags(body[0]);
      body = body.replace(/&nbsp;/gi, " ")
      body = body.replace(/&ugrave;/gi, "ù")
      body = body.replace(/&bull;/gi, "•")
      console.log(i +"" +title +"\n"+body);
      msg.reply.text(title +"\n"+body);
      bot.inlineButton("CIAO")
      i++
    }
  });

});
