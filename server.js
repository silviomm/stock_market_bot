var TelegramBot = require('node-telegram-bot-api');
var req = require('request');

var token = '266023933:AAFu-VG98d2ZneXhs0QF56c8R4xT7ee87B0';

var bot = new TelegramBot(token, { polling: true });

bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  req('http://google.com/search?q='+msg, function(error, resp, body){
    if(!error && response.statusCode == 200){
      bot.sendMessage(chatId, "200");
    }
  });
  bot.sendMessage(chatId, "OK!");
});
