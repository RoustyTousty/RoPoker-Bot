const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField, ChannelType, ButtonStyle } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const Component = require("../../structure/Component");
const config = require("../../config");

module.exports = new Component({
    customId: 'ticket-create',
    type: 'button',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const guild = interaction.guild;
        const member = interaction.member;
        const category = guild.channels.cache.get(config.category.tickets);

        if (!category) {
            return interaction.reply({ content: 'Ticket category not found!', ephemeral: true });
        }

        const existingTicket = category.children.cache.find(channel => channel.topic && channel.topic.includes(`Ticket created by: ${member.id}`));
        if (existingTicket) {
            const embed = new EmbedBuilder()
                .setColor('#4F7052')
                .setTitle('❌ Ticket Exists')
                .setDescription('You already have an open ticket!');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        // Setup the new ticket channel
        const channel = await guild.channels.create({
            name: `ticket-${member.user.username}`,
            type: ChannelType.GuildText,
            parent: category.id,
            topic: `Ticket created by: ${member.id}`,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: member.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                },
                {
                    id: client.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                }
            ],
        });

        const embed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle('Ticket Created')
            .setDescription('Use the buttons below to manage your ticket.')

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket-close')
                    .setLabel('Close Ticket')
                    .setEmoji('🔒')
                    .setStyle(ButtonStyle.Secondary)
            );
        await channel.send({ embeds: [embed], components: [row] });

        const replyEmbed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle('✅ Ticket Created')
            .setDescription(`Your ticket has been created at: ${channel}`);
        await interaction.reply({
            embeds: [replyEmbed],
            ephemeral: true
        });
    }
}).toJSON();