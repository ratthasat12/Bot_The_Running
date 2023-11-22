const { EmbedBuilder, NewsChannel } = require("discord.js")
const { cidVC } = require('../config/FunctionConfig');
module.exports = (client) => {
  client.on('voiceStateUpdate', (oldState, newState) => {
    const guild = newState.guild;
    const channel = guild.channels.cache.get('1042651093458489394');
    
    if (channel) {
      const member = newState.member;
      const username = member.user.username;
    
      if (!oldState.channel && newState.channel) {
        // เมื่อสมาชิกเข้าห้อง Voice Chat
        channel.send(`${username} has joined the ${newState.channel}.`);
      } else if (oldState.channel && !newState.channel) {
        // เมื่อสมาชิกออกจากห้อง Voice Chat
        channel.send(`${username} has left the ${oldState.channel}.`);
      }
    }
  });
};