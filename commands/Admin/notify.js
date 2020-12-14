const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'notify',
        desc: 'Give a notification to all guild members',
        aliases: [''],
    },

    config: {
        args: true,
        usage: '{ notification message }',
        perms: ['ADMINISTRATOR'],
        role: false,
    },

    execute(message, args) {
        if(!args.length) return message.reply('You need to specify a message');
        if(message.mentions.users.first()) return message.reply('You cannot mention a user in a notificaiton');

        const embed = new MessageEmbed()
            .setColor(0xff0000)
            .setTitle('Notification')
            .setDescription(args.join(' '))
            .setFooter(message.guild, message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp();

        const guild = message.guild.members.cache;
        guild.forEach(member => {
            if (!member.user.bot) return member.user.send(embed);
        })
    }
}