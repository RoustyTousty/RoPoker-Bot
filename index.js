require('dotenv').config()
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const { connect } = require('mongoose');
const giveawayModel = require("./schemas/giveaway");
const { GiveawaysManager } = require('discord-giveaways');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],

  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
});

process.on('unhandledRejection', (err) => {
  console.log(err)
});

process.on('uncaughtException', (err) => {
  console.log(err)
});

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  async getAllGiveaways() {
    return await giveawayModel.find().lean().exec();
  }

  async saveGiveaway(messageId, giveawayData) {
    await giveawayModel.create(giveawayData);
    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await giveawayModel
      .updateOne({ messageId }, giveawayData, { omitUndefined: true })
      .exec();
    return true;
  }

  async deleteGiveaway(messageId) {
    await giveawayModel.deleteOne({ messageId }).exec();
    return true;
  }
};

const manager = new GiveawayManagerWithOwnDatabase(client, {
  default: {
    botsCanWin: false,
    embedColor: "#4CCDEA",
    embedColorEnd: "#4CCDEA",
    embedFooter: "ClobNet Giveaway",
    lastChance: {
      enabled: false,
    },
  },
});

client.messageCounts = new Map();
client.giveawaysManager = manager;
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync(`./functions/${folder}`).filter(file => file.endsWith('js'));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.login(process.env.CLOB_TOKEN);

(async () => {
  await connect(process.env.clobDBString).catch(console.error);
})();
