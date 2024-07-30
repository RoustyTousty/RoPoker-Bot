const { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const Component = require("../../structure/Component");
const config = require("../../config");

module.exports = new Component({
    customId: 'post-table-modal',
    type: 'modal',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        // Get the values from the modal
        const buy_in = interaction.fields.getTextInputValue('buy_in').toLowerCase();
        const max_player_count = parseInt(interaction.fields.getTextInputValue('max_player_count'));
        const tournament = interaction.fields.getTextInputValue('tournament').toLowerCase();
        const table_link = interaction.fields.getTextInputValue('table_link');
        const table_info = interaction.fields.getTextInputValue('table_info');

        // Define the valid options
        const validBuyIns = ['100', '500', '1k', '1000', '2k', '2000', '5k', '5000', '10k', '10000', '25k', '25000', '50k', '50000', '100k', '100000'];
        const validTournamentOptions = ['yes', 'no'];

        // Validate buy in
        if (!validBuyIns.includes(buy_in)) {
            await interaction.reply({
                content: `Invalid buy in amount. Please choose from the following options: ${validBuyIns.join(', ')}.`,
                ephemeral: true
            });
            return;
        }

        // Validate max player count
        if (isNaN(max_player_count) || max_player_count < 2 || max_player_count > 8) {
            await interaction.reply({
                content: 'Invalid max player count. Please enter a number between 2 and 8.',
                ephemeral: true
            });
            return;
        }

        // Validate turnament
        if (!validTournamentOptions.includes(tournament)) {
            await interaction.reply({
                content: `Invalid tournament option. Please enter 'yes' or 'no'.`,
                ephemeral: true
            });
            return;
        }

        // Validate table link
        if (!table_link) {
            await interaction.reply({
                content: 'You must provide a link to your table.',
                ephemeral: true
            });
            return;
        }

        // Create and send the embed
        const findATableChannel = interaction.guild.channels.cache.get(config.channels.findatable);

        const mainEmbed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle(interaction.user.displayName)
            .setThumbnail(interaction.user.avatarURL())
            .setDescription(
                `A new table listing has been created by <@${interaction.user.id}>. If you are interested, make sure to contact them to join the table.\n\n`
            );

        mainEmbed.addFields({
            name: 'Table information:',
            value: 
            ` • Buy in: ${buy_in}\n` +
            ` • Max player count: ${max_player_count}\n` +
            ` • Tournament: ${tournament}\n`
        });
        
        if (table_info) {
            mainEmbed.addFields({
                name: 'Additional information',
                value: table_info
            });
        }

        // Setup the table link
        try {
            const url = new URL(table_link);

            if (!url.hostname.includes('roblox.com')) {
                await interaction.reply({
                    content: 'The link you provided is not a valid Roblox link. Please provide a valid Roblox URL.',
                    ephemeral: true
                });
                return;
            } 

            const linkButton = new ButtonBuilder()
                .setLabel('Table Link')
                .setStyle(ButtonStyle.Link)
                .setURL(table_link);

            const row = new ActionRowBuilder()
                .addComponents(linkButton);
        
            // Post the table
            await findATableChannel.send({ embeds: [mainEmbed], components: [row] });

            await interaction.reply({
                content: `Succesfully posted your table in <#${config.channels.findatable}>`,
                ephemeral: true
            });

        } catch (err) {
            await interaction.reply({
                content: 'The link you provided is not valid. Please provide a valid URL.',
                ephemeral: true
            });
            return;
        }
    }
}).toJSON();