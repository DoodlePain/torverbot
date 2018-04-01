const bot = require('../Server/config.js');

module.exports = {
  start: function(msg){
    //Something
    console.log("Start module");
    let replyMarkup = bot.bot.keyboard([
      [
        '📩 News', '📚 Docenti'
      ],
      ['🕓 Orario','🎯 Esami']
    ], {resize: true});
    return bot.bot.sendMessage(msg.from.id, 'Benvenuto nel bot di Tor Vergata, il modo piu\' semplice per ricevere informazioni relative al corso di Informatica', {replyMarkup});

  }
}
