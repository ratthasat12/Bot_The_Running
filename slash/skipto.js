const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("ข้ามเพลงไป #")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("เพลงที่จะข้ามไป").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply({
			embeds: [new EmbedBuilder()
				.setColor('#F13232')
				.setDescription('ไม่มีเพลงในคิว :x:')
			],
		}).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("ไม่มีเพลงที่อยู่ในคิวนี้")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`ข้ามเพลงไปคิวที่ ${trackNum}`)
	},
}
