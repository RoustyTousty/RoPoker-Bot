const Levels = require('discord-xp');
const { EmbedBuilder, PermissionsBitField, AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const { profileImage } = require('discord-arts');
process.noDeprecation = true;
const emoji = require('../config/emojis.json')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('See a users current level')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user to view their rank')),
    async execute(interaction, client) {

        await interaction.deferReply();

        Levels.setURL(process.env.clobDBString);

        const target = interaction.options.getMember('user') || interaction.member;

        if (target.bot) {
            const botembed = new EmbedBuilder()
                .setColor('#4CCDEA')
                .setDescription(`${emoji.cross} ${target} is a bot!`);

            return interaction.editReply({ embeds: [botembed], ephemeral: true });
        }

        const user = await Levels.fetch(target.id, interaction.guild.id, true);

        const noxp = new EmbedBuilder()
            .setColor('#4CCDEA')
            .setDescription(`${emoji.cross} Seems like this user has not earned any xp so far.`);

        if (!user) return interaction.editReply({ embeds: [noxp], ephemeral: true });

        const rolesData = fs.readFileSync('./config/roles.json');
        const rolesMap = JSON.parse(rolesData).roles;
        let highestRoleID = "";
        let highestRolePriority = -1;

        target.roles.cache.forEach(role => {
            const roleIdString = role.id.toString();
            if (rolesMap[roleIdString] && rolesMap[roleIdString].priority > highestRolePriority) {
                highestRolePriority = rolesMap[roleIdString].priority;
                highestRoleID = roleIdString;
            }
        });

        let highestRoleImage = "";

        if (highestRoleID !== "") {
            highestRoleImage = rolesMap[highestRoleID].image;
        } else {
            const playerRole = rolesMap["1207408186353520700"];
            highestRoleImage = playerRole.image;
        }

        const neededXp = Levels.xpFor(parseInt(user.level) + 1);

        const buffer = await profileImage(target.id, {
            squareAvatar: true,
            customBackground: 'https://i.imgur.com/pWrMySS.png',
            //customBadges: [highestRoleImage],
            overwriteBadges: true,
            rankData: {
                currentXp: user.xp,
                requiredXp: neededXp,
                rank: user.position,
                level: user.level,
                barColor: '4CCDEA',
                autoColorRank: true
            },
        });

        const lastMessage = Math.floor(new Date(user.lastUpdated).getTime() / 1000);

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${target.user.username}'s Rank Card`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setColor('#4CCDEA')
            .setTimestamp()
            .setImage('attachment://profile.png')
            .setDescription(`Last Message: <t:${lastMessage}>`)
            .setFooter({
                text: 'ClobNet XP',
                iconURL: client.user.displayAvatarURL(),
            });

        const attachment = new AttachmentBuilder(buffer, { name: 'profile.png' });

        interaction.followUp({ embeds: [embed], files: [attachment] });
    },
};
