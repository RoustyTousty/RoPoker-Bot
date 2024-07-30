const { ChatInputCommandInteraction, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'faq',
        description: 'Get an answer to a common question.',
        type: 1,
        options: []
    },
    options: {
        
    },
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const questions = [
            { label: 'How to win at poker?', value: 'how_to_win_at_poker' },
            { label: 'How to play poker?', value: 'how_to_play_poker' },
            { label: 'What are the best poker hands?', value: 'best_poker_hands' },
            { label: 'Can you re-raise your own bets?', value: 'reraise_my_own_bet' },
            { label: 'How to play with my friends?', value: 'play_with_friends' },
            { label: 'Why did my game end in a tie?', value: 'game_had_a_tie' },
            { label: 'What do i do after i lost all my money?', value: 'lost_all_my_money' },
        ];

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('faq-select')
            .setPlaceholder('Select a question')
            .addOptions(questions);

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle('FAQ')
            .setDescription('Select a question to get an answer.');

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}).toJSON();