const { EmbedBuilder } = require("discord.js")
const { cid } = '1065981196049317939';
module.exports = (client) => {
    client.on("ready", () => {
        const embed = new Discord.EmbedBuilder()
            .setColor('#e42643')
            .setTitle('เลือก Roles!')
            .setDescription('เลือก Rolse ที่ต้องการโดยกดที่ emoji ด้าานล่าง!');
            client.channels.cache.get(cid).send({
                    embeds: [embed]
                })
        // const EmbedBuilder = message.channel.send(embed);
        // EmbedBuilder.react('🆕');
        })
}