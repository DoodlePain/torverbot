const bot = require('../../Server/config.js');

module.exports = {
  chooser: function(msg){
    //Something
    console.log("Exams chooser module required");
    let replyMarkup = bot.bot.keyboard([
      ['🍂 Autunnale','⛄️ Invernale'],
      ['🌷 Anticipata', '☀️ Estiva' ],
      ['⏪ Menu']
    ], {resize: true});
    return bot.bot.sendMessage(msg.from.id, 'Scegli il periodo della sessione', {replyMarkup});

  }
}
