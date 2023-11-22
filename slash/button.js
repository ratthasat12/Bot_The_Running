const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow,MessageButton } = require("discord.js")
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder().setName('button').setDescription("ปุ่ม"),
    run: async ({ interaction }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('PRIMARY')
                .setStyle('PRIMARY')
                .setLabel('AAAA')
                );
        return await interaction.editReply({
            content: 'AAAA',
            components: [row]
        })
        
    },
}