const http = require('http')
const port = 3000
var request = require("request");
var striptags = require('striptags');
var emoji = require('node-emoji').emoji;
const TeleBot = require('telebot');
const bot = new TeleBot('371457888:AAFPcUPqD8ki1vPOEem8P75L1pZdpBbuaCc');

let rain = 'u\U00002614' ;

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

bot.start();
bot.connect();

// Start command
bot.on('/start', msg => {
  let replyMarkup = bot.keyboard([
    [
      emoji.envelope_with_arrow +' News', emoji.book+' Docenti'
    ],
    [emoji.clock1 +' Orario']
  ], {resize: true});
  return bot.sendMessage(msg.from.id, 'Benvenuto nel bot di Tor Vergata, il modo piu\' semplice per ricevere informazioni relative al corso di Informatica', {replyMarkup});
});

bot.on(/\bMenu/, msg =>{

    let replyMarkup = bot.keyboard([
      [
        emoji.envelope_with_arrow+' News', emoji.book+' Docenti'
      ],[emoji.clock1+' Orario']
    ], {resize: true});
    return bot.sendMessage(msg.from.id, 'Qui trovi tutto quello che cerchi.', {replyMarkup});
});




// Lista degli orari
bot.on(/\bOrario/, msg => {
  let replyMarkup = bot.keyboard([
    [emoji.blue_heart +' Primo'], [emoji.green_heart +' Secondo'], [emoji.yellow_heart +' Terzo'],[emoji.rewind+" Menu"]
  ], {resize: true});
  return bot.sendMessage(msg.from.id, 'Seleziona l\'anno del corso', {replyMarkup});
});


// bot.on('/time', msg => {
//
//     return bot.sendMessage(msg.from.id, 'Getting time...').then(re => {
//         // Start updating message
//         updateTime(msg.from.id, re.result.message_id);
//     });
//
// });
//
// function updateTime(chatId, messageId) {
//
//     // Update every second
//     setInterval(() => {
//         bot.editMessageText(
//             {chatId, messageId}, `<b>Current time:</b> ${ time() }`,
//             {parseMode: 'html'}
//         ).catch(error => console.log('Error:', error));
//     }, 1000);
//
// }
//
// function time() {
//     return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
// }


// Mod every text message
// bot.mod('/orari', data => {
//     const msg = data.message;
//     msg.text = emoji.heart +` ${ msg.text }`;
//     return data;
// });


// Orario del primo
bot.on(/\Primo/, msg => {
  request({
    uri: "http://informatica.uniroma2.it/pages/trien/orario/orario.htm"
  }, function(error, response, body) {
    var orario=[];
    body = body. split("00</td>");
    var app  = [];
    var app2  = [];
    var app3  = [];
    var app4  = [];
    var app5  = [];
    var ore = ["9:00 : ","10:00 : ","11:00 : ","12:00 : ","13:00 : ","14:00 : ","15:00 : ","16:00 : ","17:00 : ","18:00 : "]
      for(i = 1;i<11;i++){
        bodya = body[i].split("</tr><tr style=\"")
        bodya = bodya[0];
        bodya = bodya.split("<td");
        body1 = bodya[1];
        body1 = body1.split(">");
        if(body1[2]!=''){
          body1 = "\n" + ore[i-1]+"" +body1[2].replace("</a","");
        } else {
          body1 = "\n" + ore[i-1]+"" + "Nulla"
        }
        app.push(body1);
        body2 = bodya[2];
        body2 = body2.split(">");
        if(body2[2]!=''){
          body2 = "\n" + ore[i-1]+"" +body2[2].replace("</a","");
        } else {
          body2 = "\n" + ore[i-1]+"" + "Nulla"
        }
        app2.push(body2);
        body3 = bodya[3];
        body3 = body3.split(">");
        if(body3[2]!=''){
          body3 = "\n" + ore[i-1]+"" +body3[2].replace("</a","");
        } else {
          body3 = "\n" + ore[i-1]+"" + "Nulla"
        }
        app3.push(body3);
        body4 = bodya[4];
        body4 = body4.split(">");
        if(body4[2]!=''){
          body4 = "\n" + ore[i-1]+"" +body4[2].replace("</a","");
        } else {
          body4 = "\n" + ore[i-1]+"" + "Nulla"
        }
        app4.push(body4);
        body5 = bodya[5];
        body5 = body5.split(">");
        if(body5[2]!=''){
          body5 = "\n" + ore[i-1]+"" +body5[2].replace("</a","");
        } else {
          body5 = "\n" + ore[i-1]+"" + "Nulla"
        }
        app5.push(body5);
      }
    orario.push(app,app2,app3,app4,app5);
    bot.sendMessage(msg.from.id,"Lunedi' :\n"+orario[0]).then(()=>{
      return bot.sendMessage(msg.from.id,"Martedi' :\n"+orario[1]).then(()=>{
        return bot.sendMessage(msg.from.id,"Mercoledi' :\n"+orario[2]).then(()=>{
          return bot.sendMessage(msg.from.id,"Giovedi' :\n"+orario[3]).then(()=>{
            return bot.sendMessage(msg.from.id,"Venerdi' :\n"+orario[4])
          })
        })
      })
    })
  })
});

// Orario del secondo
bot.on(/\bSecondo/, msg => {
  request({
    uri: "http://informatica.uniroma2.it/pages/trien/orario/orario.htm"
  }, function(error, response, body) {
    var orario=[];
    body = body. split("00</td>");
    var app  = [];
    var app2  = [];
    var app3  = [];
    var app4  = [];
    var app5  = [];
    var ore = ["9:00 : ","10:00 : ","11:00 : ","12:00 : ","13:00 : ","14:00 : ","15:00 : ","16:00 : ","17:00 : ","18:00 : "]
      for(i = 11;i<21;i++){
        bodya = body[i].split("</tr><tr style=\"")
        bodya = bodya[0];
        bodya = bodya.split("<td");
        body1 = bodya[1];
        body1 = body1.split(">");
        if(body1[2]!=''){
          body1 = "\n" + ore[i-11]+"" +body1[2].replace("</a","");
        } else {
          body1 = "\n" + ore[i-11]+"" + "Nulla"
        }
        app.push(body1);
        body2 = bodya[2];
        body2 = body2.split(">");
        if(body2[2]!=''){
          body2 = "\n" + ore[i-11]+"" +body2[2].replace("</a","");
        } else {
          body2 = "\n" + ore[i-11]+"" + "Nulla"
        }
        app2.push(body2);
        body3 = bodya[3];
        body3 = body3.split(">");
        if(body3[2]!=''){
          body3 = "\n" + ore[i-11]+"" +body3[2].replace("</a","");
        } else {
          body3 = "\n" + ore[i-11]+"" + "Nulla"
        }
        app3.push(body3);
        body4 = bodya[4];
        body4 = body4.split(">");
        if(body4[2]!=''){
          body4 = "\n" + ore[i-11]+"" +body4[2].replace("</a","");
        } else {
          body4 = "\n" + ore[i-11]+"" + "Nulla"
        }
        app4.push(body4);
        body5 = bodya[5];
        body5 = body5.split(">");
        if(body5[2]!=''){
          body5 = "\n" + ore[i-11]+"" +body5[2].replace("</a","");
        } else {
          body5 = "\n" + ore[i-11]+"" + "Nulla"
        }
        app5.push(body5);
      }
    orario.push(app,app2,app3,app4,app5);
    bot.sendMessage(msg.from.id,"Lunedi' :\n"+orario[0]).then(()=>{
      return bot.sendMessage(msg.from.id,"Martedi' :\n"+orario[1]).then(()=>{
        return bot.sendMessage(msg.from.id,"Mercoledi' :\n"+orario[2]).then(()=>{
          return bot.sendMessage(msg.from.id,"Giovedi' :\n"+orario[3]).then(()=>{
            return bot.sendMessage(msg.from.id,"Venerdi' :\n"+orario[4])
          })
        })
      })
    })
  })
});

// Orario del terzo
bot.on(/\bTerzo/, msg => {
  request({
    uri: "http://informatica.uniroma2.it/pages/trien/orario/orario.htm"
  }, function(error, response, body) {
    var orario=[];
    body = body. split("00</td>");
    var app  = [];
    var app2  = [];
    var app3  = [];
    var app4  = [];
    var app5  = [];
    var ore = ["9:00 : ","10:00 : ","11:00 : ","12:00 : ","13:00 : ","14:00 : ","15:00 : ","16:00 : ","17:00 : ","18:00 : "]
      for(i = 21;i<31;i++){
        bodya = body[i].split("</tr><tr style=\"")
        bodya = bodya[0];
        bodya = bodya.split("<td");
        body1 = bodya[1];
        body1 = body1.split(">");
        if(body1[2]!=''){
          body1 = "\n" + ore[i-21]+"" +body1[2].replace("</a","");
        } else {
          body1 = "\n" + ore[i-21]+"" + "Nulla"
        }
        app.push(body1);
        body2 = bodya[2];
        body2 = body2.split(">");
        if(body2[2]!=''){
          body2 = "\n" + ore[i-21]+"" +body2[2].replace("</a","");
        } else {
          body2 = "\n" + ore[i-21]+"" + "Nulla"
        }
        app2.push(body2);
        body3 = bodya[3];
        body3 = body3.split(">");
        if(body3[2]!=''){
          body3 = "\n" + ore[i-21]+"" +body3[2].replace("</a","");
        } else {
          body3 = "\n" + ore[i-21]+"" + "Nulla"
        }
        app3.push(body3);
        body4 = bodya[4];
        body4 = body4.split(">");
        if(body4[2]!=''){
          body4 = "\n" + ore[i-21]+"" +body4[2].replace("</a","");
        } else {
          body4 = "\n" + ore[i-21]+"" + "Nulla"
        }
        app4.push(body4);
        body5 = bodya[5];
        body5 = body5.split(">");
        if(body5[2]!=''){
          body5 = "\n" + ore[i-21]+"" +body5[2].replace("</a","");
        } else {
          body5 = "\n" + ore[i-21]+"" + "Nulla"
        }
        app5.push(body5);
      }
    orario.push(app,app2,app3,app4,app5);
    bot.sendMessage(msg.from.id,"Lunedi' :\n"+orario[0]).then(()=>{
      return bot.sendMessage(msg.from.id,"Martedi' :\n"+orario[1]).then(()=>{
        return bot.sendMessage(msg.from.id,"Mercoledi' :\n"+orario[2]).then(()=>{
          return bot.sendMessage(msg.from.id,"Giovedi' :\n"+orario[3]).then(()=>{
            return bot.sendMessage(msg.from.id,"Venerdi' :\n"+orario[4])
          })
        })
      })
    })
  })
});

docs = (body, i,msg) => {
  if(body[i]!=undefined){
    bot.sendMessage(msg.from.id, striptags(body[i])).then(()=> {return docs(body, i+1,msg)})
  }
}

// Lista dei docenti
bot.on(/\bDocenti/, msg => {
  request({
    uri: "http://informatica.uniroma2.it/f0?fid=30&srv=4&cdl=0"
  }, function(error, response, body) {
    body = body.replace(/&nbsp;/gi, " ")
    body = body.replace('null', ' ')
    body = body.split("<td><a href=\"#\" onMouseOver=f2('null') onMouseOut=f1()>")
    i = 1;
    // while (body[i] != undefined) {
      // bot.sendMessage(msg.from.id, striptags(body[i]))
      // i++
    // }
    docs(body,i,msg)
  })
});

// Novita'
bot.on([
  /\bNews/
], (msg) => {
  request({
    uri: "http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0"
  }, function(error, response, body) {

    var new1 = body.split("<table>")
    var i = 1
    while (new1[i] != undefined) {
      var app = new1[i].split("<img src=/images/new.gif>&nbsp;")
      var title = app[1].split("<br>")
      app = new1[i].split("<tr><td><p>")
      var body = app[1].split("</p><span>")
      title = striptags(title[0])
      var uri = undefined
      if (body[0].split("https")[1] != undefined && i < 4) {
        var uri = body[0].split("https")[1]
        uri = uri.split('">')
        uri = uri[0]
        uri = uri.replace('\"', "")
        uri = "https" + uri
      } else if (body[0].split("http")[1] != undefined && i < 4) {
        var uri = body[0].split("http")[1]
        uri = uri.split('">')
        uri = uri[0]
        uri = uri.replace('\"', "")
        uri = "http" + uri
      }
      body = striptags(body[0]);
      body = body.replace(/&nbsp;/gi, " ")
      body = body.replace(/&ugrave;/gi, "ù")
      body = body.replace(/&bull;/gi, "•")
      if (uri != undefined) {
        let replyMarkup = bot.inlineKeyboard([
          [bot.inlineButton('url', {url: uri})]
        ]);
        uri = uri.split(" target")
        uri = uri[0]
        console.log(uri);
        bot.sendMessage(msg.from.id, title + "\n" + body, {replyMarkup}).then((response) => {
          console.log('Ok:', response);
        }).catch((error) => {
          console.log("\n" + uri);
          console.log('Error:', error);
        });

      } else {
        bot.sendMessage(msg.from.id, title + "\n" + body).then((response) => {}).catch((error) => {});
      }
      i++
    }
  });
});
