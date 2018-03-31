const bot = require('../Server/config.js');

module.exports = {
  menu: function(msg){
    let replyMarkup = bot.bot.keyboard([
      ['📩 News', '📚 Docenti'],
      ['🕓 Orario','🎯 Esami']
      ], {resize: true});
    return bot.bot.sendMessage(msg.from.id, 'Qui trovi tutto quello che cerchi.', {replyMarkup});
    }
  }
