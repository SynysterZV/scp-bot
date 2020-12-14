const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'avatar',
        desc: 'Displays Avatar of @\'d user or of the author',
        aliases: ['pfp'],
    },

    config: {
        args: false,
        usage: '{ @user }',
        perms: false,
        role: false,
    },

    execute(message, args) {

        const member = message.mentions.users.first() || message.author
        
        const embed = new MessageEmbed()
            .setTitle(`Avatar for ${member.tag}`)
            .setColor(0xff0000)
            .setImage(member.displayAvatarURL({ dynamic: true, size: 512 }));

        return message.channel.send(embed);
    }
}