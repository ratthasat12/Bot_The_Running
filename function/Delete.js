const { EmbedBuilder } = require("discord.js")
const { cidD } = require('../config/FunctionConfig');
module.exports = (client) => {
client.on('messageDelete', (message) => {
            const embed = new EmbedBuilder()
                .setTitle('ลบข้อความ🚮')
                .addFields([
                    {
                        name:'ข้อความของ🎭',
                        value: `${message.author} (${message.author.username})`
                    },
                    {
                        name:'ช่องแชท💬',
                        value: `${message.channel.name}`
                    }
                    ])
                .setDescription(`${message.content}`)
                .setTimestamp();
            client.channels.cache.get(cidD).send({
                embeds: [embed]
            })
        })
    }