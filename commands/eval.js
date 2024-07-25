// const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
// const { inspect } = require("util");
// const emoji = require('../config/emojis.json')

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('eval')
//         .setDescription('You shouldn\'t be using this!')
//         .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//         .addStringOption(option =>
//             option.setName('code')
//                 .setRequired(true)
//                 .setDescription('wat r u doing')),
//     async execute(interaction, client) {

//         await interaction.deferReply({ ephemeral: true })

//         const nembed = new EmbedBuilder()
//             .setTitle("EVAL").setColor('#4CCDEA')
//             .setDescription(`${emoji.cross} You dont have perms to use this command. Only Owner's can use this command`)
//             .setThumbnail(interaction.member.user.displayAvatarURL())

//         if (interaction.user.id !== '620549523697172511') return interaction.editReply({
//             embeds: [nembed]
//         });

//         let toEval = interaction.options.getString("code")

//         if (toEval.includes('process.env') || toEval.includes('client.token') || toEval.includes('token')) {
//             const embed = new EmbedBuilder()
//                 .setTitle("EVAL")
//                 .setColor('#4CCDEA')
//                 .setDescription(`${emoji.cross} Error: \`You don't wanna do that!\``)
//                 .setThumbnail(interaction.member.user.displayAvatarURL());

//             return interaction.editReply({
//                 embeds: [embed]
//             });
//         }

//         try {
//             const embed = new EmbedBuilder()
//                 .setTitle("EVAL").setColor('#4CCDEA')
//                 .setDescription(`${emoji.cross} Error: \`Cannot evaluate nothing\``)
//                 .setThumbnail(interaction.member.user.displayAvatarURL())
//             let evaluated = inspect(eval(toEval, {
//                 depth: 0
//             }))
//             if (!toEval) return interaction.editReply({
//                 embeds: [embed]
//             });
//             const embed1 = new EmbedBuilder()
//                 .setTitle("EVAL").setColor('#4CCDEA')
//                 .setDescription(`${emoji.cross} Error: \`Request is too long.\``)
//                 .setThumbnail(interaction.member.user.displayAvatarURL())

//             if (evaluated.length > 1950) return interaction.editReply({
//                 embeds: [embed1]
//             });
//             let hrDiff = process.hrtime(process.hrtime());
//             const embed2 = new EmbedBuilder()
//                 .setTitle("EVAL").setColor('#4CCDEA')
//                 .setDescription(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``)
//                 .setThumbnail(interaction.member.user.displayAvatarURL())
//             interaction.editReply({
//                 embeds: [embed2]
//             })
//         } catch (e) {
//             interaction.editReply({
//                 content: `${emoji.cross} An error occurred : \`${e.message}\``
//             });
//         }

//     }
// }