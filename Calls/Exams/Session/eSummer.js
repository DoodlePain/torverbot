const bot = require('../../../Server/config.js');
var request = require("request");
var striptags = require('striptags');

module.exports = {
  list: function(msg){
    //Something
    console.log("Early Summer session module require");
    request({
      uri: "http://informatica.uniroma2.it/pages/trien/esami/dateEsami1.htm"
    }, function(error, response, body) {

    })
  }
}
