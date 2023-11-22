const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("แสดงหน้าคิวเพลง")
    .addNumberOption((option) => option.setName("page").setDescription("เลขหน้าของคิว").setMinValue(1)),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing){
            return await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setColor('#F13232')
                    .setDescription('ไม่มีเพลงในคิว :x:')
                ],
            }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (interaction.options.getNumber("page") || 1) - 1

        if (page > totalPages) 
            return await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setColor('#F13232')
                    .setDescription(`ไม่มีหน้านี้ ในคิวมีแค่ ${totalPages} หน้า`)
                ],
            }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
        
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#188BF3')
                    .setDescription(`**เพลงที่กำลังเล่น**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**คิวเพลง**\n${queueString}`
                    )
                    .setFooter({
                        text: `หน้า ${page + 1} จาก ${totalPages}`
                    })
                    .setThumbnail(currentSong.setThumbnail)
            ]
        }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
    }
}