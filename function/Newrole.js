module.exports = (client) => {
    client.on('guildMemberAdd', (guildMember) => {
        const newMember = guildMember.guild.roles.cache.find(role => role.name === '🆕New');
        guildMember.roles.add(newMember);
     })
}