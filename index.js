var request = require("request");
var striptags = require('striptags');
const TeleBot = require('telebot');
const accessToken = require('./Server/accessToken')
const bot = new TeleBot(accessToken.aT);
const Start = require('./Calls/start.js');
const News = require('./Calls/News/news.js');
const Menu = require('./Calls/menu.js');
const Schedule = require('./Calls/Schedule/scheduleManager.js');
const First = require('./Calls/Schedule/first.js');
const Second = require('./Calls/Schedule/second.js');
const Third = require('./Calls/Schedule/third.js');
const Prof = require('./Calls/Prof/list.js');
const Summer = require('./Calls/Exams/Session/summer.js');
const eSummer = require('./Calls/Exams/Session/eSummer.js');
const Winter = require('./Calls/Exams/Session/winter.js');
const Autumn = require('./Calls/Exams/Session/autumn.js');
const Chooser = require('./Calls/Exams/chooser.js');
var fs = require('fs');


// TO DO :
// ✅  Exams module
// ❌  2nd Session of each
// ❌  About me
// ❌  Support
// ❌  Custom logo
// ❌  Full charset Support
// ❌  Free classroom
// ❌  Perfomance update


setInterval(function() {
  console.log('Checking news from http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0');
  request({
    uri: "http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0"
  }, function(error, response, body) {

    // File module

    if (error) {
      console.log("Site offline");
    }
    var resp = fs.readFileSync('./Calls/News/oldNews.txt', 'utf8')
    var msg = {
      "message_id": 6306,
      "from": {
        "id": 168919643,
        "is_bot": false,
        "first_name": "TunaFish",
        "username": "DoodlePain",
        "language_code": "it-IT"
      },
      "chat": {
        "id": 168919643,
        "first_name": "TunaFish",
        "username": "DoodlePain",
        "type": "private"
      },
      "date": 1522846281,
      "text": "📩 News",
      "reply": {}
    }
    if (resp !== body) {
      console.log("Something new on the site");
      News.news(msg)
    } else {
      console.log("Nothing new");
      // let parseMode = 'html';
      // bot.sendMessage(msg.from.id, "<b> Non ci sono novita\' sul sito </b> ", {parseMode})
    }
  })
}, 60 * 60 * 1000);

bot.start(() => {
  // setInterval()
});

// Start command
bot.on('/start', msg => {
  return Start.start(msg);
});

// Menu
bot.on(/\bMenu/, msg => {
  return Menu.menu(msg);
});

// Lista degli orari
bot.on(/\bOrario/, msg => {
  return Schedule.schedule(msg);
});

// Orario del primo
bot.on(/\Primo/, msg => {
  First.list(msg);
});

// Orario del secondo
bot.on(/\bSecondo/, msg => {
  Second.list(msg);
});

// Orario del terzo
bot.on(/\bTerzo/, msg => {
  Third.list(msg);
});

// Lista dei docenti
bot.on(/\bDocenti/, msg => {
  Prof.list(msg);
});

// Novita'
bot.on(/\bNews/, msg => {
  News.news(msg)
});

// Novita'
bot.on(/\bEsami/, msg => {
  Chooser.chooser(msg);
});

// Estiva
bot.on(/\bEstiva/, msg => {
  Summer.list(msg);
});

// Anticipata
bot.on(/\bAnticipata/, msg => {
  eSummer.list(msg);
});

// Invernale
bot.on(/\bInvernale/, msg => {
  Winter.list(msg);
});

// Autunnale
bot.on(/\bAutunnale/, msg => {
  Autumn.list(msg);
});