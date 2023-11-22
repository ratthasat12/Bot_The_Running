const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder} = require("discord.js")
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder().setName('test').setDescription("testa"),
    run: async ({ interaction }) => {
        const RoleE1 = '🙋‍♂️';
        const RoelE2 = '🙋‍♀️';
        const msg = new EmbedBuilder()
            .setColor('#209ffd')
            .setThumbnail('https://cdn.discordapp.com/attachments/1176513213572059147/1176772228885512192/The_running.png?ex=6570158a&is=655da08a&hm=8964ce20819d5f7e4f43f80e4950ff9616bbdc99826d0c8e34eb23d883490ec7&')
            .setTitle('เลือก Roles')
            .setImage('https://cdn.discordapp.com/attachments/1176513213572059147/1176772228885512192/The_running.png?ex=6570158a&is=655da08a&hm=8964ce20819d5f7e4f43f80e4950ff9616bbdc99826d0c8e34eb23d883490ec7&')
            .setDescription('เลือก เพศ ของคุณโดยกดที่ emoji ด้าานล่าง!\n'
                +RoleE1+' `A`\n'
                +RoelE2+' `B`\n'
            );
                const msgE = await interaction.editReply({
                    embeds: [msg]
         });msgE.react(RoleE1)
                .then(msgE.react(RoelE2))
    }
    }