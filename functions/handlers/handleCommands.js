require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {

        const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
        console.log("Command Files: ", commandFiles); // Log the command files found

        for (const file of commandFiles) {
            const command = require(`../../commands/${file}`);
            console.log("Loading Command: ", command); // Log each command being loaded

            if (!command.data || !command.data.name) {
                console.error(`Error: ${file} does not have a 'data.name' property`);
                continue;
            }

            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        }

        const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: client.commandArray }
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
}