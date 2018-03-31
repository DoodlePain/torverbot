const bot = require('../../Server/config.js');

module.exports = {
  schedule: function(msg){
    let replyMarkup = bot.bot.keyboard([
      ['🌚 Primo'], ['🌓 Secondo'], ['🌝 Terzo'],['⏪ Menu']
    ], {resize: true});
    return bot.bot.sendMessage(msg.from.id, 'Seleziona l\'anno del corso', {replyMarkup});
  }
}
