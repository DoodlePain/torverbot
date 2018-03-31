const bot = require('../../../Server/config.js');
var request = require("request");
var striptags = require('striptags');

module.exports = {
  list: function(msg){
    //Something
    console.log("Summer session module require");
    request({
      uri: "http://informatica.uniroma2.it/pages/trien/esami/dateEsami3.htm"
    }, function(error, response, body) {

    })
  }
}
