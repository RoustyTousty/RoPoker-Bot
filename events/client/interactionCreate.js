const { EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder } = require('discord.js');
const serverSchema = require('../../schemas/server');
const emoji = require('../../config/emojis.json')
const reaction = require('../../config/reaction-roles.json')
const sourcebin = require('sourcebin_js');
const moment = require('moment');
const { data } = require('../../commands/leaderboard');
const fs = require('fs');
const banSchema = require('../../schemas/ban');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        const banData = await banSchema.findOne({
            _id: interaction.user.id,
        });

        if (interaction.isChatInputCommand()) {
            /* Command Execution */
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                return;
            }

            if (banData) {
                return interaction.reply({
                    content: `${emoji.cross} You are banned from using ClobNets commands`,
                    ephemeral: true
                })
            }

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                return interaction.editReply({
                    content: `${emoji.cross} Something went wrong while executing command...`,
                    ephemeral: true
                })
            }
        }

        let data = await serverSchema.findOne({
            _id: interaction.guild.id,
        });

        const rolesData = fs.readFileSync('./config/roles.json');
        const rolesMap = JSON.parse(rolesData).roles;

        const adminRole = Object.values(rolesMap).find(role => role.name === 'Admin');
        const adminId = Object.keys(rolesMap).find(key => rolesMap[key] === adminRole);

        const modRole = Object.values(rolesMap).find(role => role.name === 'Mod');
        const modId = Object.keys(rolesMap).find(key => rolesMap[key] === modRole);

        const managerRole = Object.values(rolesMap).find(role => role.name === 'Manager');
        const managerId = Object.keys(rolesMap).find(key => rolesMap[key] === managerRole);

        if (interaction.isButton()) {

            if (banData) {
                return interaction.reply({
                    content: `${emoji.cross} You are banned from using ClobNets buttons`,
                    ephemeral: true
                })
            }

            /* Verification System */

            if (interaction.customId === 'verify-button') {

                await interaction.deferReply({ ephemeral: true })

                if (interaction.member.roles.cache.find(role => role.id === data.settings.verification.role)) {
                    return interaction.editReply({ content: `${emoji.cross} You already have the role setup for the verification system.` })
                }

                try {
                    await interaction.member.roles.add(data.settings.verification.role)
                    return interaction.editReply({ content: `${emoji.check} Successfully verified!`, ephemeral: true })
                } catch {
                    return interaction.editReply({ content: `${emoji.cross} I dont have permission to give you the role.`, ephemeral: true })
                }

            }

            /* Bug Report System */

            if (interaction.customId == 'rep-complete') {
                const Embed = interaction.message.embeds[0]
                Embed.fields[1] = { name: "__Status__", value: "Resolved", inline: true }
                interaction.message.edit({ embeds: [EmbedBuilder.from(Embed).setColor("Green")] })
                interaction.reply({ content: 'Report Marked As Resolved.', ephemeral: true })
            }

            /* Suggestion System */

            if (interaction.customId == 'sug-accept') {
                const Embed = interaction.message.embeds[0]
                Embed.fields[1] = { name: "__Status__", value: "Accepted", inline: true }
                interaction.message.edit({ embeds: [EmbedBuilder.from(Embed).setColor("Green")] })
                interaction.reply({ content: 'Suggestion Accepted', ephemeral: true })
            }
            if (interaction.customId == 'sug-decline') {
                const Embed = interaction.message.embeds[0]
                Embed.fields[1] = { name: "__Status__", value: "Declined", inline: true }
                interaction.message.edit({ embeds: [EmbedBuilder.from(Embed).setColor("Red")] })
                interaction.reply({ content: 'Suggestion Declined', ephemeral: true })
            }

            /* Rubbish Bin */

            if (interaction.customId == 'rubbish') {
                interaction.message.delete()
            }

            /* ticket system */

            if (interaction.customId === 'ticket') {

                if (interaction.guild.channels.cache.find(c => c.name.toLowerCase() === `ticket-${interaction.user.username}`)) return interaction.reply({ content: `You already have an open ticket`, ephemeral: true })
                interaction.guild.channels.create({
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ['SendMessages', 'ViewChannel'],
                        },
                        {
                            id: client.user.id,
                            allow: ['SendMessages', 'ViewChannel'],
                        },
                        {
                            id: adminId,
                            allow: ['SendMessages', 'ViewChannel'],
                        },
                        {
                            id: modId,
                            allow: ['SendMessages', 'ViewChannel'],
                        },
                        {
                            id: managerId,
                            allow: ['SendMessages', 'ViewChannel'],
                        },
                        {
                            id: interaction.message.guild.roles.everyone,
                            deny: ['ViewChannel'],
                        },
                    ],
                    parent: data.settings.ticket.openParent,
                    name: `ticket-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                }).then(async (channel) => {

                    const embed = new EmbedBuilder()
                        .setTitle(`New Ticket`)
                        .setDescription(`Welcome to your ticket ${interaction.user}\n\nThank you for making a ticket! Someone will be with you shortly. In the mean time, please describe your issue so our support team can get straight to helping you!`)
                        .setColor('#4CCDEA')

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("ticketClose")
                                .setLabel("Close ticket")
                                .setEmoji(emoji.cross)
                                .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                                .setCustomId("ticketTranscript")
                                .setLabel("Transcript")
                                .setEmoji(emoji.pencil)
                                .setStyle(ButtonStyle.Primary)
                        );

                    interaction.reply({ content: `Sent your ticket in ${channel}`, ephemeral: true })
                    channel.send({ embeds: [embed], components: [row] })
                })
            }
            if (interaction.customId == 'ticketClose') {
                const channel = interaction.channel
                const chx = client.channels.cache.get(data.settings.ticket.logs)

                channel.messages.fetch().then(async (messages) => {
                    const arr = messages.reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.username}: ${m.attachments.size > 0 ? m.attachments.first().url : m.content ? m.content : m.embeds[0] ? 'Message Embed' : 'No Content'}`)
                    const output = arr.join('\n')

                    let response;
                    try {
                        response = await sourcebin.create([
                            {
                                name: ' ',
                                content: output,
                                languageId: 'text',
                            },
                        ], {
                            title: `Chat transcript for ${channel.name}`,
                            description: ' ',
                        });
                    }
                    catch (e) {
                        return console.log(e)
                    }

                    const embed = new EmbedBuilder()
                        .setDescription(`[\`📄 View\`](${response.url})`)
                        .setColor('#4CCDEA');
                    chx.send({ content: `Heres ${channel.name.replace(/^ticket-/i, '')}'s latest ticket transcript!`, embeds: [embed] });

                    const replyEmbed = new EmbedBuilder()
                        .setDescription(`Ticket Closed by ${interaction.user}`)
                        .setColor('#FF5555');

                        interaction.reply({embeds: [replyEmbed]})

                    return channel.setParent(data.settings.ticket.closeParent)
                })
            }

            if (interaction.customId == 'ticketTranscript') {
                const channel = interaction.channel
                interaction.channel.messages.fetch().then(async (messages) => {
                    const arr = messages.reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.username}: ${m.attachments.size > 0 ? m.attachments.first().url : m.content ? m.content : m.embeds[0] ? 'Message Embed' : 'No Content'}`)
                    const output = arr.join('\n')

                    let response;
                    try {
                        response = await sourcebin.create([
                            {
                                name: ' ',
                                content: output,
                                languageId: 'text',
                            },
                        ], {
                            title: `Chat transcript for ${channel.name}`,
                            description: ' ',
                        });
                    }
                    catch (e) {
                        return interaction.reply({ content: `${emoji.cross} An error occurred, please try again!` });
                    }

                    const embed = new EmbedBuilder()
                        .setDescription(`[\`📄 View\`](${response.url})`)
                        .setColor('#4CCDEA');
                    interaction.reply({ content: `${emoji.check} The transcript is complete. Please click the link below to view the transcript`, embeds: [embed] });
                })
            }

            if (interaction.customId === 'mod-application') {
                const modal = new ModalBuilder()
                    .setTitle('Mod Application')
                    .setCustomId('mod-modal')
                    .addComponents(
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('mod-id')
                                    .setLabel('DISCORD ID & IN-GAME NAME')
                                    .setPlaceholder('Please lay out as ID: {name} IGN: {name}')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(100)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('mod-age')
                                    .setLabel('WHAT IS YOUR AGE')
                                    .setPlaceholder('You do not need to add your date of birth, just your age')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(2)
                                    .setMinLength(2)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('mod-time')
                                    .setLabel('WHAT IS YOUR TIME ZONE & AVAILABLE HOURS')
                                    .setPlaceholder('Timezone & estimated workable hours ')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(100)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('mod-experience')
                                    .setLabel('DO YOU HAVE PREVIOUS EXPERIENCE AS STAFF')
                                    .setPlaceholder('Please describe your previous experience')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMaxLength(512)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('mod-why')
                                    .setLabel('WHY SHOULD YOU BE CONSIDERED A POSITION')
                                    .setPlaceholder('Please describe why you should be invited onto the team')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMaxLength(512)
                                    .setRequired(true),
                            ],
                        }),
                    );

                await interaction.showModal(modal);
            }

            if (interaction.customId === 'dev-application') {
                const modal = new ModalBuilder()
                    .setTitle('Developer Application')
                    .setCustomId('dev-modal')
                    .addComponents(
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('dev-id')
                                    .setLabel('DISCORD ID & IN-GAME NAME')
                                    .setPlaceholder('Please lay out as ID: {name} IGN: {name}')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(100)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('dev-age')
                                    .setLabel('WHAT IS YOUR AGE')
                                    .setPlaceholder('You do not need to add your date of birth, just your age')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(2)
                                    .setMinLength(2)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('dev-time')
                                    .setLabel('WHAT IS YOUR TIME ZONE & AVAILABLE HOURS')
                                    .setPlaceholder('Timezone & estimated workable hours ')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(100)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('dev-experience')
                                    .setLabel('DO YOU HAVE PREVIOUS EXPERIENCE IN THIS FIELD')
                                    .setPlaceholder('Please describe your previous experience')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMaxLength(512)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('dev-why')
                                    .setLabel('WHY SHOULD YOU BE CONSIDERED A POSITION')
                                    .setPlaceholder('Please describe why you should be invited onto the team')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMaxLength(512)
                                    .setRequired(true),
                            ],
                        }),
                    );

                await interaction.showModal(modal);
            }

            if (interaction.customId === 'team-application') {
                const modal = new ModalBuilder()
                    .setTitle('Team Application')
                    .setCustomId('team-modal')
                    .addComponents(
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('team-id')
                                    .setLabel('DISCORD ID & IN-GAME NAME')
                                    .setPlaceholder('Please lay out as ID: {name} IGN: {name}')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(100)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('team-age')
                                    .setLabel('WHAT IS YOUR AGE')
                                    .setPlaceholder('You do not need to add your date of birth, just your age')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(2)
                                    .setMinLength(2)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('team-time')
                                    .setLabel('WHAT IS YOUR TIME ZONE & AVAILABLE HOURS')
                                    .setPlaceholder('Timezone & estimated workable hours ')
                                    .setStyle(TextInputStyle.Short)
                                    .setMaxLength(100)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('team-experience')
                                    .setLabel('DO YOU HAVE PREVIOUS EXPERIENCE IN THIS FIELD')
                                    .setPlaceholder('Please describe your previous experience')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMaxLength(512)
                                    .setRequired(true),
                            ],
                        }),
                        new ActionRowBuilder({
                            components: [
                                new TextInputBuilder()
                                    .setCustomId('team-why')
                                    .setLabel('WHY SHOULD YOU BE CONSIDERED A POSITION')
                                    .setPlaceholder('Please describe why you should be invited onto the team')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMaxLength(512)
                                    .setRequired(true),
                            ],
                        }),
                    );

                await interaction.showModal(modal);
            }

            if (interaction.customId === 'appTicket') {

                let username = interaction.message.embeds[0].title.split("'")[0];

                interaction.guild.channels.create({
                    permissionOverwrites: [
                        {
                            id: interaction.message.embeds[0].footer.text,
                            allow: ['SendMessages', 'ViewChannel'],
                        },
                        {
                            id: client.user.id,
                            allow: ['SendMessages', 'ViewChannel'],
                        },
                        {
                            id: interaction.message.guild.roles.everyone,
                            deny: ['ViewChannel'],
                        },
                    ],
                    parent: data.settings.ticket.openParent,
                    name: `ticket-${username}`,
                    type: ChannelType.GuildText,
                }).then(async (channel) => {

                    const embed = new EmbedBuilder()
                        .setTitle(`New Ticket`)
                        .setDescription(`Welcome to your application ticket <@${interaction.message.embeds[0].footer.text}>`)
                        .setColor('#4CCDEA')

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("ticketClose")
                                .setLabel("Close ticket")
                                .setEmoji(emoji.cross)
                                .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                                .setCustomId("ticketTranscript")
                                .setLabel("Transcript")
                                .setEmoji(emoji.pencil)
                                .setStyle(ButtonStyle.Primary)
                        );

                    interaction.reply({ content: `Sent your ticket in ${channel}`, ephemeral: true })
                    channel.send({ embeds: [embed], components: [row] })
                })
            }

            /* Role System */

            switch (interaction.customId) {
                case 'role.announcement':
                    const roleAnnouncement = interaction.message.guild.roles.cache.find(r => r.id === reaction.announcement);
                    try {
                        if (interaction.member.roles.cache.has(roleAnnouncement.id)) {
                            interaction.member.roles.remove(roleAnnouncement);
                            return interaction.reply({ content: emoji.cross + ' Removed your announcement ping role!', ephemeral: true });
                        } else {
                            interaction.member.roles.add(roleAnnouncement);
                            return interaction.reply({ content: emoji.check + ' Gave you the announcement ping role!', ephemeral: true });
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    break;
                case 'role.giveaway':
                    const roleGiveaway = interaction.message.guild.roles.cache.find(r => r.id === reaction.giveaway);
                    try {
                        if (interaction.member.roles.cache.has(roleGiveaway.id)) {
                            interaction.member.roles.remove(roleGiveaway);
                            return interaction.reply({ content: emoji.cross + ' Removed your giveaway ping role!', ephemeral: true });
                        } else {
                            interaction.member.roles.add(roleGiveaway);
                            return interaction.reply({ content: emoji.check + ' Gave you the giveaway ping role!', ephemeral: true });
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    break;
                case 'role.event':
                    const roleEvent = interaction.message.guild.roles.cache.find(r => r.id === reaction.event);
                    try {
                        if (interaction.member.roles.cache.has(roleEvent.id)) {
                            interaction.member.roles.remove(roleEvent);
                            return interaction.reply({ content: emoji.cross + ' Removed your events ping role!', ephemeral: true });
                        } else {
                            interaction.member.roles.add(roleEvent);
                            return interaction.reply({ content: emoji.check + ' Gave you the events ping role!', ephemeral: true });
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    break;
                case 'role.sneak':
                    const roleSneak = interaction.message.guild.roles.cache.find(r => r.id === reaction.sneak);
                    try {
                        if (interaction.member.roles.cache.has(roleSneak.id)) {
                            interaction.member.roles.remove(roleSneak);
                            return interaction.reply({ content: emoji.cross + ' Removed your sneak peek ping role!', ephemeral: true });
                        } else {
                            interaction.member.roles.add(roleSneak);
                            return interaction.reply({ content: emoji.check + ' Gave you the sneak peek ping role!', ephemeral: true });
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    break;
                default:
                    break;
            }
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("appTicket")
                    .setLabel("Open ticket with applicant")
                    .setEmoji(emoji.check)
                    .setStyle(ButtonStyle.Success),
            );

        if (interaction.customId == 'mod-modal') {
            await interaction.deferReply({ ephemeral: true })

            const appId = interaction.fields.getTextInputValue('mod-id')
            const appAge = interaction.fields.getTextInputValue('mod-age')
            const appTime = interaction.fields.getTextInputValue('mod-time')
            const appExperience = interaction.fields.getTextInputValue('mod-experience')
            const appWhy = interaction.fields.getTextInputValue('mod-why')

            const embed = new EmbedBuilder()
                .setFooter({ text: interaction.user.id })
                .setTitle(`${interaction.user.username}'s Mod Application`)
                .setTimestamp()
                .setColor('#4CCDEA')
                .setDescription(`Server Join Date: <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:f>\nDiscord ID: \`${interaction.user.id}\``)
                .addFields(
                    {
                        name: "__Discord ID & IGN__",
                        value: `\`\`\`\n${appId}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Age__",
                        value: `\`\`\`\n${appAge}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Timezone__",
                        value: `\`\`\`\n${appTime}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Previous Experience__",
                        value: `\`\`\`\n${appExperience}\n\`\`\``,
                    },
                    {
                        name: "__Why should we consider__",
                        value: `\`\`\`\n${appWhy}\n\`\`\``,
                    },
                )

            const channel = interaction.guild.channels.cache.get(data.settings.application.logs)
            await channel.send({ embeds: [embed], components: [row] })

            return interaction.editReply({ content: 'Submitted your application!', ephemeral: true })
        }

        if (interaction.customId == 'dev-modal') {
            await interaction.deferReply({ ephemeral: true })

            const appId = interaction.fields.getTextInputValue('dev-id')
            const appAge = interaction.fields.getTextInputValue('dev-age')
            const appTime = interaction.fields.getTextInputValue('dev-time')
            const appExperience = interaction.fields.getTextInputValue('dev-experience')
            const appWhy = interaction.fields.getTextInputValue('dev-why')


            const embed = new EmbedBuilder()
                .setFooter({ text: interaction.user.id })
                .setTitle(`${interaction.user.username}'s Developer Application`)
                .setTimestamp()
                .setColor('#4CCDEA')
                .setDescription(`Server Join Date: <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:f>\nDiscord ID: \`${interaction.user.id}\``)
                .addFields(
                    {
                        name: "__Discord ID & IGN__",
                        value: `\`\`\`\n${appId}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Age__",
                        value: `\`\`\`\n${appAge}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Timezone__",
                        value: `\`\`\`\n${appTime}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Previous Experience__",
                        value: `\`\`\`\n${appExperience}\n\`\`\``,
                    },
                    {
                        name: "__Why should we consider__",
                        value: `\`\`\`\n${appWhy}\n\`\`\``,
                    },
                )

            const channel = interaction.guild.channels.cache.get(data.settings.application.logs)
            await channel.send({ embeds: [embed], components: [row] })

            return interaction.editReply({ content: 'Submitted your application!', ephemeral: true })
        }

        if (interaction.customId == 'team-modal') {
            await interaction.deferReply({ ephemeral: true })

            const appId = interaction.fields.getTextInputValue('team-id')
            const appAge = interaction.fields.getTextInputValue('team-age')
            const appTime = interaction.fields.getTextInputValue('team-time')
            const appExperience = interaction.fields.getTextInputValue('team-experience')
            const appWhy = interaction.fields.getTextInputValue('team-why')


            const embed = new EmbedBuilder()
                .setFooter({ text: interaction.user.id })
                .setTitle(`${interaction.user.username}'s Team Application`)
                .setTimestamp()
                .setColor('#4CCDEA')
                .setDescription(`Server Join Date: <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:f>\nDiscord ID: \`${interaction.user.id}\``)
                .addFields(
                    {
                        name: "__Discord ID & IGN__",
                        value: `\`\`\`\n${appId}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Age__",
                        value: `\`\`\`\n${appAge}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Timezone__",
                        value: `\`\`\`\n${appTime}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "__Previous Experience__",
                        value: `\`\`\`\n${appExperience}\n\`\`\``,
                    },
                    {
                        name: "__Why should we consider__",
                        value: `\`\`\`\n${appWhy}\n\`\`\``,
                    },
                )

            const channel = interaction.guild.channels.cache.get(data.settings.application.logs)
            await channel.send({ embeds: [embed], components: [row] })

            return interaction.editReply({ content: 'Submitted your application!', ephemeral: true })
        }

    }
}