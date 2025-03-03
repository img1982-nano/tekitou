"use strict"; //厳格モード(おまじない)

//パッケージをロードする
require('date-utils')//Date(日時)を便利にするやつ

//BOTトークンを変数tokenに読み込み
const { token, SUPABASE_URL, SUPABASE_API_KEY } = require('./config.json');
const supabaseUrl = SUPABASE_URL
const supabaseAnonKey = SUPABASE_API_KEY
//discord.jsをインポート
const axios = require("axios")
const { Client, GatewayIntentBits, Component } = require('discord.js');//discordjsから必要なのをrequire
const { Events } = require("discord.js");
const { ButtonBuilder, ActionRowBuilder, ButtonStyle, SlashCommandBuilder} = require('discord.js');
//co = require("discord.js-buttons")(client);
const { createClient } = require("@supabase/supabase-js")

const client = new Client({ //インテントを設定してクライアントを定義する
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// SUPABASE
const supabase = createClient(supabaseUrl, supabaseAnonKey);
//mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.40.80:27017');

const userSchema = new mongoose.Schema({
    user_id: String,
    text: String
});

const User = mongoose.model('User', userSchema);

//デバッグ用に情報書き出し
console.log("-------start up-------");
//今の時間をフォーマットしてstartup_timeに入れる
const startup_time = new Date().toFormat("YYYY/MM/DD HH24時MI分SS秒");
//ログとしてバージョン情報と起動した日時を出力しておく
console.log("start_up:" + startup_time);
console.log("node js   version : " + process.versions.node);
console.log("discordjs version : " + require('discord.js').version);
console.log("----------------------");
//デバッグ用に情報書き出し ここまで
//ログイン処理
client.login(token);
//起動したときに最初に走る処理
client.on('ready', async () => {
    console.log(`${new Date().toFormat("YYYY/MM/DD HH24時MI分SS秒")} ${client.user.tag}でログインしました。`);
    client.user.setActivity("az!info", { type: "PLAYING" });
    const data = [{
        name: "ping",
        description: "Replies with Pong!",
    },
    {
        name: "random-cat",
        description: "ぬっこかわええ"
    }
    ];
    await client.application.commands.set(data);
});
client.on(Events.MessageCreate, async message => { //messageに作られたmessageとかいろいろ入る
    if (message.author.bot) {//メッセージの送信者がBOTなら
        return;//returnしてこの先の処理をさせない。
    }
    if (message.content.startsWith("az!ping")) { //message.content(メッセージの内容)が「おはよ」で始まっていたら
        const channel = message.channel
        const sleep = (ms) => new Promise(r => setTimeout(r, ms));
        channel.sendTyping()
        await sleep(3000)
        await message.channel.send("Pong"); //botがmessage.channel(メッセージが送信されたチャンネル)に「おはよ」と送信する
    }
    if (message.content.startsWith("az!show-menber")) {
        // ここにメンバー一覧を表示するプログラム
        const role = message.guild.roles.cache.get("1191350546259517481")
        message.reply(role.members.map(member=>member.username).join("\n"));
    }
    if (message.content.startsWith("get")) { //message.content(メッセージの内容)が「おはよ」で始まっていたら
        const info = message.content
        const test = info.replace("get", "")
        console.log(test)
        await message.channel.send(test)
    }
    if (message.content.startsWith("az!info")) {
        const { EmbedBuilder } = require("discord.js");
        const embed = new EmbedBuilder()
            .setDescription("Lang by JS")
            .setTitle('Azibot - INFO')
            .addFields({name: '開発者', value: 'Azilamo'})
            .addFields({name:"用途", value:"いろいろ"})
            .addFields({name:"コマンド", value:"info - BOTの情報を表示\n ping - pong\n reasion - なぞのリアクションをする\n random-wiki - wikipediaからランダムに記事を生成\n save - DBにテキストを保存します\n load - DBからテキストを取り出します\n random-cat - ランダムな猫の画像を表示します"})
            .setColor("Red")
            .setTimestamp()
            .setThumbnail("https://images.ctfassets.net/in6v9lxmm5c8/7J6X29QCpCjoReVMQFOC1D/f091383d411092eaa4487bad33560ca6/golang.png")
        message.channel.send({ embeds: [embed] })
    }
    if (message.content.startsWith("az!reasion")) {
        
        message.react("🔞")
        message.react("🔥")
        message.react("🫣")
        message.react("😭")
        message.react("🇦")
        message.react("🇿")
        message.react("🇮")
        message.react("🇱")
        message.react("🇲")
        message.react("🇴")
    }
    if (message.content.startsWith("buttes")) {
        const buttons = new ButtonBuilder()
            .setCustomId("tekitou")
            .setLabel("てきとうぼたん")
            .setStyle(ButtonStyle.Primary)
        
        const row = new ActionRowBuilder()
            .addComponents(buttons)
        
            await message.channel.send({
                content: "てすとぼたんだよ↓",
                components: [row],
            })
    }
    if (message.content.startsWith("az!random-wiki")) {
        const response = await axios.get('https://ja.wikipedia.org/w/api.php?format=json&action=query&list=random&rnnamespace=0&rnlimit=1')
        message.channel.send("タイトル  :   " + response.data.query.random[0].title + "\nリンク :   " + "https://ja.wikipedia.org/wiki/" + response.data.query.random[0].title)
    }
    if (message.content.startsWith("top-article")) {
        message.channel.send("このコマンドは作成中です")
    }
    if (message.content.startsWith("az!random-cat")) {
        const catimage = await axios.get("https://api.thecatapi.com/v1/images/search?limit=1")
        message.channel.send(catimage.data[0].url)
    }
    if (message.content.startsWith('az!save')) {
        const args = message.content.slice('upload'.length).trim();
        const senderName = message.author.username
        const newUser = new User({user_id: senderName, text: args});
        newUser.save();
        message.channel.send(`保存されたテキスト:${args}`);
    }
    if (message.content.startsWith("az!load")) {
        const senderName = message.author.username
        
        User.find({ user_id: senderName }).then(users => {
            const texts = users.map(user => user.text).join("\n");
            message.channel.send(`保存されたテキスト:\n${texts}`);
        });
    }
});
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong！');
    }
    if (interaction.commandName === 'random-cat') {
        const catimage = await axios.get("https://api.thecatapi.com/v1/images/search?limit=1")
        await interaction.reply(catimage.data[0].url);
    }
});