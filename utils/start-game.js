const { gameOptions } = require('../constants/options');

module.exports = {
    startGame: async(bot, id, chats) => {
        await bot.sendMessage(id, "Сейчас я загадаю цифру от 0 до 9, а ты попробуй её угадать :)");
        const randomNumber = Math.floor(Math.random() * 10);
        chats[id] = randomNumber;
        await bot.sendMessage(id, "Угадывай :)", gameOptions);
    }
}
