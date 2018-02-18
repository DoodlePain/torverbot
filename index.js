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
bot.connect();

// Start command
bot.on('/start', msg => {
  let replyMarkup = bot.keyboard([
    [
      bot.button('contact', 'Your contact'),
      bot.button('location', 'Your location')
    ],
    [
      '/news', '/docenti'
    ],
    ['/orari']
  ], {resize: true});
  return bot.sendMessage(msg.from.id, 'Benvenuto nel bot di Tor Vergata, il modo piu\' semplice per ricevere informazioni relative al corso di Informatica', {replyMarkup});
});

// Lista degli orari
bot.on('/orari', msg => {
  let replyMarkup = bot.keyboard([
    ['/primo'], ['/secondo'], ['/terzo']
  ], {resize: true});
  return bot.sendMessage(msg.from.id, 'Seleziona l\'anno del corso', {replyMarkup});
});

// Orario del primo
bot.on('/primo', msg => {
  request({
    uri: "http://informatica.uniroma2.it/pages/trien/orario/orario.htm"
  }, function(error, response, body) {
    body = body.replace(/&nbsp;/gi, " ")
    body = body.replace('null', ' ')
    body = body.split("\"><td align=right>")
    b = body

    i = 1;
    while(b[i]!=undefined){
      body = b[i].split("</td>")
      
      body = body[0]
      console.log(striptags(body));
      i++
    }

  })
});

// Lista dei docenti
bot.on('/docenti', msg => {
  request({
    uri: "http://informatica.uniroma2.it/f0?fid=30&srv=4&cdl=0"
  }, function(error, response, body) {
    body = body.replace(/&nbsp;/gi, " ")
    body = body.replace('null', ' ')
    body = body.split("<td><a href=\"#\" onMouseOver=f2('null') onMouseOut=f1()>")
    i = 1;
    while (body[i] != undefined) {
      bot.sendMessage(msg.from.id, striptags(body[i]))
      i++
    }
  })
});

// Novita'
bot.on([
  '/news'
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
        let replyMarkup = bot.inlineKeyboard([
          [bot.inlineButton('url', {url: uri})]
        ]);
        uri = uri.split(" target")
        uri = uri[0]
        console.log(uri);
        bot.sendMessage(msg.from.id, title + "\n" + body, {replyMarkup}).then((response) => {
          console.log('Ok:', response);
        }).catch((error) => {
          console.log("\n" + uri);
          console.log('Error:', error);
        });

      } else {
        bot.sendMessage(msg.from.id, title + "\n" + body).then((response) => {}).catch((error) => {});
      }
      i++
    }
  });
});
