const { logMessageDelete } = require('../../utils/log');
const Event = require("../../structure/Event");
const { EmbedBuilder } = require('discord.js');
const config = require("../../config");

module.exports = new Event({
    event: 'messageDelete',
    once: false,
    run: async (client, message) => {
        await logMessageDelete(client, message)
    }
}).toJSON();