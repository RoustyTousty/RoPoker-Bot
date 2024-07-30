const axios = require("axios")
const moment = require('moment');
const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, time } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'status',
        description: 'Recieve RoPokers status information.',
        type: 1,
        options: []
    },
    options: {
        cooldown: 10000
    },
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const url = 'https://games.roblox.com/v1/games?universeIds=6080782965'

        axios.get(url)
            .then(res => {
                const dataArray = res.data.data;

                if (!dataArray) return;

                const data = dataArray[0];
                console.log(data)

                const playing = data.playing;
                const visits = data.visits;
                const favorites = data.favoritedCount;
                const name = data.name;
                const created = data.created;
                const updated = data.updated;

                const formattedCreated = moment(created).format('MMMM Do YYYY');
                const formattedUpdated = moment(updated).format('MMMM Do YYYY');

                const mainEmbed = new EmbedBuilder()
                    .setColor('#4F7052')
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(name)
                    .setDescription('Check the current RoPoker status!')
                    .addFields({
                        name: 'Players online',
                        value: `${playing}`,
                        inline: true
                    })
                    .addFields({
                        name: 'Total visits',
                        value: `${visits}`,
                        inline: true
                    })
                    .addFields({
                        name: 'Favorited count',
                        value: `${favorites}`,
                        inline: true
                    })
                    .addFields({
                        name: 'Created',
                        value: formattedCreated,
                    })
                    .addFields({
                        name: 'Last time updated',
                        value: formattedUpdated,
                    });
                
                interaction.reply({ embeds: [mainEmbed] })
            })
            .catch(err => {
                console.log(err);
                process.exit(1);
            }
        );
    }
}).toJSON();