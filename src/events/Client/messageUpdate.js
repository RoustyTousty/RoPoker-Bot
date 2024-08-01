const { logMessageEdit } = require('../../utils/log');
const { EmbedBuilder } = require('discord.js');
const Event = require("../../structure/Event");
const config = require("../../config");

module.exports = new Event({
    event: 'messageUpdate',
    once: false,
    run: async (client, oldMessage, newMessage) => {
        await logMessageEdit(client, oldMessage, newMessage);
    }
}).toJSON();