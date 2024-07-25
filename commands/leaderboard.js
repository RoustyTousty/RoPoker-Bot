// const Levels = require('discord-xp');
// const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
// require('dotenv').config();
// const emoji = require('../config/emojis.json')

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('leaderboard')
//         .setDescription('See your server\'s rank leaderboard'),
//     async execute(interaction, client) {
//         await interaction.deferReply();

//         Levels.setURL(process.env.clobDBString);

//         const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 20);

//         const nolead = new EmbedBuilder()
//             .setColor('#4CCDEA')
//             .setDescription(`${emoji.cross} Nobody's in the leaderboard yet.`);

//         if (rawLeaderboard.length < 1) return interaction.editReply({ embeds: [nolead] });

//         const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
//         const totalPages = Math.min(Math.ceil(leaderboard.length / 5), 4);

//         let currentPage = 1;

//         const generateEmbed = (page) => {
//             const lb = leaderboard.slice((page - 1) * 5, page * 5).map(
//                 (e) => `**${e.position}.** @${e.username}\n> Level: **${e.level}**\n> XP: **${e.xp.toLocaleString()}**`,
//             );

//             return new EmbedBuilder()
//                 .setColor('#4CCDEA')
//                 .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
//                 .setTitle('Leaderboard')
//                 .setDescription(`${lb.join('\n\n')}`)
//                 .setFooter({
//                     text: `Page ${page}/${totalPages} | ClobNet Leaderboard`,
//                     iconURL: client.user.displayAvatarURL(),
//                 });
//         };

//         const initialEmbed = generateEmbed(currentPage);
//         const row = new ActionRowBuilder()
//             .addComponents(
//                 new ButtonBuilder()
//                     .setCustomId('previous')
//                     .setEmoji('◀')
//                     .setLabel('Previous Page')
//                     .setStyle(ButtonStyle.Primary),
//                 new ButtonBuilder()
//                     .setCustomId('next')
//                     .setEmoji('▶')
//                     .setLabel('Next Page')
//                     .setStyle(ButtonStyle.Primary),
//             );

//         const message = await interaction.editReply({ embeds: [initialEmbed], components: [row] });

//         const filter = (i) => i.user.id === interaction.user.id;

//         const collector = message.createMessageComponentCollector({ filter, time: 60000 });

//         collector.on('collect', async (i) => {
//             if (i.customId === 'previous') {
//                 currentPage--;
//             } else if (i.customId === 'next') {
//                 currentPage++;
//             }

//             if (currentPage < 1) {
//                 currentPage = totalPages;
//             } else if (currentPage > totalPages) {
//                 currentPage = 1;
//             }

//             const newEmbed = generateEmbed(currentPage);
//             await i.update({ embeds: [newEmbed] });
//         });

//         collector.on('end', () => {
//             row.components.forEach((c) => c.setDisabled(true));
//             message.edit({ components: [row] });
//         });
//     },
// };