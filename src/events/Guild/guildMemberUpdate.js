const { logRoleChange } = require('../../utils/log');
const Event = require("../../structure/Event");

module.exports = new Event({
    event: 'guildMemberUpdate',
    once: false,
    run: async (client, oldMember, newMember) => {
        const oldRoles = oldMember.roles.cache;
        const newRoles = newMember.roles.cache;
    
        const addedRoles = newRoles.filter(role => !oldRoles.has(role.id));
        const removedRoles = oldRoles.filter(role => !newRoles.has(role.id));
    
        for (const role of addedRoles.values()) {
            await logRoleChange(client, newMember, role, 'added to');
        }
    
        for (const role of removedRoles.values()) {
            await logRoleChange(client, newMember, role, 'removed from');
        }
    }
}).toJSON();