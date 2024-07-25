const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const filesize = require('filesize')
const serverSchema = require('../../schemas/server');
const emoji = require('../../config/emojis.json')
const sourcebin = require('sourcebin_js');
require('dotenv').config();
const banSchema = require('../../schemas/ban');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if (!message.guild) return;
        if (message.author.bot) return;

        let data = await serverSchema.findOne({
            _id: message.guild.id,
        });

        let banData = await banSchema.findOne({
            _id: message.author.id,
        });

        /* Bug Report System */

        if (data) {

            if (message.author.id === '638718691093118977') {
                const userMessageCount = client.messageCounts.get(message.author.id) || 0;
                client.messageCounts.set(message.author.id, userMessageCount + 1);

                if (userMessageCount === 25) {
                    message.reply(`Please stfu bereli`);
                }

                if (userMessageCount >= 25 || !client.messageCounts.has(message.author.id)) {
                    client.messageCounts.set(message.author.id, 0);
                }
            }

            if (data.settings.xp.channel) {
                if (!data.settings.xp.ignoredChannels.includes(message.channel.id)) {
                    const Levels = require("discord-xp");
                    Levels.setURL(process.env.clobDBString)

                    const randomAmountOfXp = Math.floor(Math.random() * data.settings.xp.multiplier) + 1;
                    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
                    if (hasLeveledUp) {
                        const user = await Levels.fetch(message.author.id, message.guild.id);
                        let chx = message.guild.channels.cache.get(data.settings.xp.channel)

                        if (chx) {
                            if (!chx.permissionsFor(message.guild.members.me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks])) {
                                return
                            }

                            await chx.send({ content: `${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:` });
                        }
                    }
                }
            }

            if (message.channel.id === data.settings.bugreports.channel /* #bugs */ && !message.author.bot) {

                if (banData) {
                    await message.reply({
                        content: `${emoji.cross} You are banned from using ClobNets systems`,
                        ephemeral: true
                    }).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })

                    return message.delete()
                }

                try {

                    let response
                    let msg = message.content

                    message.delete()

                    if (msg.length >= 1000) {
                        const output = msg

                        try {
                            response = await sourcebin.create([
                                {
                                    name: ' ',
                                    content: output,
                                    languageId: 'text',
                                },
                            ], {
                                title: `Bug Report from ${message.author.id}`,
                                description: ' ',
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }

                    let content = (msg.length >= 1000) ? `[\`📄 View Content\`](${response.url})` : `\`\`\`\n${msg}\n\`\`\``

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("rep-complete")
                                .setLabel("Resolved")
                                .setEmoji(emoji.check)
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId('rubbish')
                                .setEmoji(emoji.trash)
                                .setStyle(ButtonStyle.Danger)
                        );

                    const embed = new EmbedBuilder()
                        .setTitle('Bug Report!')
                        .setTimestamp()
                        .setThumbnail('https://emeraldbots.xyz/img/bug.png')
                        .setColor('#4CCDEA')
                        .setFooter({ text: message.author.id })
                        .addFields(
                            {
                                name: "__Author__",
                                value: message.author.username,
                                inline: true
                            },
                            {
                                name: "__Status__",
                                value: 'Un-Resolved',
                                inline: true
                            },
                            {
                                name: "__Report__",
                                value: content,
                            },
                        )

                    /* Any attachments added */

                    if (message.attachments.size > 0) {
                        let keys = Array.from(message.attachments.values());
                        keys.slice(0, 6).forEach(image =>
                            embed.addFields(
                                {
                                    name: '__Name__',
                                    value: `\`${image.name}\``,
                                    inline: true
                                },
                                {
                                    name: '__Attachment__',
                                    value: `[URL](${image.url})`,
                                    inline: true
                                },
                                {
                                    name: '__Size__',
                                    value: `\`${filesize(image.size, { round: 0 })}\``,
                                    inline: true
                                }
                            )
                        );
                    }

                    let channel = message.guild.channels.cache.get(data.settings.bugreports.logs) /* #bug-reports */
                    await channel.send({ embeds: [embed], components: [row] })

                    return message.channel.send({ content: `${emoji.check} <@${message.author.id}> Your bug report has been sent!` })
                        .then(msg => {
                            setTimeout(() => msg.delete(), 3000)
                        })

                } catch (err) {
                    console.log(err)
                }
            }

            /* Suggestion System */

            if (message.channel.id === data.settings.suggestion.channel /* #suggestions */ && !message.author.bot) {

                if (banData) {
                    await message.reply({
                        content: `${emoji.cross} You are banned from using ClobNets systems`,
                        ephemeral: true
                    }).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })

                    return message.delete()
                }

                try {

                    let response
                    let msg = message.content

                    message.delete()

                    if (msg.length >= 1000) {
                        const output = msg

                        try {
                            response = await sourcebin.create([
                                {
                                    name: ' ',
                                    content: output,
                                    languageId: 'text',
                                },
                            ], {
                                title: `Suggestion from ${message.author.id}`,
                                description: ' ',
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }

                    let content = (msg.length >= 1000) ? `[\`📄 View Content\`](${response.url})` : `\`\`\`\n${msg}\n\`\`\``

                    const row = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('sug-accept')
                            .setLabel('Accept')
                            .setEmoji(emoji.check)
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('sug-decline')
                            .setLabel('Decline')
                            .setEmoji(emoji.cross)
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder().setCustomId('rubbish').setEmoji(emoji.trash).setStyle(ButtonStyle.Danger),
                    );

                    const embed = new EmbedBuilder()
                        .setTitle('User Suggestion')
                        .setTimestamp()
                        .setColor('#4CCDEA')
                        .setFooter({ text: message.author.id })
                        .addFields(
                            {
                                name: "__Author__",
                                value: message.author.username,
                                inline: true
                            },
                            {
                                name: "__Status__",
                                value: 'Pending',
                                inline: true
                            },
                            {
                                name: "__Suggestion__",
                                value: content,
                            },
                        )

                    /* Any attachments added */

                    if (message.attachments.size > 0) {
                        let keys = Array.from(message.attachments.values());
                        keys.slice(0, 6).forEach(image =>
                            embed.addFields(
                                {
                                    name: '__Name__',
                                    value: `\`${image.name}\``,
                                    inline: true
                                },
                                {
                                    name: '__Attachment__',
                                    value: `[URL](${image.url})`,
                                    inline: true
                                },
                                {
                                    name: '__Size__',
                                    value: `\`${filesize(image.size, { round: 0 })}\``,
                                    inline: true
                                }
                            )
                        );
                    }

                    let channel = message.guild.channels.cache.get(data.settings.suggestion.logs) /* #user-suggestions */
                    await channel.send({ embeds: [embed], components: [row] })

                    return message.channel.send({ content: `${emoji.check} <@${message.author.id}> Your suggestion has been sent!` })
                        .then(msg => {
                            setTimeout(() => msg.delete(), 3000)
                        })

                } catch (err) {
                    console.log(err)
                }
            }

            /* Nickname System */

            if (message.channel.id === data.settings.nickname.channel /* #nickname */ && !message.author.bot) {

                if (banData) {
                    await message.reply({
                        content: `${emoji.cross} You are banned from using ClobNets systems`,
                        ephemeral: true
                    }).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })

                    return message.delete()
                }

                let user = await message.guild.members.cache.get(message.author.id)

                user.setNickname(message.content).catch(() => {
                    message.channel.send({ content: `${emoji.cross} <@${message.author.id}> I don't have permission to change your nickname.` })
                        .then(msg => {
                            setTimeout(() => msg.delete(), 5000)
                        })
                })

                return message.delete()

            }

            /* counting system */

            if (message.channel.id === data.settings.counter.channel && !message.author.bot && !message.author.system && message.content) {

                if (banData) {
                    await message.reply({
                        content: `${emoji.cross} You are banned from using ClobNets systems`,
                        ephemeral: true
                    }).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })

                    return
                }

                const number = Number(message.content)

                if (isNaN(number)) {
                    return
                }

                if (data.settings.counter.LastUser === message.author.id) {
                    message.react(`${emoji.cross}`)

                    data.settings.counter.lastHighestNumber = data.settings.counter.nextNumber
                    data.settings.counter.nextNumber = 1
                    data.settings.counter.LastUser = null
                    await data.save()

                    return message.reply(`${emoji.cross} Someone else has to go after you, reset the counter!`)

                } else if (number !== data.settings.counter.nextNumber) {
                    await message.react(`${emoji.cross}`)

                    data.settings.counter.lastHighestNumber = data.settings.counter.nextNumber
                    data.settings.counter.nextNumber = 1
                    data.settings.counter.LastUser = null
                    await data.save()

                    return message.reply(`${emoji.cross} Thats not the next number, reset the counter!`)

                } else {
                    await message.react(`${emoji.check}`)

                    data.settings.counter.LastUser = message.author.id
                    data.settings.counter.nextNumber++
                    return data.save()
                }
            }

        }
    }
}