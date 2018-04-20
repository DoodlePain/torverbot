const bot = require('../Server/config.js');

module.exports = {
  menu: function(msg) {
    console.log(Date() + "Menu module");
    let replyMarkup = bot.bot.keyboard([
      ['📩 News', '📚 Docenti'],
      ['🕓 Orario', '🎯 Esami'],
      ['🚩 Altro']
    ], {
      resize: true
    });
    return bot.bot.sendMessage(msg.from.id, 'PER ATTIVARE LE NOTIFICHE VAI SU: \n   🚩 ALTRO  > ❗️ NOTIFICHE \n \n \n \n Qui trovi tutto quello che cerchi.', {
      replyMarkup
    });
  }
}