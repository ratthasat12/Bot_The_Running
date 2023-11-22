const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder().setName("quit").setDescription("หยุดเล่นเพลง และเคลียร์คิวทั้งหมด"),
	run: async ({ client, interaction }) => {
		const queue = client.player.nodes.create(interaction.guildId)

		if (!queue) return await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#F13232')
				.setDescription('ไม่มีเพลงในคิว :x:')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})

		queue.destroy()
        await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#188BF3')
				.setDescription('บอทได้ออกจากห้องไปแล้ว')
				.setImage('https://cdn.discordapp.com/attachments/963515609855955005/1051691298828066856/exit.gif')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
	},
}
