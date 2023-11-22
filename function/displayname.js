const { EmbedBuilder } = require("discord.js")
const { ciddn } = require('../config/FunctionConfig');
module.exports = (client) => {
        client.on('guildMemberUpdate', (oldMember, newMember) => {
            const ranemoji = [":smiling_face_with_3_hearts:",":heart_eyes:",":star_struck:",":heart_eyes_cat:"];
            const rande = Math.floor(Math.random()*(ranemoji.length));
            var icon = oldMember.user.displayAvatarURL({dynamic: true});
            var name = `${oldMember.user.username}`;
            var oname = `${oldMember.displayName}`;
            var nname = `${newMember.displayName}`;
                const embed = new EmbedBuilder()
                    .setColor('#5AEAA4')
                    .setAuthor({name: name, iconURL: icon})
                    .addFields(
                        { name: 'ชื่อเดิม', value: oname, inline: true},
                        { name: 'ชื่อใหม่', value: nname, inline: true }
                    )
                    .setDescription(`ผู้ใช้ ${oldMember.user} ได้ทำการเปลี่ยนชื่อแล้ว ${(ranemoji[rande])}`)
                    .setTimestamp()
                    if (oldMember.displayName !== newMember.displayName)
                    client.channels.cache.get(ciddn).send({
                embeds: [embed]
                })
    });
};