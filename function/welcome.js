const { EmbedBuilder } = require("discord.js")
const { cidWA,cidWR } = require("../config/FunctionConfig")
module.exports = (client) => {
    client.on('guildMemberAdd', (member) => {
        console.log(member.user);
        const name = `${member.user}`;
        const jdate = `${member.joinedAt}`;
        const embed = new EmbedBuilder()
            .setTitle(`Welcome`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
            .setDescription('ยินดีต้อนรับ:airplane_arriving:')
            .addFields(
                { name: ':bust_in_silhouette:ชื่อผู้ใช้', value: name, inline: true},
                { name: ':calendar_spiral:เข้าร่วมเมื่อ', value: jdate, inline: true}
            )
            .setColor('#47FF22')
            .setImage('https://cdn.discordapp.com/attachments/1176513213572059147/1176513279040946296/final_639679c5714ea900259dcfee_295868.gif?ex=656f2460&is=655caf60&hm=64d9eebb428756639cece583426947e89efe1f0c5e39cff6a59424bf8496f2f1&')
            .setTimestamp()
            
            member.guild.channels.cache.get(cidWA).send({
                embeds: [embed]
            })
    })
    client.on('guildMemberRemove', (member) => {
        console.log(member.user);
        const embed = new EmbedBuilder()
            .setTitle(`Goodbye`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
            .setDescription(`${member.user} ออกจากเซิร์ฟเวอร์แล้ว:airplane_departure: `)
            .setColor('#EE0909')
            .setTimestamp()
            
            member.guild.channels.cache.get(cidWR).send({
                embeds: [embed]
            })
    })
}