const { ChatInputCommandInteraction, ButtonStyle, ButtonBuilder, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'verify-setup',
        description: 'Setup the verify!',
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
        await interaction.deferReply()

        const imageEmbed = new EmbedBuilder()
            .setColor('#4F7052')
            .setImage('https://i.imgur.com/aCXzjbM.png')


        const mainEmbed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle('Welcome to RoPoker\'s Official Discord Server!')
            .setDescription('You have reached our verification section. To gain access to our text, voice, and support channels, please follow these steps:')
            .setFields(
                {
                    name: '\u200b',
                    value: 'React to this message with ✅ to receive your @ Member role!\n\n' +
                           '**By reacting to this message, you confirm that:**\n' +
                           ' • You have read and agree to our server rules. [Read the rules in <#1237375909250732102>]\n' +
                           ' • You will treat all members with respect and kindness.\n' +
                           ' • You will not engage in spamming, trolling, or disruptive behavior.\n' +
                           ' • You will not share inappropriate or offensive content.\n' +
                           ' • You will follow the Roblox and Discord Community Guidelines and Terms of Service.\n\n' +
                           '**To proceed, press "verify" button below.**'
                }
            )
         
        const ticketCreateButton = new ButtonBuilder()
            .setCustomId('verify-confirm')
            .setLabel('Verify')
            .setEmoji('✅')
            .setStyle(ButtonStyle.Success)
            
        const row = new ActionRowBuilder()
            .addComponents(ticketCreateButton)

        await interaction.channel.send({ embeds: [imageEmbed] });
        await interaction.channel.send({ embeds: [mainEmbed], components: [row] });

        await interaction.deleteReply()
    }
}).toJSON();