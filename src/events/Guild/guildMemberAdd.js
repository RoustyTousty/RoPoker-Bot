const { logUserJoin } = require('../../utils/log');
const Event = require("../../structure/Event");
const config = require("../../config");
const { EmbedBuilder } = require("discord.js");

module.exports = new Event({
    event: 'guildMemberAdd',
    once: false,
    run: async (client, member) => {
        await logUserJoin(client, member)
        
        await member.roles.add(config.roles.guest);
        
        let welcomeChannelId = config.channels.welcome;
        let infoChannelId = config.channels.info;
        let welcomeChannel = client.channels.cache.get(welcomeChannelId);
        let infoChannel = client.channels.cache.get(infoChannelId);

        const embed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle('Welcome to RoPoker Official Discord! 🎉')
             .setDescription(`Hello **${member.user.username}**, welcome to our server! We're glad to have you here. \n\n` +
                `📜 **Please follow these steps to get started:**\n` +
                `1. **Verify yourself** to gain access to the text channels.\n` +
                `2. **Read the rules** in ${infoChannel} to understand our community guidelines.\n\n` +
                `If you have any questions, feel free to ask our staff. Enjoy your stay!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

        welcomeChannel.send({ embeds: [embed] });
    }
}).toJSON();