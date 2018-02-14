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

// bot.on('/inlineKeyboard', msg => {
//
//     let replyMarkup = bot.inlineKeyboard([
//         [
//             bot.inlineButton('callback', {callback: 'this_is_data'}),
//             bot.inlineButton('inline', {inline: 'some query'})
//         ], [
//             bot.inlineButton('url', {url: 'https://telegram.org'})
//         ]
//     ]);
//
//     return bot.sendMessage(msg.from.id, 'Inline keyboard example.', {replyMarkup});
//
// });

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
      var uri = undefined
      if (body[0].split("http")[1] != undefined && i<4) {
        var uri = body[0].split("http")[1]
        uri = uri.split('">')
        uri = uri[0]
        uri = uri.replace('\"', "")
        // uri = striptags(uri[0])
        console.log("URL " + uri);
      }
      body = striptags(body[0]);
      body = body.replace(/&nbsp;/gi, " ")
      body = body.replace(/&ugrave;/gi, "ù")
      body = body.replace(/&bull;/gi, "•")
      // console.log(i + "" + title + "\n" + body);

      if (uri!=undefined) {
      let replyMarkup = bot.inlineKeyboard([
          [bot.inlineButton('url', {url: uri[0]})]
        ]);

        bot.sendMessage(msg.from.id, title + "\n" + body, {replyMarkup}).then((response) => {
    console.log('Ok:', response);
}).catch((error) => {
    console.log('Error:', error);
});

      } else {

        bot.sendMessage(msg.from.id, title + "\n" + body).then((response) => {
    console.log('Ok:', response);
}).catch((error) => {
    console.log('Error:', error);
});
      }
      // msg.reply.text(title +"\n"+body);
      i++
    }
  });

});
