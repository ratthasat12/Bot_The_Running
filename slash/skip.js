const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("ข้ามเพลงนี้"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#F13232')
				.setDescription('ไม่มีเพลงในคิว :x:')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})

        const currentSong = queue.current

		queue.skip()
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setColor('#188BF3')
                .setDescription(`${currentSong.title} เพลงถูกข้ามแล้ว`)
				.setImage('https://cdn.discordapp.com/attachments/963515609855955005/1051686966007185408/skip.gif')
                .setThumbnail(currentSong.thumbnail)
            ]
        }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
	},
}
