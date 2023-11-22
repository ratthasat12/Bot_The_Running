module.exports = (client) => {
    const { Mid,Game,eGame,MINECRAFT,eMINECRAFT,PUBG,ePUBG } = require('../config/FunctionConfig')
    client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === Mid){
        if(reaction.emoji.name === eGame) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(Game)
            user.send('เพิ่มบทบาทแล้ว')
            }
     }
    if(reaction.message.id === Mid){
        if(reaction.emoji.name === eMINECRAFT) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(MINECRAFT)
            user.send('เพิ่มบทบาทแล้ว')
            }
     }
     if(reaction.message.id === Mid){
        if(reaction.emoji.name === ePUBG) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(PUBG)
            user.send('เพิ่มบทบาทแล้ว')
            }
     }
    })
    client.on('messageReactionRemove', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === Mid){
        if(reaction.emoji.name === eGame) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(Game)
            user.send('ลบบทบาทแล้ว')
        }
    }
    if(reaction.message.id === Mid){
        if(reaction.emoji.name === eMINECRAFT) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(MINECRAFT)
            user.send('ลบบทบาทแล้ว')
        }
    }
    if(reaction.message.id === Mid){
        if(reaction.emoji.name === ePUBG) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(PUBG)
            user.send('ลบบทบาทแล้ว')
        }
    }
    })
}