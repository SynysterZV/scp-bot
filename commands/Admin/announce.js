const Discord = require('discord.js');

module.exports = {
    help: {
        name: 'announce',
        desc: 'Creates an embed in the #announcements channel',
        aliases: ['a'],
    },

    config: {
        args: true,
        usage: '{ announcement }',
        perms: ['ADMINISTRATOR'],
        role: false,
    },

    execute(message, args) {
        const channel = message.guild.channels.cache.find(ch => ch.name === 'announcements');
        if (!channel) {
            return message.reply('You do not have an announcements channel!');
        }
        const anon = args.join(' ');
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(), message.author.displayAvatarURL())
        .setColor(0xff0000)
        .setTimestamp()
        .setTitle('Announcement')
        .setFooter(`${message.guild}`, message.guild.iconURL())
        .setDescription(anon)
        .addField('\u200B', '\u200B')
        .setThumbnail(message.guild.iconURL());

        channel.send(embed);
    }
}