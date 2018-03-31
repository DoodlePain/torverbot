const bot = require('../../Server/config.js');

module.exports = {
  chooser: function(msg){
    //Something
    console.log("Exams chooser module required");
    let replyMarkup = bot.bot.keyboard([
      [
        '☀️ Estiva', '🌷 Anticipata'
      ],
      ['⛄️ Invernale','🍂 Autunnale']
    ], {resize: true});
    return bot.bot.sendMessage(msg.from.id, 'Benvenuto nel bot di Tor Vergata, il modo piu\' semplice per ricevere informazioni relative al corso di Informatica', {replyMarkup});

  }
}
