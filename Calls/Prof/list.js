const bot = require('../../Server/config.js');
var request = require("request");
var striptags = require('striptags');

module.exports = {
  list: function(msg){
    //Something
    console.log("Prof module require");
    request({
      uri: "http://informatica.uniroma2.it/f0?fid=30&srv=4&cdl=0"
    }, function(error, response, body) {
      body = body.replace(/&nbsp;/gi, " ")
      body = body.replace('null', ' ')
      body = body.split("<td><a href=\"#\" onMouseOver=f2('null') onMouseOut=f1()>")
      i = 1;
      docs(body,i,msg)
    })
  }
}


docs = (body, i,msg) => {
  if(body[i]!=undefined){
    var name = striptags(body[i].split("<td>")[0]);
    var ruolo = striptags(body[i].split("<td>")[1]);
    var ufficio = striptags(body[i].split("<td>")[2])
    var telefono = striptags(body[i].split("<td>")[3])
    if(telefono[0]!="+" && telefono[0]!="n" && telefono[0]!=" "){
      telefono = "+39"+telefono
    }
    var mail = body[i].split("<td>")[3]
    var mail = mail.split("@")
    mail1 = mail[0].split(":")[2]
    if(mail[1]!=undefined)
    {mail2 = mail[1].split("  '")[0]
    mail = mail1+""+mail2}
    else {
      mail = "Non definita"
    }
    telefono = telefono.replace("-","")
    telefono = telefono.replace("-","")
    telefono = telefono.replace(".","")
    telefono = telefono.replace(" ","")
    telefono = telefono.replace(" ","")
    var materia = striptags(body[i].split("<td>")[4])
    let parseMode = 'html';
    bot.bot.sendMessage(msg.from.id, "<b>" +name + "</b> \nRuolo : "+ ruolo +"\nStudio : "+ufficio+"\nTelefono : " +telefono +"\nMateria : "+materia+"\nEmail : "+mail, {parseMode}).then(()=> {return docs(body, i+1,msg)})
  }
}
