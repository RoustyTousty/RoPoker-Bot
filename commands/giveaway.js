const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const emoji = require('../config/emojis.json')
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Start or Edit a new or ongoing giveaway.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addSubcommand(subcommand =>
			subcommand
				.setName('start')
				.setDescription('Start a new giveaway!')
				.addStringOption(option => option.setName('duration').setDescription('How long the giveaway should last for. Example values: 1s, 1m, 1h, 1d').setRequired(true))
				.addIntegerOption(option => option.setName('winners').setDescription('How many winners the giveaway should have').setRequired(true))
				.addStringOption(option => option.setName('prize').setDescription('The prize the winner will win').setRequired(true))
				.addChannelOption(option => option.setName('channel').setDescription('The channel to start the giveaway in').setRequired(false).addChannelTypes(ChannelType.GuildText))
				.addBooleanOption(option => option.setName('mentioneveryone').setDescription('@everyone for the giveaway').setRequired(false))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('actions')
				.setDescription('Perform an action on a giveaway.')
				.addStringOption(option => option.setName('action').setDescription('Action to perform').setRequired(true).addChoices(
					{ name: 'end', value: 'module_stop' },
					{ name: 'reroll', value: 'module_reroll' },
					{ name: 'pause', value: 'module_pause' },
					{ name: 'unpause', value: 'module_unpause' },
				))
				.addStringOption(option => option.setName('giveaway').setDescription('The giveaway to end (message ID)').setRequired(true))
		),
	async execute(interaction, client) {

		await interaction.deferReply({ ephemeral: true });

		const subCMD = interaction.options.getSubcommand();

		if (subCMD === 'start') {
			const giveawayChannel = interaction.options.getChannel('channel');
			const giveawayDuration = interaction.options.getString('duration');
			const giveawayWinnerCount = interaction.options.getInteger('winners');
			const giveawayPrize = interaction.options.getString('prize');
			const giveawayMention = interaction.options.getBoolean('mentioneveryone');

			if (!/\d/.test(giveawayDuration))
				return interaction.editReply({
					content: `${emoji.cross} Please specify a valid duration`,
					ephemeral: true,
				});

			var regex = /(\d+)([hms])/g;
			const match = regex.exec(giveawayDuration);

			if (!match)
				return interaction.editReply({
					content: `${emoji.cross} Please specify a valid duration`,
					ephemeral: true,
				});

			if (match) {
				client.giveawaysManager.start(giveawayChannel || interaction.channel, {
					duration: ms(match[0]),
					prize: giveawayPrize,
					winnerCount: giveawayWinnerCount,
					hostedBy: interaction.user || 'N/A',
					messages: {
						giveaway: (giveawayMention ? "@everyone\n" : ""),
						winMessage: 'Congratulations, {winners}! You won **[{this.prize}](<{this.messageURL}>)**!',
						embedFooter: "ClobNet Giveaway",
						inviteToParticipate: '🎉 Press the button below to enter!',
						dropMessage: 'Be the first to enter the giveaway!'
					},
					buttons: {
						joinReply: '🎉 Successfully joined the giveaway',
						leaveReply: '🎉 Successfully left the giveaway',
						join: new ButtonBuilder()
							.setEmoji('🎉')
							.setStyle(ButtonStyle.Primary)
							.setCustomId('giveaway_join')
					},
				});

				interaction.editReply({
					content: `${emoji.check} Giveaway started in ${giveawayChannel || interaction.channel}!`,
					ephemeral: true,
				});
			}
		}

		if (subCMD === 'actions') {
			const module = await interaction.options.getString('action');
			if (module === 'module_stop') {
				const query = interaction.options.getString('giveaway');
				const giveaway = client.giveawaysManager.giveaways.find(
					(g) => g.messageId === query && g.guildId === interaction.guild.id,
				);

				if (!giveaway) {
					return interaction.editReply({
						content: `${emoji.cross} Unable to find a giveaway for \`' + query + '\`.`,
						ephemeral: true,
					});
				}

				if (giveaway.ended) {
					return interaction.editReply({
						content: `${emoji.cross} This giveaway is already ended.`,
						ephemeral: true,
					});
				}

				client.giveawaysManager
					.end(giveaway.messageId)
					.then(() => {
						interaction.editReply({ content: `${emoji.check} Giveaway ended!`, ephemeral: true });
					})
					.catch((e) => {
						interaction.editReply({
							content: e,
							ephemeral: true,
						});
					});
			}
			if (module === 'module_reroll') {
				const query = interaction.options.getString('giveaway');

				const giveaway = client.giveawaysManager.giveaways.find(
					(g) => g.messageId === query && g.guildId === interaction.guild.id,
				);

				if (!giveaway) {
					return interaction.editReply({
						content: `${emoji.cross} Unable to find a giveaway for \`' + query + '\`.`,
						ephemeral: true,
					});
				}

				if (!giveaway.ended) {
					return interaction.editReply({
						content: `${emoji.cross} The giveaway has not ended yet.`,
						ephemeral: true,
					});
				}

				client.giveawaysManager
					.reroll(giveaway.messageId)
					.then(() => {
						interaction.editReply({ content: `${emoji.check} Giveaway rerolled!`, ephemeral: true });
					})
					.catch((e) => {
						interaction.editReply({
							content: e,
							ephemeral: true,
						});
					});
			}
			if (module === 'module_pause') {
				const query = interaction.options.getString('giveaway');

				const giveaway = client.giveawaysManager.giveaways.find(
					(g) => g.messageId === query && g.guildId === interaction.guild.id,
				);

				if (!giveaway) {
					return interaction.editReply({
						content: `${emoji.cross} Unable to find a giveaway for \`' + query + '\`.`,
						ephemeral: true,
					});
				}

				if (giveaway.pauseOptions.isPaused) {
					return interaction.editReply({
						content: `${emoji.cross} This giveaway is already paused.`,
						ephemeral: true,
					});
				}

				client.giveawaysManager
					.pause(giveaway.messageId)
					.then(() => {
						interaction.editReply({
							content: `${emoji.check} Giveaway paused!`,
							ephemeral: true,
						});
					})
					.catch((e) => {
						interaction.editReply({
							content: e,
							ephemeral: true,
						});
					});
			}
			if (module === 'module_unpause') {
				const query = interaction.options.getString('giveaway');

				const giveaway = client.giveawaysManager.giveaways.find(
					(g) => g.messageId === query && g.guildId === interaction.guild.id,
				);

				if (!giveaway) {
					return interaction.editReply({
						content: `${emoji.cross} Unable to find a giveaway for \`' + query + '\`.`,
						ephemeral: true,
					});
				}

				if (!giveaway.pauseOptions.isPaused) {
					return interaction.editReply({
						content: `${emoji.cross} This giveaway is not paused.`,
						ephemeral: true,
					});
				}

				client.giveawaysManager
					.unpause(giveaway.messageId)
					.then(() => {
						interaction.editReply({
							content: `${emoji.check} Giveaway unpaused!`,
							ephemeral: true,
						});
					})
					.catch((e) => {
						interaction.editReply({
							content: e,
							ephemeral: true,
						});
					});
			}
		}

	},
};
