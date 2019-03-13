const accessToken = process.env.ACCESS_TOKEN_TELEGRAM;
const TeleBot = require('telebot');
const bot = new TeleBot(accessToken);

exports.bot = bot;
