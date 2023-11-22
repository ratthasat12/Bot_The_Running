const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("โหลดเพลงจาก Youtube")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("เล่นเพลงจาก url")
				.addStringOption((option) => option.setName("url").setDescription("Url เพลง").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("เล่นเพลย์ลิสต์เพลงจาก url")
				.addStringOption((option) => option.setName("url").setDescription("url เพลย์ลิสต์").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("ค้นหาเพลงจากชื่อเพลง")
				.addStringOption((option) =>
					option.setName("searchterms").setDescription("ชื่อเพลงที่ต้องการจะให้บอทเล่น").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {
        const img = 'https://cdn.discordapp.com/attachments/963515609855955005/1051676858086850620/final_639679c5714ea900259dcfee_199219.gif';                                          //รูป
		if (!interaction.member.voice.channel) return interaction.editReply("ต้องเข้าห้องเสียงก่อนที่จะใช้คำสั่ง").then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.SPOTIFY_SONG
            })
            if (result.tracks.length === 0)
                return interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setColor('#F13232')
                        .setDescription('ไม่พบเพลง :x:')
                    ],
                }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setColor('#188BF3')
                .setDescription(`**[${song.title}](${song.url})** ได้ถูกเพิ่มลงในคิวเพลงแล้ว`)
                .setThumbnail(song.thumbnail)
                .setImage(img)
                .setFooter({ text: `เวลาในการเล่นเพลง: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setColor('#F13232')
                        .setDescription('ไม่พบเพลย์ลิสต์นี้ :x:')
                    ],
                }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setColor('#188BF3')
                .setDescription(`**${result.tracks.length} เพลง [${playlist.title}](${playlist.url})** ได้ถูกเพิ่มลงในคิวเพลงแล้ว`)
                .setImage(img)
                .setThumbnail(playlist.thumbnail)
		} else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setColor('#F13232')
                        .setDescription('ไม่มีพบเพลง :x:')
                    ],
                }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setColor('#188BF3')
                .setDescription(`**[${song.title}](${song.url})** ได้ถูกเพิ่มลงในคิวเพลงแล้ว`)
                .setThumbnail(song.thumbnail)
                .setImage(img)
                .setFooter({ text: `เวลาในการเล่นเพลง: ${song.duration}`})
		}
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        }).then((msg) => {setTimeout(() => msg.delete(), ms('30 second'))})
	},
}
