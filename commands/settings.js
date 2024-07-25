// const {
//     ActionRowBuilder,
//     ButtonBuilder,
//     EmbedBuilder,
//     ButtonStyle,
//     ChannelSelectMenuBuilder,
//     ChannelType,
//     StringSelectMenuBuilder,
//     AttachmentBuilder,
//     ModalBuilder,
//     TextInputBuilder,
//     TextInputStyle,
//     RoleSelectMenuBuilder,
//     SlashCommandBuilder,
//     PermissionFlagsBits
// } = require('discord.js');
// const emoji = require('../config/emojis.json')
// const serverSchema = require('../schemas/server');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('settings')
//         .setDescription('ClobNet Settings')
//         .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
//     async execute(interaction, client) {

//         await interaction.deferReply({ ephemeral: true })

//         /* fetch server database */
//         let data = await serverSchema.findOne({
//             _id: interaction.guild.id,
//         });

//         if (data) {

//             const collector = interaction.channel.createMessageComponentCollector({ time: 300000, idle: 300000 });

//             const embed = new EmbedBuilder()
//                 .setTitle('ClobNet Settings Dashboard')
//                 .setColor('#4CCDEA')
//                 .setImage('https://i.imgur.com/Rj4K0AM.png')
//                 .addFields(
//                     {
//                         name: '__Verification__',
//                         value: `${data.settings.verification.channel ? `${emoji.check} <#${data.settings.verification.channel}>` : `${emoji.cross} \`Not Set\``}
//                         ${data.settings.verification.role ? `${emoji.check} <@&${data.settings.verification.role}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                     {
//                         name: '__Suggestions__',
//                         value: `${data.settings.suggestion.channel ? `${emoji.check} <#${data.settings.suggestion.channel}>` : `${emoji.cross} \`Not Set\``}
//                         ${data.settings.suggestion.logs ? `${emoji.check} <#${data.settings.suggestion.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                     {
//                         name: '__Bug Reports__',
//                         value: `${data.settings.bugreports.channel ? `${emoji.check} <#${data.settings.bugreports.channel}>` : `${emoji.cross} \`Not Set\``}
//                         ${data.settings.bugreports.logs ? `${emoji.check} <#${data.settings.bugreports.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                     {
//                         name: '__Tickets__',
//                         value: `${data.settings.ticket.channel ? `${emoji.check} <#${data.settings.ticket.channel}>` : `${emoji.cross} \`Not Set\``}
//                         ${data.settings.ticket.logs ? `${emoji.check} <#${data.settings.ticket.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                     {
//                         name: '__Applications__',
//                         value: `${data.settings.application.channel ? `${emoji.check} <#${data.settings.application.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                     {
//                         name: '__Nickname__',
//                         value: `${data.settings.nickname.channel ? `${emoji.check} <#${data.settings.nickname.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                     {
//                         name: '__Counter__',
//                         value: `${data.settings.counter.channel ? `${emoji.check} <#${data.settings.counter.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                     {
//                         name: '__XP__',
//                         value: `${data.settings.xp.channel ? `${emoji.check} <#${data.settings.xp.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                     {
//                         name: '__Welcomer__',
//                         value: `${data.settings.welcome.channel ? `${emoji.check} <#${data.settings.welcome.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                         inline: true,
//                     },
//                 )

//             const row = new ActionRowBuilder().addComponents(
//                 new ButtonBuilder()
//                     .setStyle(ButtonStyle.Primary)
//                     .setLabel('Edit Channels')
//                     .setCustomId('settings-edit')
//                     .setEmoji('⚙️')
//             );

//             await interaction.editReply({ embeds: [embed], components: [row] })

//             collector.on('collect', async (i) => {
//                 const Embed = i.message.embeds[0];

//                 if (i.customId === 'settings-edit') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('Verification')
//                             .setCustomId('settings.verification')
//                             .setEmoji(emoji.check),
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('Suggestions')
//                             .setCustomId('settings.suggestion')
//                             .setEmoji(emoji.paper),
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('Bug Reports')
//                             .setCustomId('settings.bugreports')
//                             .setEmoji(emoji.banana),
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('Tickets')
//                             .setCustomId('settings.ticket')
//                             .setEmoji(emoji.envelope),
//                     )

//                     const row2 = new ActionRowBuilder().addComponents(

//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('Applications')
//                             .setCustomId('settings.application')
//                             .setEmoji(emoji.arrowup),
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('Nickname')
//                             .setCustomId('settings.nickname')
//                             .setEmoji(emoji.pencil),
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('Counter')
//                             .setCustomId('settings.counter')
//                             .setEmoji(emoji.counter),
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('XP')
//                             .setCustomId('settings.xp')
//                             .setEmoji(emoji.xp),
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Primary)
//                             .setLabel('Welcomer')
//                             .setCustomId('settings.welcome')
//                             .setEmoji(emoji.welcomer),
//                     )


//                     await i.update({ components: [row, row2] });
//                 }

//                 if (i.customId === 'settings.verification') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('verification.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const row2 = new ActionRowBuilder().addComponents(
//                         new RoleSelectMenuBuilder()
//                             .setCustomId('verification.role')
//                             .setPlaceholder('Select A Role'),
//                     );

//                     const row3 = new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Success)
//                             .setLabel('Send Embed')
//                             .setCustomId('verify-embed')
//                             .setEmoji(emoji.check)
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet Verification Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.verification.channel ? `${emoji.check} <#${data.settings.verification.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Role__',
//                                 value: `${data.settings.verification.role ? `${emoji.check} <@&${data.settings.verification.role}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row, row2, row3] });
//                 }

//                 if (i.customId === 'settings.suggestion') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('suggestion.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const row2 = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('suggestion.log.channel')
//                             .setPlaceholder('Select A Log Channel'),
//                     );

//                     const row3 = new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Success)
//                             .setLabel('Send Embed')
//                             .setCustomId('suggestion-embed')
//                             .setEmoji(emoji.check)
//                     );


//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet Suggestion Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.suggestion.channel ? `${emoji.check} <#${data.settings.suggestion.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${data.settings.suggestion.logs ? `${emoji.check} <#${data.settings.suggestion.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row, row2, row3] });
//                 }

//                 if (i.customId === 'settings.bugreports') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('bugreports.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const row2 = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('bugreports.log.channel')
//                             .setPlaceholder('Select A Log Channel'),
//                     );

//                     const row3 = new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Success)
//                             .setLabel('Send Embed')
//                             .setCustomId('bug-embed')
//                             .setEmoji(emoji.check)
//                     );


//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet Bug Report Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.bugreports.channel ? `${emoji.check} <#${data.settings.bugreports.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${data.settings.bugreports.logs ? `${emoji.check} <#${data.settings.bugreports.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row, row2, row3] });
//                 }

//                 if (i.customId === 'settings.ticket') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('ticket.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const row2 = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('ticket.log.channel')
//                             .setPlaceholder('Select A Log Channel'),
//                     );

//                     const row3 = new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Success)
//                             .setLabel('Send Embed')
//                             .setCustomId('ticket-embed')
//                             .setEmoji(emoji.check)
//                     );


//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet Tickets Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.ticket.channel ? `${emoji.check} <#${data.settings.ticket.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${data.settings.ticket.logs ? `${emoji.check} <#${data.settings.ticket.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row, row2, row3] });
//                 }

//                 if (i.customId === 'settings.application') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('application.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const row2 = new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Success)
//                             .setLabel('Send Embed')
//                             .setCustomId('application-embed')
//                             .setEmoji(emoji.check)
//                     );


//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet Applications Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.application.channel ? `${emoji.check} <#${data.settings.application.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row, row2] });
//                 }

//                 if (i.customId === 'settings.nickname') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('nickname.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const row2 = new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Success)
//                             .setLabel('Send Embed')
//                             .setCustomId('nickname-embed')
//                             .setEmoji(emoji.check)
//                     );


//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet Nickname Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.nickname.channel ? `${emoji.check} <#${data.settings.nickname.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row, row2] });
//                 }

//                 if (i.customId === 'settings.welcome') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('welcome.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet Welcomer Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.welcome.channel ? `${emoji.check} <#${data.settings.welcome.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row] });
//                 }

//                 if (i.customId === 'settings.counter') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('counter.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const row2 = new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setStyle(ButtonStyle.Success)
//                             .setLabel('Send Embed')
//                             .setCustomId('counter-embed')
//                             .setEmoji(emoji.check)
//                     );


//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet Counter Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.counter.channel ? `${emoji.check} <#${data.settings.counter.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row, row2] });
//                 }

//                 if (i.customId === 'settings.xp') {

//                     const row = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('xp.channel')
//                             .setPlaceholder('Select A Channel'),
//                     );

//                     const row2 = new ActionRowBuilder().addComponents(
//                         new ChannelSelectMenuBuilder()
//                             .setChannelTypes([ChannelType.GuildText, ChannelType.PublicThread])
//                             .setCustomId('xp.ignored')
//                             .setMaxValues(25)
//                             .setPlaceholder('Select Ignored Channels'),
//                     );

//                     const row3 = new ActionRowBuilder().addComponents(
//                         new StringSelectMenuBuilder()
//                             .setCustomId('xp.multiplier')
//                             .setPlaceholder('Select A Multiplier')
//                             .setOptions(
//                                 { label: '5', value: '5' },
//                                 { label: '10', value: '10' },
//                                 { label: '15', value: '15' },
//                                 { label: '20', value: '20' },
//                                 { label: '25', value: '25' },
//                                 { label: '30', value: '30' },
//                                 { label: '35', value: '35' },
//                                 { label: '40', value: '40' },
//                                 { label: '45', value: '45' },
//                                 { label: '50', value: '50' },
//                                 { label: '55', value: '55' },
//                                 { label: '60', value: '60' },
//                                 { label: '65', value: '65' },
//                                 { label: '70', value: '70' },
//                                 { label: '75', value: '75' },
//                                 { label: '80', value: '80' },
//                                 { label: '85', value: '85' },
//                                 { label: '90', value: '90' },
//                                 { label: '95', value: '95' },
//                                 { label: '100', value: '100' },
//                                 { label: '105', value: '105' },
//                                 { label: '110', value: '110' },
//                                 { label: '115', value: '115' },
//                                 { label: '120', value: '120' },
//                                 { label: '125', value: '125' },
//                             )
//                             .setMaxValues(1),
//                     );

//                     let ignoredChannelsString = data.settings.xp.ignoredChannels.map(channel => `${emoji.check} <#${channel}>`).join('\n');

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .setTitle('ClobNet XP Dashboard')
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.xp.channel ? `${emoji.check} <#${data.settings.xp.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Ignored Channels__',
//                                 value: data.settings.xp.ignoredChannels.length > 0 ? ignoredChannelsString : `${emoji.cross} \`Not Set\``,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Multiplier__',
//                                 value: data.settings.xp.multiplier ? `\`${data.settings.xp.multiplier}\`` : `\`Not Set\``,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed], components: [row, row2, row3] });
//                 }

//                 // --------------------------------------------------------------------------------------------

//                 if (i.customId === 'verification.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.verification.channel': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Role__',
//                                 value: `${data.settings.verification.role ? `${emoji.check} <@&${data.settings.verification.role}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'verification.role') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const role = i.values[0];

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.verification.role': role,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.verification.channel ? `${emoji.check} <#${data.settings.verification.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Role__',
//                                 value: `${emoji.check} <@&${role}>`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 // --------------------------------------------------------------------------------------------

//                 if (i.customId === 'suggestion.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.suggestion.channel': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${data.settings.suggestion.logs ? `${emoji.check} <#${data.settings.suggestion.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'suggestion.log.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.suggestion.logs': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.suggestion.channel ? `${emoji.check} <#${data.settings.suggestion.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 // --------------------------------------------------------------------------------------------

//                 if (i.customId === 'bugreports.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.bugreports.channel': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${data.settings.bugreports.logs ? `${emoji.check} <#${data.settings.bugreports.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'bugreports.log.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.bugreports.logs': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.bugreports.channel ? `${emoji.check} <#${data.settings.bugreports.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 // --------------------------------------------------------------------------------------------

//                 if (i.customId === 'ticket.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.ticket.channel': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${data.settings.ticket.logs ? `${emoji.check} <#${data.settings.ticket.logs}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'ticket.log.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.ticket.logs': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${data.settings.ticket.channel ? `${emoji.check} <#${data.settings.ticket.channel}>` : `${emoji.cross} \`Not Set\``}`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Log Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 // --------------------------------------------------------------------------------------------

//                 if (i.customId === 'application.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.application.channel': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 // --------------------------------------------------------------------------------------------

//                 if (i.customId === 'nickname.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.nickname.channel': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'welcome.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.welcome.channel': chx,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'counter.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.counter.channel': chx,
//                             'settings.counter.nextNumber': 1,
//                             'settings.counter.LastUser': null,
//                         },
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'xp.channel') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values[0];

//                     const channel = await client.channels.cache.get(chx);
//                     if (
//                         !channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages', 'EmbedLinks'])
//                     ) {
//                         return i.reply({
//                             content: `${emoji.cross} I don't have permissions to speak or send embeds in that channel.`,
//                             ephemeral: true,
//                         });
//                     }

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.xp.channel': chx,
//                         },
//                     );

//                     let ignoredChannelsString = data.settings.xp.ignoredChannels.map(channel => `${emoji.check} <#${channel}>`).join('\n');

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(0, 10)
//                         .addFields(
//                             {
//                                 name: '__Channel__',
//                                 value: `${emoji.check} <#${chx}>`,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Ignored Channels__',
//                                 value: data.settings.xp.ignoredChannels.length > 0 ? ignoredChannelsString : `${emoji.cross} \`Not Set\``,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Multiplier__',
//                                 value: `\`${data.settings.xp.multiplier}\`` || `\`Not Set\``,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'xp.ignored') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const chx = i.values;

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.xp.ignoredChannels': chx,
//                         },
//                         { upsert: true }
//                     );

//                     let ignoredChannelsString = chx.map(channel => `${emoji.check} <#${channel}>`).join('\n');

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(1, 10)
//                         .addFields(
//                             {
//                                 name: '__Ignored Channels__',
//                                 value: data.settings.xp.ignoredChannels.length > 0 ? ignoredChannelsString : `${emoji.cross} \`Not Set\``,
//                                 inline: true,
//                             },
//                             {
//                                 name: '__Multiplier__',
//                                 value: `\`${data.settings.xp.multiplier}\`` || `\`Not Set\``,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 if (i.customId === 'xp.multiplier') {

//                     data = await serverSchema.findOne({
//                         _id: interaction.guild.id,
//                     });

//                     const multi = Number(i.values[0]);

//                     await serverSchema.findOneAndUpdate(
//                         {
//                             _id: interaction.guild.id,
//                         },
//                         {
//                             'settings.xp.multiplier': multi,
//                         }
//                     );

//                     const newEmbed = EmbedBuilder.from(Embed)
//                         .spliceFields(2, 10)
//                         .addFields(
//                             {
//                                 name: '__Multiplier__',
//                                 value: `\`${multi}\``,
//                                 inline: true,
//                             },
//                         )

//                     await i.update({ embeds: [newEmbed] });
//                 }

//                 // --------------------------------------------------------------------------------------------

//                 if (i.customId === 'verify-embed') {

//                     data = await serverSchema.findOne({
//                         _id: i.guild.id,
//                     });

//                     if (data.settings.verification.channel) {

//                         const channel = await client.channels.cache.get(data.settings.verification.channel);

//                         const embed = new EmbedBuilder()
//                             .setTitle('Welcome to ClobNet!')
//                             .setDescription('Click the button below to gain access to the server!')
//                             .setColor('#4CCDEA')
//                             .setImage('https://i.imgur.com/Rj4K0AM.png')

//                         const row = new ActionRowBuilder().addComponents(
//                             new ButtonBuilder()
//                                 .setStyle(ButtonStyle.Primary)
//                                 .setLabel('Verify')
//                                 .setCustomId('verify-button')
//                                 .setEmoji(emoji.check)
//                         );

//                         try {
//                             await channel.send({ embeds: [embed], components: [row] });
//                         } catch {
//                             return i.reply({ content: `${emoji.cross} I do not have permission to send in that channel...`, ephemeral: true })
//                         }

//                         return i.reply({ content: `${emoji.check} Successfully sent the embed!`, ephemeral: true })

//                     }

//                     await i.reply({
//                         content: `${emoji.cross} You don't have a set verification channel.`,
//                         ephemeral: true,
//                     });

//                     return collector.stop()
//                 }

//                 if (i.customId === 'suggestion-embed') {

//                     data = await serverSchema.findOne({
//                         _id: i.guild.id,
//                     });

//                     if (data.settings.suggestion.channel) {

//                         const channel = await client.channels.cache.get(data.settings.suggestion.channel);

//                         const embed = new EmbedBuilder()
//                             .setColor('#4CCDEA')
//                             .setImage('https://i.imgur.com/Rj4K0AM.png')

//                         const embed2 = new EmbedBuilder()
//                             .setTitle('ClobNet Suggestions')
//                             .setDescription('Send messages in that channel to send a suggestion\n\nAll suggestions for the server are greatly appreciated!')
//                             .setColor('#4CCDEA')

//                         try {
//                             await channel.send({ embeds: [embed, embed2] });
//                         } catch {
//                             return i.reply({ content: `${emoji.cross} I do not have permission to send in that channel...`, ephemeral: true })
//                         }

//                         return i.reply({ content: `${emoji.check} Successfully sent the embed!`, ephemeral: true })

//                     }

//                     await i.reply({
//                         content: `${emoji.cross} You don't have a set suggestions channel.`,
//                         ephemeral: true,
//                     });

//                     return collector.stop()
//                 }

//                 if (i.customId === 'bug-embed') {

//                     data = await serverSchema.findOne({
//                         _id: i.guild.id,
//                     });

//                     if (data.settings.bugreports.channel) {

//                         const channel = await client.channels.cache.get(data.settings.bugreports.channel);

//                         const embed = new EmbedBuilder()
//                             .setColor('#4CCDEA')
//                             .setImage('https://i.imgur.com/Rj4K0AM.png')

//                         const embed2 = new EmbedBuilder()
//                             .setTitle('ClobNet Bug Reports')
//                             .setDescription('Send messages in that channel to report bugs.\n\nTry to include screenshots of the issue and the team will get it resolved as soon as possible.')
//                             .setColor('#4CCDEA')

//                         try {
//                             await channel.send({ embeds: [embed, embed2] });
//                         } catch {
//                             return i.reply({ content: `${emoji.cross} I do not have permission to send in that channel...`, ephemeral: true })
//                         }

//                         return i.reply({ content: `${emoji.check} Successfully sent the embed!`, ephemeral: true })

//                     }

//                     await i.reply({
//                         content: `${emoji.cross}You don't have a set bug reports channel.`,
//                         ephemeral: true,
//                     });

//                     return collector.stop()
//                 }

//                 if (i.customId === 'ticket-embed') {

//                     data = await serverSchema.findOne({
//                         _id: i.guild.id,
//                     });

//                     if (data.settings.ticket.channel) {

//                         const channel = await client.channels.cache.get(data.settings.ticket.channel);

//                         const embed = new EmbedBuilder()
//                             .setColor('#4CCDEA')
//                             .setImage('https://i.imgur.com/Rj4K0AM.png')

//                         const embed2 = new EmbedBuilder()
//                             .setTitle(`Open a Support ticket!`)
//                             .setDescription('Click on the button below and a ticket will be created')
//                             .setColor('#4CCDEA')


//                         const row = new ActionRowBuilder().addComponents(
//                             new ButtonBuilder()
//                                 .setCustomId('ticket')
//                                 .setLabel('Open a ticket')
//                                 .setEmoji(emoji.envelope)
//                                 .setStyle(ButtonStyle.Primary),
//                         );

//                         try {
//                             await channel.send({ embeds: [embed, embed2], components: [row] });
//                         } catch {
//                             return i.reply({ content: `${emoji.cross} I do not have permission to send in that channel...`, ephemeral: true })
//                         }

//                         return i.reply({ content: `${emoji.check} Successfully sent the embed!`, ephemeral: true })

//                     }

//                     await i.reply({
//                         content: `${emoji.cross} You don't have a set tickets channel.`,
//                         ephemeral: true,
//                     });

//                     return collector.stop()
//                 }

//                 if (i.customId === 'application-embed') {

//                     data = await serverSchema.findOne({
//                         _id: i.guild.id,
//                     });

//                     if (data.settings.application.channel) {

//                         const channel = await client.channels.cache.get(data.settings.application.channel);

//                         const embed = new EmbedBuilder()
//                             .setColor('#4CCDEA')
//                             .setImage('https://i.imgur.com/Rj4K0AM.png')

//                         const embed2 = new EmbedBuilder()
//                             .setTitle('ClobNet Applications')
//                             .setDescription('ClobNet is always eager to grow our team. If you\'re interested in joining us, please submit an application!\n\n**Requirements**\n• Applicants must be at least 16 years old.\n• A minimum commitment of 10 hours of in-game playtime per month is required.\n• A clean record is necessary, with no mutes or bans in the last 90 days, including both in-game and on Discord.\n• Proficiency in written English and strong communication skills are essential.')
//                             .setColor('#4CCDEA')

//                         const row = new ActionRowBuilder().addComponents(
//                             new ButtonBuilder()
//                                 .setStyle(ButtonStyle.Link)
//                                 .setLabel('Creative Team')
//                                 .setURL('https://clobnet.org/apply/team')
//                                 .setEmoji('🖌️'),
//                             new ButtonBuilder()
//                                 .setStyle(ButtonStyle.Link)
//                                 .setLabel('Moderation Team')
//                                 .setURL('https://clobnet.org/apply/mod')
//                                 .setEmoji('🤝'),
//                             new ButtonBuilder()
//                                 .setStyle(ButtonStyle.Link)
//                                 .setLabel('Development Team')
//                                 .setURL('https://clobnet.org/apply/developer')
//                                 .setEmoji('👾')
//                         );

//                         try {
//                             await channel.send({ embeds: [embed, embed2], components: [row] });
//                         } catch (err) {
//                             console.log(err)
//                             return i.reply({ content: `${emoji.cross} I do not have permission to send in that channel...`, ephemeral: true })
//                         }

//                         return i.reply({ content: `${emoji.check} Successfully sent the embed!`, ephemeral: true })

//                     }

//                     await i.reply({
//                         content: `${emoji.cross} You don't have a set applications channel.`,
//                         ephemeral: true,
//                     });

//                     return collector.stop()
//                 }

//                 if (i.customId === 'nickname-embed') {

//                     data = await serverSchema.findOne({
//                         _id: i.guild.id,
//                     });

//                     if (data.settings.nickname.channel) {

//                         const channel = await client.channels.cache.get(data.settings.nickname.channel);

//                         const embed = new EmbedBuilder()
//                             .setColor('#4CCDEA')
//                             .setImage('https://i.imgur.com/Rj4K0AM.png')

//                         const embed2 = new EmbedBuilder()
//                             .setTitle('Nickname Change')
//                             .setDescription('**Type in that channel to set your nickname**\n\nPlease only use English in your nickname\nDo not use any harmful, vulgur or inappropriate language as your nickname\n\nSeen breaking these rules your nickname will be changed and potential punishments may occur.')
//                             .setColor('#4CCDEA')

//                         try {
//                             await channel.send({ embeds: [embed, embed2] });
//                         } catch {
//                             return i.reply({ content: `${emoji.cross} I do not have permission to send in that channel...`, ephemeral: true })
//                         }

//                         return i.reply({ content: `${emoji.check} Successfully sent the embed!`, ephemeral: true })

//                     }

//                     await i.reply({
//                         content: `${emoji.cross} You don't have a set nickname channel.`,
//                         ephemeral: true,
//                     });

//                     return collector.stop()
//                 }

//                 if (i.customId === 'counter-embed') {

//                     data = await serverSchema.findOne({
//                         _id: i.guild.id,
//                     });

//                     if (data.settings.counter.channel) {

//                         const channel = await client.channels.cache.get(data.settings.counter.channel);

//                         const embed = new EmbedBuilder()
//                             .setColor('#4CCDEA')
//                             .setImage('https://i.imgur.com/Rj4K0AM.png')

//                         const embed2 = new EmbedBuilder()
//                             .setTitle('🔢 Counting System')
//                             .setDescription('The counting system has been set up. Start at 1!')
//                             .setColor('#4CCDEA')

//                         try {
//                             await channel.send({ embeds: [embed, embed2] });
//                         } catch {
//                             return i.reply({ content: `${emoji.cross} I do not have permission to send in that channel...`, ephemeral: true })
//                         }

//                         return i.reply({ content: `${emoji.check} Successfully sent the embed!`, ephemeral: true })

//                     }

//                     await i.reply({
//                         content: `${emoji.cross} You don't have a set counter channel.`,
//                         ephemeral: true,
//                     });

//                     return collector.stop()
//                 }

//             })

//             collector.on("end", collected => {
//                 if (collected.first()) {
//                     collected.first().editReply({ components: [] })
//                 }
//             });
//         } else {
//             const newData = await new serverSchema({
//                 _id: interaction.guild.id,
//                 name: interaction.guild.name,
//             })
//             await newData.save()

//             return interaction.editReply({ content: 'Created Database' })

//         }
//     }
// }