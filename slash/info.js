const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("ข้อมูลเพลงที่เปิดอยู่ขณะนี้"),
	run: async ({ client, interaction }) => {
		const queue = client.player.nodes.create(interaction.guildId)

		if (!queue) return await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#F13232')
				.setDescription('ไม่มีเพลงที่เล่นอยู่ขณะนี้ :x:')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})

		let bar = queue.createProgressBar({
			queue: false,
			length: 19,
		})

        const song = queue.current

		await interaction.editReply({
			embeds: [new EmbedBuilder()
			.setColor('#188BF3')
            .setThumbnail(song.thumbnail)
            .setDescription(`กำลังเล่นเพลง [${song.title}](${song.url})\n\n` + bar)
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))});
	},
}
