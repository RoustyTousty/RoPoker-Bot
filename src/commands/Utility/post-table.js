const { ChatInputCommandInteraction, ApplicationCommandOptionType } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'posttable',
        description: 'Post your table in the find-a-table channel.',
        type: 1,
        options: []
    },
    options: {
        cooldown: 1000 * 60
    },
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.showModal({
            custom_id: 'post-table-modal',
            title: 'Post Table Setup',
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: 'buy_in',
                            label: 'Buy In',
                            style: 1,
                            max_length: 100,
                            placeholder: 'Enter buy in (e.g., 100, 500, 1k, etc.)',
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: 'max_player_count',
                            label: 'Max Player Count',
                            style: 1,
                            max_length: 100,
                            placeholder: 'Enter max player count (2-8)',
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: 'tournament',
                            label: 'Tournament',
                            style: 1,
                            max_length: 100,
                            placeholder: 'Enter yes or no',
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: 'table_link',
                            label: 'Link to Table',
                            style: 1,
                            max_length: 100,
                            placeholder: 'Enter link to the table',
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: 'table_info',
                            label: 'Additional Table Information',
                            style: 2,
                            max_length: 200,
                            placeholder: 'Provide extra information',
                            required: false
                        }
                    ]
                }
            ]
        });
    }
}).toJSON();