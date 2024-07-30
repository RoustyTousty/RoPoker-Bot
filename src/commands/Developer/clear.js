const { ChatInputCommandInteraction, ApplicationCommandOptionType } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'clear',
        description: 'Clear specific ammount of text messages.',
        type: 1,
        options: [{
            name: 'ammount',
            description: 'Number of messages to be deleated.',
            type: ApplicationCommandOptionType.Integer,
            required: true
        }]
    },
    options: {
        botDevelopers: true
    },
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const ammount = interaction.options.getInteger('ammount', true);
        const channel = interaction.channel

        try {
            let messages = await channel.messages.fetch({ limit: ammount + 1 });
            // messages = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
    
            messages.forEach(message => {
                message.delete()
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }
}).toJSON();