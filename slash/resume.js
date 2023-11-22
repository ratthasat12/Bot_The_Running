const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("เล่นเพลงต่อจากเดิม"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#F13232')
				.setDescription('ไม่มีเพลงในคิว :x:')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})

		queue.setPaused(false)
        await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#188BF3')
				.setDescription('บอทได้ทำการเล่นเพลงต่อแล้ว')
				.setImage('https://cdn.discordapp.com/attachments/963515609855955005/1051689891890733156/resume.gif')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
	},
}
