const { EmbedBuilder } = require('discord.js');
const config = require("../config");

/**
 * Sends a log message to the specified channel.
 * @param {object} client - The Discord client.
 * @param {string} channelId - The ID of the channel where the log should be sent.
 * @param {MessageEmbed} embed - The embed message to send.
 */
const sendLog = async (client, embed) => {
    const channel = await client.channels.fetch(config.channels.log);
    if (!channel) return;
    channel.send({ embeds: [embed] });
};

const logMessageEdit = async (client, oldMessage, newMessage) => {
    if(newMessage.author.id === client.user.id) return;
    if (oldMessage === newMessage.content) return;

    const messageUrl = `https://discord.com/channels/${newMessage.guildId}/${newMessage.channelId}/${newMessage.id}`;

    const embed = new EmbedBuilder()
        .setColor('#4F7052')
        .setAuthor({
            name: newMessage.author.username,
            iconURL: newMessage.author.displayAvatarURL({ dynamic: false })
        })
        .setDescription(`Message Edited in <#${newMessage.channelId}>. [Jump to message](${messageUrl})`)
        .addFields(
            { name: 'Before', value: oldMessage.content || 'No Content' },
            { name: 'After', value: newMessage.content || 'No Content' }
        )
        .setTimestamp();

    await sendLog(client, embed);
};

const logMessageDelete = async (client, message) => {
    if (!message.author) return;

    const embed = new EmbedBuilder()
        .setColor('#A4343A')
        .setAuthor({
            name: message.author.username,
            iconURL: message.author.displayAvatarURL({ dynamic: false })
        })
        .setDescription(`Message sent by <@${message.author.id}> was deleted in <#${message.channelId}>.`)
        .addFields(
            { name: 'Message', value: message.content || 'No Content' }
        )
        .setTimestamp();

    await sendLog(client, embed);
};

const logRoleChange = async (client, member, role, action) => {
    if(member.id === client.user.id) return;

    const embed = new EmbedBuilder()
        .setColor(action === 'added to' ? '#4F7052' : '#A4343A')
        .setAuthor({
            name: member.user.username,
            iconURL: member.user.displayAvatarURL({ dynamic: false })
        })
        .setDescription(`<@${member.id}> was ${action} <@&${role.id}> role.`)
        .setTimestamp();

    await sendLog(client, embed);
};

const logUserJoin = async (client, member) => {

    const embed = new EmbedBuilder()
        .setColor('#4F7052')
        .setAuthor({
            name: member.user.username,
            iconURL: member.user.displayAvatarURL({ dynamic: false })
        })
        .setDescription(`User <@${member.user.id}> has joined.`)
        .setTimestamp();
    
    await sendLog(client, embed);
};

const logUserLeave = async (client, member) => {
    const embed = new EmbedBuilder()
        .setColor('#A4343A')
        .setAuthor({
            name: member.user.username,
            iconURL: member.user.displayAvatarURL({ dynamic: false })
        })
        .setDescription(`User <@${member.user.id}> has left.`)
        .setTimestamp();
    
    await sendLog(client, embed);
};

module.exports = { logMessageEdit, logMessageDelete, logRoleChange, logUserJoin, logUserLeave };
