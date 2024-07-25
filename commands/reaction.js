// const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
// const emoji = require('../config/emojis.json')

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('reaction')
//         .setDescription('ClobNet Reaction Roles')
//         .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//         .addChannelOption(option =>
//             option.setName('channel')
//                 .setRequired(true)
//                 .addChannelTypes(ChannelType.GuildText)
//                 .setDescription('Channel to send verification to')),
//     async execute(interaction, client) {

//         const channel = interaction.options.getChannel('channel')

//         const embed = new EmbedBuilder()
//             .setTitle('ClobNet Reaction Roles')
//             .setDescription('Click the buttons below to assign your roles of choosing')
//             .setColor('#4CCDEA')

//         const row = new ActionRowBuilder().addComponents(
//             new ButtonBuilder()
//                 .setStyle(ButtonStyle.Primary)
//                 .setLabel('Announcement Ping')
//                 .setCustomId('role.announcement')
//                 .setEmoji('🔔'),
//             new ButtonBuilder()
//                 .setStyle(ButtonStyle.Primary)
//                 .setLabel('Giveaway Ping')
//                 .setCustomId('role.giveaway')
//                 .setEmoji('🎉'),
//         );

//         const row2 = new ActionRowBuilder().addComponents(
//             new ButtonBuilder()
//                 .setStyle(ButtonStyle.Primary)
//                 .setLabel('Event Ping')
//                 .setCustomId('role.event')
//                 .setEmoji('🕦'),
//             new ButtonBuilder()
//                 .setStyle(ButtonStyle.Primary)
//                 .setLabel('Sneak Peek Ping')
//                 .setCustomId('role.sneak')
//                 .setEmoji('📷'),
//         );

//         try {
//             await channel.send({ embeds: [embed], components: [row, row2] });
//         } catch {
//             return interaction.reply({ content: `${emoji.cross} I do not have permission to send in this channel...`, ephemeral: true })
//         }

//         return interaction.reply({ content: `${emoji.check} Successfully sent the embed!`, ephemeral: true })
//     }
// }