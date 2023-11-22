const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("สับเปลี่ยนคิว"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#F13232')
				.setDescription('ไม่มีเพลงในคิว :x:')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})

		queue.shuffle()
        await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#188BF3')
				.setDescription(`คิว ${queue.tracks.length} คิวถูกสับเปลี่ยนแล้ว`)
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
	},
}
