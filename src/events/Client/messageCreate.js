const Event = require("../../structure/Event");
const config = require("../../config");
const { EmbedBuilder } = require("discord.js");

// Define a list of bad words
const badWords = ['nigga', 'nigger', 'bitch'];

module.exports = new Event({
    event: 'messageCreate',
    once: false,
    run: async (client, message) => {
        if (message.author.bot) return;

        // Creative channel reactions
        const channel = message.channel;
        if (channel.id === config.channels.creative) {
            message.react('⭐');
        }

        // Check for bad words
        const messageContent = message.content.toLowerCase();
        const containsBadWord = badWords.some(badWord => messageContent.includes(badWord));

        if (containsBadWord) {
            await message.delete();

            const warningEmbed = new EmbedBuilder()
                .setColor('#4F7052')
                .setTitle('Warning')
                .setDescription('Your message was removed because it contained inappropriate language. Please keep swearing to the minimum.');

            await message.author.send({ embeds: [warningEmbed] });
        }
    }
}).toJSON();