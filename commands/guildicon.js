const { MessageEmbed } = require('discord.js')

module.exports = {
    help: {
        name: 'guildicon',
        desc: 'Displays Guilds Icon',
        aliases: ['gc'],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Guild Icon')
            .setTimestamp()
            .setFooter(message.guild, message.guild.iconURL())
            .setImage(message.guild.iconURL({ dynamic: true, size: 512 }));
        
        return message.channel.send(embed)
    }
}