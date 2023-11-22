const { EmbedBuilder } = require("discord.js")
const { cidR } = require('../config/FunctionConfig');
module.exports = (client) => {
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        let oldRoleIDs = [];
        oldMember.roles.cache.each(role => {
            oldRoleIDs.push(role.id);
        });
        let newRoleIDs = [];
        newMember.roles.cache.each(role => {
            newRoleIDs.push(role.id);
        });
        if (newRoleIDs.length > oldRoleIDs.length) {
            function filterOutOld(id) {
                for (var i = 0; i < oldRoleIDs.length; i++) {
                    if (id === oldRoleIDs[i]) {
                        return false;
                    }
                }
                return true;
            }
            let onlyRole = newRoleIDs.filter(filterOutOld);
            let IDNum = onlyRole[0];
            const ranemoji = [":smiling_face_with_3_hearts:",":heart_eyes:",":star_struck:",":heart_eyes_cat:"];
            const rande = Math.floor(Math.random()*(ranemoji.length));
            var icon = oldMember.user.displayAvatarURL({dynamic: true});
            var name = `${oldMember.user.username}`;
            var name2 = `${oldMember.user}`;
            var role =`<@&${IDNum}>${(ranemoji[rande])}`;
                const embed = new EmbedBuilder()
                .setColor('#5AEAA4')
                .setAuthor({name: name, iconURL: icon})
                .setDescription('เพิ่มบทบาท ✅')
                .addFields(
                    { name: 'ชื่อผู้ใช้' , value: name2 ,inline: true},
                    { name: 'บทบาท', value: role ,inline: true }
                    
                )
                .setTimestamp()
                client.channels.cache.get(cidR).send({
                embeds: [embed]
                })
        } 
        else if (oldRoleIDs.length > newRoleIDs.length) {
                function filterOutOld(id) {
                    for (var i = 0; i < newRoleIDs.length; i++) {
                        if (id === newRoleIDs[i]) {
                            return false;
                        }
                    }
                    return true;
                }
            let onlyRole = oldRoleIDs.filter(filterOutOld);
            let IDNum = onlyRole[0];
            const ranemoji = [":smiling_face_with_3_hearts:",":heart_eyes:",":star_struck:",":heart_eyes_cat:"];
            const rande = Math.floor(Math.random()*(ranemoji.length));
            var icon = oldMember.user.displayAvatarURL({dynamic: true});
            var name = `${oldMember.user.username}`;
            var name2 = `${oldMember.user}`;
            var role =`<@&${IDNum}>${(ranemoji[rande])}`;
                const embed = new EmbedBuilder()
                .setColor('#F43B3B')
                .setAuthor({name: name, iconURL: icon})
                .setDescription('ลบบทบาท ❌')
                .addFields(
                    { name: 'ชื่อผู้ใช้' , value: name2 ,inline: true},
                    { name: 'บทบาท', value: role ,inline: true }
                )
                .setTimestamp()
                client.channels.cache.get(cidR).send({
                embeds: [embed]
                })}
            
    })
};