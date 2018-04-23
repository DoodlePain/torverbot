const bot = require('../Server/config.js');
var fs = require('fs');

module.exports = {
  global: function(msg, text) {
    //Something
    console.log(Date() + Date() + "Notifications module");
    let replyMarkup = bot.bot.keyboard([
      ['📩 News', '📚 Docenti'],
      ['🕓 Orario', '🎯 Esami'],
      ['🚩 Altro']
    ], {
      resize: true
    });
    if (msg.from.id == '168919643') {
      var users = fs.readFileSync('./Server/notifications.txt', 'utf8');
      users = users.split(',')
      var j = 0
      var message = msg.text.split('/global ')[1] + "\n-Manuel Scarapazzi"
      while (users[j] != undefined) {
        bot.bot.sendMessage(users[j], message, replyMarkup);
        j++;
      }
    }
  }
}