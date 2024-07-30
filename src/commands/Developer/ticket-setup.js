const { ChatInputCommandInteraction, ButtonStyle, ButtonBuilder, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'ticket-setup',
        description: 'Setup the tickets!',
        type: 1,
    },
    options: {
        botOwner: true
    },
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const imageEmbed = new EmbedBuilder()
            .setColor('#4F7052')
            .setImage('https://i.imgur.com/uCORc5x.png')

        const mainEmbed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle('Need Assistance? Open a Ticket!')
            .setDescription('Have an issue or a question you want to ask our staff? Then tickets are for you!\n\n' +
                '**How to create a ticket:**\n' +
                '1. Click the "Create a ticket" button below.\n' +
                '2. A private channel will be created for you to discuss your issue with our staff.\n\n' +
                '**Guidelines for using tickets:**\n' +
                '• Please be respectful and patient.\n' +
                '• Provide as much detail as possible about your issue or question.\n' +
                '• Do not create multiple tickets for the same issue.\n' +
                '• Abuse of the ticket system will result in disciplinary action.\n\n' +
                'Our staff will assist you as soon as possible. Thank you for your understanding and cooperation!');
         
        const ticketCreateButton = new ButtonBuilder()
            .setCustomId('ticket-create')
            .setLabel('Create a ticket')
            .setEmoji('🎫')
            .setStyle(ButtonStyle.Secondary)
            
        const row = new ActionRowBuilder()
            .addComponents(ticketCreateButton)

        await interaction.channel.send({ embeds: [imageEmbed] });
        await interaction.channel.send({ embeds: [mainEmbed], components: [row] });

        await interaction.deleteReply()
    }
}).toJSON();