const { startGame } = require('./utils/start-game');
const { gameOptions, againOptions } = require('./constants/options');
const { commands, command_chat } = require('./constants/commands');
const telegramBot = require('node-telegram-bot-api');
const { token } = require('./api/token');

const bot = new telegramBot(token, {polling: true});

const chats = {};

const botStart = () => {
    bot.setMyCommands(command_chat);

    bot.on('message', async (message) => {
        const text = message.text;
        const chatId = message.chat.id;

        if (text === commands.start) {
            await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp");
            return bot.sendMessage(chatId, "Добро пожаловать в самый топовый чат");
        }
        if (text === commands.info) {
            return bot.sendMessage(chatId, `Тебя зовут ${message.from.first_name} ${message.from.last_name}`);
        }
        if (text === commands.game) {
            return startGame(bot, chatId, chats);
        }

        return bot.sendMessage(chatId, `я тебя не понимаю, попробуй еще раз:)`);
    });

    bot.on('callback_query', async message => {
        const data = message.data;
        const chatId = message.message.chat.id;

        if (data === commands.again) {
            return startGame(bot, chatId, chats);
        }
        if (data === chats[chatId]) {
            await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/2.webp");
            return bot.sendMessage(chatId,`Прекрасно, моя "${chats[chatId]}" угадана :)`, againOptions);
        } else {
            await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/10.webp");
            return bot.sendMessage(chatId, `Ой, я загадал "${chats[chatId]}"`, againOptions);
        }

    })
}

botStart();

