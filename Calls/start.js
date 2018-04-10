const bot = require('../Server/config.js');
var fs = require('fs');

module.exports = {
  start: function(msg) {
    //Something
    console.log("Start module");
    let replyMarkup = bot.bot.keyboard([
      ['📩 News', '📚 Docenti'],
      ['🕓 Orario', '🎯 Esami']
    ], {
      resize: true
    });
    var users = fs.readFile('./Calls/users.txt', function(err, data) {
      if (err) {
        return console.log("File read " + err);
      } else {
        return data;
      }
    })
    users = users + "\n" + msg.from.id + " : " + msg.from.first_name + " " + msg.from.username
    fs.writeFile('./Calls/users.txt', users, function(err) {
      if (err) throw err;
    });
    return bot.bot.sendMessage(msg.from.id, 'Benvenuto nel bot di Tor Vergata, il modo piu\' semplice per ricevere informazioni relative al corso di Informatica', {
      replyMarkup
    });

  }
}