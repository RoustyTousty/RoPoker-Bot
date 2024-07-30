const { StringSelectMenuInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const Component = require("../../structure/Component");

const faqAnswers = {
    how_to_win_at_poker: {
        text: 'One of the most effective ways to win at poker (Texas Holdem) is to bring a gun and a mask to the table. You must holdem to their knees. (Not advised)',
    },
    how_to_play_poker: {
        text: 'Here is an amazing and brief overview of the poker (Texas Holdem) game.',
        link: 'https://www.youtube.com/watch?v=CpSewSHZhmo'
    },
    best_poker_hands: {
        text: 'Best hand list can be either viewed in-game or by going to this website which contains detailed explanations and examples for all poker hands.',
        link: 'https://www.888poker.com/magazine/how-to-play-poker/hands',
        image: 'https://i.imgur.com/8GFTHZ3.png'
    },
    reraise_my_own_bet: {
        text: 'No, by the rules of poker (Texas Holdem), you may only re-raise another player\'s bet.',
    },
    play_with_friends: {
        text: 'To join a friend you simply navigate to the table list menu and select a table with a friend icon. This icon appears when a friend of yours (Roblox friend) is at one of the tables.',
    },
    game_had_a_tie: {
        text: 'A tie happens when 2 or more players have an identical best hand and it is the best hand at the table, in this case, the pot will be split between all players who tied.',
    },
    lost_all_my_money: {
        text: 'You can withdraw $250 every 30 minutes ($400 for Premium players, $750 for VIP players) in the lobby by entering the home menu and then opening the "RoPoker Support Fund" menu. Click claim and you will receive your free money!',
    }
};

module.exports = new Component({
    customId: 'faq-select',
    type: 'select',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {
        const selectedValue = interaction.values[0];
        const answer = faqAnswers[selectedValue];

        const embed = new EmbedBuilder()
            .setColor('#4F7052')
            .setTitle('Answer')
            .setDescription(answer.text);

        if (answer.link) {
            embed.addFields({ name: 'Link', value: `[Click here](${answer.link})` });
        }

        if (answer.image) {
            embed.setImage(answer.image);
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}).toJSON();