const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { clientid, token } = require('./config.js'); // トークンやクライアントIDを設定

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ボットがPong! と返す')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('スラッシュコマンドを登録中...');
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('スラッシュコマンドが登録されました！');
    } catch (error) {
        console.error(error);
    }
})();
