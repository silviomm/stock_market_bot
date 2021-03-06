var TelegramBot = require('node-telegram-bot-api');
var req = require('request');
var cheerio = require('cheerio');
var token = '266023933:AAFu-VG98d2ZneXhs0QF56c8R4xT7ee87B0';
var bot = new TelegramBot(token, { polling: true });


var ac = new Map();

function adiciona(userID, array){
  for(var i = 0; i<array.lenght;i++){
    if(array[i] == userID) return;
  }
  array.push(userID);
}

function follow(userID, stock){
  if(ac.has(stock)){
    var aux = ac.get(stock);
    adiciona(userID, aux);
    ac.set(stock, aux);
  }
  else{
    ac.set(stock, [userID]);
  }
}

bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  req(yahooFinanceSearch(msg.text), function(error, resp, body){
    if(!error && resp.statusCode == 200){
      var $ = cheerio.load(body);
      $('#quote-header-info').children().has('span').each(function(i){
          if(i==1){
            var t = $(this).text();
            console.log(t);
            bot.sendMessage(chatId, '$'+t.split(')')[0]+')');
          }
      });
    }
  });
  bot.sendMessage(chatId, "OK!");
});



var googleSearch = function(search) {
  return 'http://www.google.com/search?q=' + search;
};

var yahooFinanceSearch = function(search) {
  return 'https://finance.yahoo.com/quote/'+ search + '.SA';
}
