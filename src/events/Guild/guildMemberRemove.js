const { logUserLeave } = require('../../utils/log');
const Event = require("../../structure/Event");

module.exports = new Event({
    event: 'guildMemberRemove',
    once: false,
    run: async (client, member) => {
        await logUserLeave(client, member)
    }
}).toJSON();