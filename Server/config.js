const accessToken = 'Your-TOKEN-Here';
const TeleBot = require('telebot');
const bot = new TeleBot(accessToken);

exports.bot = bot;
