const { Schema, model } = require('mongoose');

const serverSchema = new Schema({
    _id: String,
    name: String,
    settings: {
        verification: {
            channel: {
                type: String,
                default: null,
            },
            role: {
                type: String,
                default: null,
            },
        },
        nickname: {
            channel: {
                type: String,
                default: null,
            },
        },
        suggestion: {
            channel: {
                type: String,
                default: null,
            },
            logs: {
                type: String,
                default: null,
            },
        },
        bugreports: {
            channel: {
                type: String,
                default: null,
            },
            logs: {
                type: String,
                default: null,
            },
        },
        application: {
            channel: {
                type: String,
                default: null,
            },
            logs: {
                type: String,
                default: null,
            },
        },
        ticket: {
            channel: {
                type: String,
                default: null,
            },
            logs: {
                type: String,
                default: null,
            },
            openParent: {
                type: String,
                default: null,
            },
            closeParent: {
                type: String,
                default: null,
            },
        },
        xp: {
            channel: {
                type: String,
                default: null,
            },
            ignoredChannels: {
                type: Array,
            },
            multiplier: {
                type: Number,
                default: 30,
            },
        },
        welcome: {
            channel: {
                type: String,
                default: null,
            },
        },
        counter: {
            channel: {
                type: String,
                default: null,
            },
            nextNumber: {
                type: Number,
                default: null,
            },
            LastUser: {
                type: String,
                default: null,
            },
            lastHighestNumber: {
                type: Number,
                default: null,
            },
        }
    },
});

module.exports = model('Servers', serverSchema, 'servers');