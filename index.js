const Discord = require("discord.js")
const { Client, GatewayIntentBits, Partials } = require('discord.js')
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")
const ms = require('ms');
const welcome = require('./function/welcome')
const Delete = require('./function/Delete')
const VoiceChat = require('./function/VoiceChat')
const displayname = require('./function/displayname')
const roles = require('./function/roles')
const Newrole = require('./function/Newrole')
const Reactionrole = require('./function/ReactionRole')
const test = require('./function/test')
const test2 = require('./function/test2')

dotenv.config()
const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = "975672171970052116"
const LOAD_SLASH = process.argv[2] == "load"


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    console.log("กำลังปรับใช้คำสั่ง")
    rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("โหลดเสร็จแล้ว")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else {
    client.on("ready", () => {
        console.log(`เข้าสู่ระบบในฐานะ ${client.user.tag}`)
        client.user.setActivity(`${client.users.cache.size} คน`, {type: "WATCHING"})
        // client.channels.cache.get('962247643155812352').send('บอทออนไลน์แล้ว').then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
        welcome(client)
        Delete(client)
        VoiceChat(client)
        test2(client)
        displayname(client)
        roles(client)
        Newrole(client)
        Reactionrole(client)
        // test(client)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("ไม่ใช่คำสั่งทับที่ถูกต้อง")

            await interaction.deferReply({ephemeral: false})
            await slashcmd.run({ client, interaction, Discord })
        }
        handleCommand()
    })
    client.login(TOKEN)
}
