var request = require("request");
var striptags = require('striptags');
const TeleBot = require('telebot');
const accessToken = require('./Server/accessToken')
const bot = new TeleBot(accessToken.aT);
const Notifications = require('./Server/notifications.js')
const Global = require('./Server/globalNotification.js')
const Start = require('./Calls/start.js');
const News = require('./Calls/News/news.js');
const Menu = require('./Calls/menu.js');
const Altro = require('./Calls/Other/otherMenu.js');
const About = require('./Calls/Other/about.js');
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
// ✅  News module optimized
// ✅  About me
// ✅  Support
// ✅  Notification system
// ✅  Add response.statusCode error verification @ Schedule (Offline mode)
// ✅  FULL Offline data system
// ❌  News problem : If there are < 2 news it goes to the previous news page => USELESS UPDATE NEWS
// ❌  2nd Session of each
// ❌  Custom logo
// ❌  Full charset Support
// ❌  Perfomance update
// ❌  Bonus Challenge : Free classroom


setInterval(function () {
  request({
    uri: "http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0"
  }, function (error, response, body) {

    // File module

    if (error) {
      console.log("Huston, we've got some problems... \nThe site is offline!");
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
      News.update(msg, body)
    } else {
      console.log("Nothing new");
    }
  })
}, 12 * 60 * 1000);

bot.start(() => { });

// Start command
bot.on('/start', msg => {
  return Start.start(msg);
});

// Force news update command
bot.on('/forceUpdate', msg => {
  return News.update(msg);
});

// Global notification
bot.on('/global', msg => {
  return Global.global(msg);
});

// Menu
bot.on(/\bMenu/, msg => {
  return Menu.menu(msg);
});

// Altro
bot.on(/\bAltro/, msg => {
  return Altro.menu(msg);
});

// About
bot.on(/\bAbout/, msg => {
  return About.list(msg);
});

// Attiva notifiche
bot.on(/\bNotifiche/, msg => {
  return Notifications.notify(msg);
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