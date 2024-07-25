const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const emoji = require('../config/emojis.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears messages from a channel')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addNumberOption(option =>
			option.setName('messages')
				.setRequired(true)
				.setDescription('Number of messages to clean')),
	async execute(interaction, client) {

		let deleteAmount = interaction.options.getNumber('messages');

		if (deleteAmount > 100) {
			deleteAmount = 100;
		}

		if (deleteAmount < 1) {
			return interaction.reply({
				content: emoji.cross + ' Please specify a number above 1',
				ephemeral: true,
			});
		}

		if (!Number.isInteger(deleteAmount)) {
			return interaction.reply({
				content: emoji.cross + ' Please specify a whole number',
				ephemeral: true,
			});
		}
		const fetchedMessage = await interaction.channel.messages.fetch({ limit: deleteAmount });
		
		interaction.channel.bulkDelete(fetchedMessage, true);
		interaction.reply({
			content: `${emoji.check} Successfully deleted ${fetchedMessage.size} messages`,
			ephemeral: true,
		});
	},
};
