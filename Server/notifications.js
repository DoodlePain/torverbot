const bot = require('../Server/config.js');
var fs = require('fs');

module.exports = {
  notify: function(msg) {
    //Something
    console.log("Notifications module");
    let replyMarkup = bot.bot.keyboard([
      ['📩 News', '📚 Docenti'],
      ['🕓 Orario', '🎯 Esami'],
      ['🚩 Altro']
    ], {
      resize: true
    });
    var users = fs.readFileSync('./Server/notifications.txt', 'utf8');
    users = users.split(',')
    var i = 0;
    var found = false
    while (users[i] != undefined) {
      if (users[i] == msg.from.id) {
        found = true
      }
      i++
    }
    if (found == false) {
      console.log("User not found");
      users = users + "," + msg.from.id
    }
    fs.writeFile('./Server/notifications.txt', users, function(err) {
      if (err) throw err;
    });
    return bot.bot.sendMessage(msg.from.id, 'Notifiche attivate', {
      replyMarkup
    });

  }
}