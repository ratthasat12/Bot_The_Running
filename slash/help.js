const { SlashCommandBuilder } = require("@discordjs/builders")
const { ActionRowBuilder,ButtonBuilder,EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription("ช่วยเหลือ คำสั่งต่างๆ"),
    run: async ({ interaction }) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('primary')
                .setLabel('ปุ่มกด')
                .setStyle('1'),
                );
        return await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setColor('#d827bc')
                .setTitle('ขอเพลง:musical_note:')
                .setDescription('═══════════════════\n**คำสั่งในการใช้บอทเล่นเพลง**\n═══════════════════')
                .setURL('https://discord.com/channels/889508931829899344/962247643155812352')
                .addFields(
                    { name: 'เล่นเพลง', value: ':arrow_forward:` /play song (url) เล่นเพลงจาก url`'},
                    { name: 'ค้นหา', value: ':mag_right: `/play search ค้นหาเพลงบน youtube แล้วเล่นเพลง`'},
                    { name: 'หยุดเล่นเพลง', value: ':pause_button: `/pause หยุดเล่นเพลงชั่วคราว`'},
                    { name: 'เล่นเพลงต่อ', value: ':arrow_forward: `/resume เล่นเพลงต่อจากที่หยุดไว้`'},
                    { name: 'หยุดเล่น', value: ':stop_button:` /quit หยุดเล่นเพลง`'},
                    { name: 'ข้ามเพลง', value: ':track_next:` /skip ข้ามเพลงปัจจุบัน`'},
                )
                .setImage('https://cdn.discordapp.com/attachments/962630978466107393/969718611780452382/Hnet-image_1.gif')
                .setThumbnail('https://cdn.discordapp.com/attachments/963515609855955005/963516856868700190/Discord.png')
                .setTimestamp()
            ],
            
            components: [row]
        }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
    },
    
}
