const bot = require('../../../Server/config.js');
var request = require("request");
var striptags = require('striptags');
const fs = require('fs');

module.exports = {
  list: function(msg) {
    //Something
    console.log(Date() + "Winter session module require");
    request({
      uri: "http://informatica.uniroma2.it/pages/trien/esami/dateEsami0.htm"
    }, function(error, response, body) {
      body = body.replace(/&nbsp;/gi, " ")
      body = body.replace('null', ' ')
      body = body.replace('�', 'e\'')
      body = body.replace('�', 'e\'')

      // File module

      if (response.statusCode != '200') {
        body = fs.readFile('./Calls/Exams/Session/oldESummer.txt', function(err, data) {
          if (err) {
            return console.log(Date() + "File read " + err);
          } else {
            return data;
          }
        })
      } else {
        fs.writeFile('./Calls/Exams/Session/winter.txt', body, function(err) {
          if (err) throw err;
        });
      }
      // File module end


      var insegnamento, docente, sData, sOra, sAula, oData, oOra, oAula
      var primo, secondo;
      body = body.split('<h1>')
      pApp = body[1]
      var appello = body[1]
      pApp = pApp.split('</h1>')
      appello = body[1].split("</h1>")[0]
      pApp = pApp[1].split("<tr>")
      rec = (pApp, i) => {
        if (i >= 3) {
          return null;
        } else {
          let parseMode = 'html';
          let response = "<b>                         " + (i + 1) + " Anno</b> "
          var primo = pApp[i + 3].split("<td")
          bot.bot.sendMessage(msg.from.id, response, {
            parseMode
          }).then(() => {
            for (var j = 0; primo[2 + j * 8] !== undefined; j++) {
              insegnamento = striptags(primo[2 + j * 8])
              insegnamento = insegnamento.split(">")[1]
              docente = striptags(primo[3 + j * 8])
              docente = docente.split(">")[1]
              sData = striptags(primo[4 + j * 8])
              sData = sData.split(">")[1]
              sOra = striptags(primo[5 + j * 8])
              sOra = sOra.split(">")[1]
              sAula = striptags(primo[6 + j * 8])
              sAula = sAula.split(">")[1]
              oData = striptags(primo[7 + j * 8])
              oData = oData.split(">")[1]
              oOra = striptags(primo[8 + j * 8])
              oOra = oOra.split(">")[1]
              oAula = striptags(primo[9 + j * 8])
              oAula = oAula.split(">")[1]
              let response = "<b>" + insegnamento + " - " + docente + "</b>\nEsame scritto :" + "\nIl: " + sData + " alle " + sOra + " in aula: " + sAula + "\nEsame orale: " + "\nIl: " + oData + " alle " + oOra + " in aula: " + oAula;
              let parseMode = 'html';
              if (primo[2 + (j + 1) * 8] !== undefined) {
                bot.bot.sendMessage(msg.from.id, response, {
                  parseMode
                })
              } else {
                bot.bot.sendMessage(msg.from.id, response, {
                  parseMode
                }).then(() => {
                  return rec(pApp, i + 1)
                })
              }
            }
          })
        }
      }
      rec(pApp, 0);
    })
  }
}