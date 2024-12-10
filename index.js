"use strict"; //厳格モード(おまじない)

//パッケージをロードする
require('date-utils')//Date(日時)を便利にするやつ

//BOTトークンを変数tokenに読み込み
const { token } = require('./config.json');

//discord.jsをインポート
const axios = require("axios")
const { Client, GatewayIntentBits, Component } = require('discord.js');//discordjsから必要なのをrequire
const { Events } = require("discord.js");
const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
//co = require("discord.js-buttons")(client);
const client = new Client({ //インテントを設定してクライアントを定義する
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

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
    client.user.setActivity("ペペロンチーノ三世、通常営業中")
});
client.on(Events.MessageCreate, async message => { //messageに作られたmessageとかいろいろ入る
    if (message.author.bot) {//メッセージの送信者がBOTなら
        return;//returnしてこの先の処理をさせない。
    }
    if (message.content.startsWith("ping")) { //message.content(メッセージの内容)が「おはよ」で始まっていたら
        const channel = message.channel
        const sleep = (ms) => new Promise(r => setTimeout(r, ms));
        channel.sendTyping()
        await sleep(3000)
        await message.channel.send("Pong"); //botがmessage.channel(メッセージが送信されたチャンネル)に「おはよ」と送信する
    }
    if (message.content.startsWith("show-menber")) {
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
    if (message.content.startsWith("info")) {
        const { EmbedBuilder } = require("discord.js");
        const embed = new EmbedBuilder()
            .setDescription("Lang by JS")
            .setTitle('ペペロンチーノ三世 - INFO')
            .addFields({name: '開発者', value: 'Azilamo'})
            .addFields({name:"用途", value:"いろいろ"})
            .addFields({name:"コマンド", value:"info - BOTの情報を表示 ping - pong reasion - 開発中"})
            .setColor("Red")
            .setTimestamp()
            .setThumbnail("https://images.ctfassets.net/in6v9lxmm5c8/7J6X29QCpCjoReVMQFOC1D/f091383d411092eaa4487bad33560ca6/golang.png")
        message.channel.send({ embeds: [embed] })
    }
    if (message.content.startsWith("reasion")) {
        
        message.react("🔞")
        message.react("🔥")
        message.react("🫣")
        message.react("😭")
        message.react("🇦")
        message.react("🇿")
        message.react("🇮")
        message.react("🇱")
        message.react("1315581965692567552")
        message.react("🇲")
        message.react("🇴")
        message.react("1312766567339266129")
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
    if (message.content.startsWith("got-test")) {
        console.log("null-command")
    }
});