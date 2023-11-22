const { EmbedBuilder } = require("discord.js")
const { cidVC } = require('../config/FunctionConfig');

module.exports = (client) => {
    client.on('voiceStateUpdate', (oldState, newState) => {
    const guild = newState.guild;
    const channels = guild.channels.cache.get(cidVC);
    if (channels) {
        const member = newState.member;
        const username = member.user.username;
    if (!oldState.channel && newState.channel){
        var icon = oldState.member.user.displayAvatarURL({dynamic: true});
            const embed = new EmbedBuilder()
                .setColor('#3ef734')
                .setAuthor({name: username, iconURL: icon})
                .setDescription(`เข้าร่วมช่องเสียง ${newState.channel} แล้ว`)
                .setTimestamp()
                
                channels.send({
                    embeds: [embed]
                
        });
    }
    else if (oldState.channel && !newState.channel) {
        var icon = oldState.member.user.displayAvatarURL({dynamic: true});
            const embed = new EmbedBuilder()
                .setColor('#f73434')
                .setAuthor({name: username, iconURL: icon})
                .setDescription(`ออกจาก ${oldState.channel} แล้ว`)
                .setTimestamp()
                
                channels.send({
            embeds: [embed]
            });
    }
    else if (newState.channel !== oldState.channel){
        var icon = oldState.member.user.displayAvatarURL({dynamic: true});
            const embed = new EmbedBuilder()
                .setColor('#34f1f7')
                .setAuthor({name: username, iconURL: icon})
                .setDescription(`ย้ายช่องเสียงจาก ${oldState.channel} :arrow_right: ${newState.channel} แล้ว`)
                .setTimestamp()
                
                channels.send({
                    embeds: [embed]
        });
    }
}
})
};