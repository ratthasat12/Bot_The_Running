const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require('ms');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder().setName('foods').setDescription("สุ่มอาหาร"),
    run: async ({ interaction }) => {
        const ranfood = ["กะเพรา","พริกแกง","สุกี้","ก๋วยเตี๋ยว","ส้มตำ","ไก่ย่าง"];
        const randrink = ["น้ำเปล่า","เป๊ปซี่","โค้ก","เบียร์","น้ำส้ม","เหล้า"];
        const rando = Math.floor(Math.random()*(ranfood.length));
        const randod = Math.floor(Math.random()*(randrink.length));
                await interaction.editReply({
            embeds: [new EmbedBuilder()
				.setTitle("กำลังสุ่ม")
                .setDescription(":hourglass_flowing_sand:")
                .setImage('https://cdn.discordapp.com/attachments/963515609855955005/1042182163006754857/box.gif')
                .setColor('0ed7ed')
                // .setFooter("ระบบสุ่มอาหาร")
                .setTimestamp()
			],
        })
                await wait(4000);
        return  await interaction.editReply({
            embeds: [new EmbedBuilder()
				.setTitle("สุ่มได้: ")
                .setDescription(":zany_face: ")
                .setThumbnail('https://cdn.discordapp.com/attachments/963515609855955005/1042202671869853816/food.png')
                .addFields(
                    { name: "อาหาร", value:`${(ranfood[rando])}`,inline: true},
                    { name: "เครื่องดื่ม", value:`${(randrink[randod])}`,inline: true}
                )
                .setColor('0ed7ed')
                // .setFooter("ระบบสุ่มอาหาร")
                .setTimestamp()
			],
        }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
    }
}
