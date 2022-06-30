
const axios = require("axios");
const TeleBot = require('telebot');
//
let SECRET_TOKEN = require("./config/secret_token");
let {
    TOKEN
} = SECRET_TOKEN;


const bot = new TeleBot({
    token: TOKEN
});


// Command keyboard
const replyMarkup = bot.keyboard([
    ['/products', '/about']
], {resize: true, once: false});

const buyButtons = bot.keyboard([
    ['buy', 'main']
], {resize: true, once: false});



// On command "start" or "help"
bot.on(['/start', '/help'], function (msg) {
    const startWelcome = "bienvenidos a la tienda";

    return bot.sendMessage(msg.chat.id,startWelcome,{replyMarkup});
});


bot.on(['/products'], async function (msg) {
    const url = "https://prismatic-otter-bc48dd.netlify.app/get_products";
    let id = msg.chat.id; 
    try{
        let arr = await axios.get(url);
        let {data} = arr;
        return bot.sendMessage(id,JSON.stringify(data.products),{buyButtons});
    }catch(err){
        console.log(err);
    }
});

// Start getting updates
bot.start();