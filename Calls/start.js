const bot = require('../Server/config.js');
var fs = require('fs');

module.exports = {
  start: function(msg) {
    //Something
    console.log(Date() + "Start module");
    let replyMarkup = bot.bot.keyboard([
      ['📩 News', '📚 Docenti'],
      ['🕓 Orario', '🎯 Esami'],
      ['🚩 Altro']
    ], {
      resize: true
    });
    var users = fs.readFile('./Server/LocalFiles/users.txt', function(err, data) {
      if (err) {
        return console.log(Date() + "File read " + err);
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