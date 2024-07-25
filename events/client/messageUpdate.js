const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const serverSchema = require('../../schemas/server');
const emoji = require('../../config/emojis.json')

module.exports = {
    name: 'messageUpdate',
    async execute(message, client) {

        if (!message.guild) return;
        if (!message.author) return;
        if (message.author.bot) return;

        let data = await serverSchema.findOne({
            _id: message.guild.id,
        });

        if (data) {

            if (message.channel.id === data.settings.counter.channel) {
                const number = Number(message.content)

                if (isNaN(number)) {
                    return
                }

                if (number === data.settings.counter.nextNumber - 1) {
                    const embed = new EmbedBuilder()
                        .setTitle(`${emoji.pencil} Number Edited`)
                        .setColor('#4CCDEA')
                        .addFields(
                            {
                                name: "__Author__",
                                value: `<@${message.author.id}>`,
                                inline: true
                            },
                            {
                                name: "__Number__",
                                value: `\`${number}\``,
                                inline: true
                            },
                            {
                                name: "__Next Number__",
                                value: `\`${data.settings.counter.nextNumber}\``,
                                inline: true
                            },
                        )

                    message.reply({ embeds: [embed] })
                }
            }
        }
    }
}