const fs = require('fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./events`);
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of eventFiles) {
                const event = require(`../../events/${folder}/${file}`);

                if (!event.name) {
                    console.error(`Error: ${file} does not have a 'name' property`);
                    continue;
                }

                if (folder === 'client') {
                    if (event.once) {
                        client.once(event.name, (...args) => event.execute(...args, client));
                    } else {
                        client.on(event.name, (...args) => event.execute(...args, client));
                    }
                }
                
                // Uncomment and modify the following block if you have mongo events
                // if (folder === 'mongo') {
                //     if (event.once) {
                //         connection.once(event.name, (...args) => event.execute(...args, client));
                //     } else {
                //         connection.on(event.name, (...args) => event.execute(...args, client));
                //     }
                // }
            }
        }
    }
}
