var request = require("request");
var striptags = require('striptags');
const TeleBot = require('telebot');
const bot = new TeleBot('371457888:AAFPcUPqD8ki1vPOEem8P75L1pZdpBbuaCc');
const Start = require('./Calls/start.js');
const News = require('./Calls/News/news.js');
const Menu = require('./Calls/menu.js');
const Schedule = require('./Calls/Schedule/scheduleManager.js');
const First = require('./Calls/Schedule/first.js');
const Second = require('./Calls/Schedule/second.js');
const Third = require('./Calls/Schedule/third.js');
const Prof = require('./Calls/Prof/list.js');
const Summer = require('./Calls/Exams/Session/summer.js');
const eSummer = require('./Calls/Exams/Session/esummer.js');
const Winter = require('./Calls/Exams/Session/winter.js');
const Autumn = require('./Calls/Exams/Session/autumn.js');
const Chooser = require('./Calls/Exams/chooser.js');

bot.start();

// Start command
bot.on('/start', msg => {
  return Start.start(msg);
});

// Menu
bot.on(/\bMenu/, msg =>{
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
