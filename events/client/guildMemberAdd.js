// const { profileImage } = require('discord-arts');

// module.exports = {
//     name: 'guildMemberAdd',
//     async execute(member, client) {

//         if (data) {
//             const channel = await client.channels.cache.get(data.settings.welcome.channel);
//             if (!channel) return;

//             const buffer = await profileImage(member.id, {
//                 squareAvatar: true,
//                 customBackground: 'https://i.imgur.com/pWrMySS.png',
//                 username: 'Welcome',
//                 borderColor: '#64a7cd',
//                 customTag: `@${member.user.username}`,
//                 subtitle: `Member Count: ${member.guild.memberCount}`,
//                 customBadges: ['https://i.imgur.com/WZxYvs2.png'],
//                 overwriteBadges: true,
//             });

//             channel.send({ files: [buffer] });
//         }
//     }
// }