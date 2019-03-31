const accessToken = require('./accessToken').aT;
const TeleBot = require('telebot');
const bot = new TeleBot(accessToken);

exports.bot = bot;
