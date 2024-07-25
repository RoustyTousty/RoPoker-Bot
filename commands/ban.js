// const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
// const emoji = require('../config/emojis.json')
// const banSchema = require('../schemas/ban');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('ban')
//         .setDescription('Ban a user from ClobNets systems')
//         .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//         .addStringOption(option =>
//             option.setName('user')
//                 .setRequired(true)
//                 .setDescription('The users ID to ban'))
//         .addStringOption(option =>
//             option.setName('reason')
//                 .setRequired(true)
//                 .setDescription('Reason for the ban')),
//     async execute(interaction, client) {

//         await interaction.deferReply({ ephemeral: true })

//         const nembed = new EmbedBuilder()
//             .setTitle("EVAL").setColor('#4CCDEA')
//             .setDescription(`${emoji.cross} You dont have perms to use this command. Only Owner's can use this command`)
//             .setThumbnail(interaction.member.user.displayAvatarURL())

//         if (interaction.user.id !== '620549523697172511') return interaction.editReply({
//             embeds: [nembed]
//         });

//         const userID = interaction.options.getString("user")
//         const reason = interaction.options.getString("reason")
//         let user

//         try {
//             user = await client.users.fetch(userID);
//         } catch {
//             return interaction.editReply({
//                 content: `${emoji.cross} That is not a valid user ID`
//             });
//         }

//         const data = await banSchema.findOne({
//             _id: userID,
//         });

//         if (data) {
//             return interaction.editReply({ content: `${emoji.check} User already banned` });
//         }

//         const newData = new banSchema({
//             _id: userID,
//             username: user.username,
//             reason: reason,
//             date: new Date()
//         });
//         await newData.save();
//         return interaction.editReply({
//             content: `${emoji.check} Successfully banned @${user.username}`
//         });
//     }
// }