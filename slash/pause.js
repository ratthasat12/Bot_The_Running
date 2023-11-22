const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("หยุดเล่นเพลงชั่วคราว"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#F13232')
				.setDescription('ไม่มีเพลงในคิว :x:')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})

		queue.setPaused(true)
        await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#188BF3')
				.setDescription('เพลงหยุดเล่นแล้ว หากต้องการเล่นต่อใช้คำสั่ง /resume เพื่อเล่นเพลงต่อ')
				.setImage('https://cdn.discordapp.com/attachments/963515609855955005/1051688281810677850/pause.gif')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
	},
}
