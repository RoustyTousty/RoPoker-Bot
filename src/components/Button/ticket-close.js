const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const Component = require("../../structure/Component");

module.exports = new Component({
    customId: 'ticket-close',
    type: 'button',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const channel = interaction.channel;
        const guild = interaction.guild;

        const topic = channel.topic;
        const creatorId = topic.match(/Ticket created by: (\d+)/)[1];
        console.log(creatorId)

        channel.permissionOverwrites.set([
            {
                id: guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: creatorId,
              deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
            },
        ]);

        const embed = new EmbedBuilder()
            .setTitle('Ticket Closed')
            .setDescription('This ticket has been closed. Staff can choose to delete it.')
            .setColor('#4F7052');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket-delete')
                    .setLabel('Delete Ticket')
                    .setStyle(ButtonStyle.Danger)
            );

        await interaction.reply({
            content: 'Ticket has been closed and moved to staff view only.',
            ephemeral: true
        });

        await channel.send({ embeds: [embed], components: [row] });
    }
}).toJSON();
