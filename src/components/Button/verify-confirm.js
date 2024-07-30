const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType, ButtonStyle } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const Component = require("../../structure/Component");
const config = require("../../config");

module.exports = new Component({
    customId: 'verify-confirm',
    type: 'button',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const user = interaction.user

        if (user === client.user) return;

        let member = interaction.message.guild.members.cache.get(user.id);
        await member.roles.add(config.roles.member);
        await member.roles.remove(config.roles.guest);

        const replyEmbed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle('✅ Verify Completed')
            .setDescription(`You have been succesfully verified!`);
        await interaction.reply({
            embeds: [replyEmbed],
            ephemeral: true
        });
    }
}).toJSON();