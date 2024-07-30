const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType, ButtonStyle } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const Component = require("../../structure/Component");
const config = require("../../config");

module.exports = new Component({
    customId: 'ticket-delete',
    type: 'button',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const channel = interaction.channel;

        channel.delete()
    }
}).toJSON();