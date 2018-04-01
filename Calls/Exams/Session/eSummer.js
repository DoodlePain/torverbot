const bot = require('../../../Server/config.js');
var request = require("request");
var striptags = require('striptags');
const fs = require('fs');


module.exports = {
  list: function(msg){
    //Something
    console.log("Early Summer session module require");
    request({
      uri: "http://informatica.uniroma2.it/pages/trien/esami/dateEsami1.htm",
      encoding: "utf-8"
    }, function(error, response, body) {
      // console.log(body);
      body = body.replace(/&nbsp;/gi, " ")
      body = body.replace('null', ' ')

      // File module

      if(error){
        console.log("File reading");
        body = fs.readFile('./Calls/Exams/Session/oldESummer.txt',function(err,data){
          if(err){
            return console.log("File read "+err);
          }
          else {
            console.log("File read end");
            return data;
          }
        })
      }
      else{
        console.log("File writing");
        fs.writeFile('./Calls/Exams/Session/oldESummer.txt',body, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
        console.log("File write end");
      }
      // File module end



      console.log(striptags(body));
      var primo,secondo;
      body = body.split('<h1>')
      pApp = body[1]
      var appello = body[1]
      pApp = pApp.split('</h1>')
      appello = body[1].split("</h1>")[0]
      var primo = pApp[1]
      var secondo = pApp[2]
      var terzo = pApp[3]

      // console.log(striptags(primo));

      sApp = body[2]

      // console.log(body);

      let parseMode = 'html';
      // console.log(striptags("APPELLO " +appello[0]));
      // console.log(striptags(appello));
      bot.bot.sendMessage(msg.from.id, appello, {parseMode})
      // console.log(striptags(pApp));
    })
  }
}
