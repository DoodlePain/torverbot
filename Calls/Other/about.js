const bot = require('../../Server/config.js');

module.exports = {
  list: function(msg) {
    console.log("About module");
    // let replyMarkup = bot.bot.keyboard([
    //   ['💎 About', '❗️ Notifiche'],
    //   ['⏪ Menu']
    // ], {
    //   resize: true
    // });
    // let replyMarkup = bot.bot.keyboard([
    //   [bot.bot.button('contact', 'Your contact'), bot.bot.inlineKeyboard([
    //     ["Ciao"]
    //   ])],
    //   ['⏪ Menu']
    // ], {
    //   resize: true
    // });

    let replyMarkup = bot.bot.inlineKeyboard([
      [
        bot.bot.inlineButton('Facebook', {
          url: 'https://www.facebook.com/ZioBanana'
        }),
        bot.bot.inlineButton('Instagram', {
          url: 'https://www.instagram.com/frullo_e_peroni/'
        })
      ],
      [
        bot.bot.inlineButton('Telegram', {
          url: 't.me/DoodlePain'
        }),
        bot.bot.inlineButton('Condividi', {
          inline: '\n Created with ❤️ by Manuel Scarapazzi'
        })
      ]
    ]);


    //
    //  bot.sendMessage(msg.from.id, 'Button example.', {
    //   replyMarkup
    // });
    return bot.bot.sendMessage(msg.from.id, 'Ciao, \nquesto bot e\' stato creato \ncon cura e ❤️  da Manuel Scarapazzi \nper rendere piu\' semplice l\'accesso al sito di informatica. \nL\'utilizzo e\' completamente gratuito.', {
      replyMarkup
    });
  }
}