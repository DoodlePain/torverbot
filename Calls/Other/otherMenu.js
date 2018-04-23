const bot = require('../../Server/config.js');

module.exports = {
  menu: function(msg) {
    console.log(Date() + "Menu module");
    let replyMarkup = bot.bot.keyboard([
      ['💎 About', '❗️ Notifiche'],
      ['⏪ Menu']
    ], {
      resize: true
    });
    return bot.bot.sendMessage(msg.from.id, 'PER ATTIVARE PREMI IL TASTO \n\n❗️ Notifiche\n \n \nSe il sito di informatica e\' offline il bot continuera\' a funzionare comunque, solo un po piu\' lento.\n \n \n Qui trovi tutto quello che cerchi.', {
      replyMarkup
    });
  }
}