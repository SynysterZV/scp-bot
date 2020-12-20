const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'reactionTicket',
        desc: 'Reaction Ticket Embed Creator',
        aliases: ['rt'],
    },

    config: {
        args: true,
        usage: '',
        perms: ['ADMINISTRATOR'],
        role: false,
    },

    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Reaction Tickets')
            .setDescription('Click the arrow to create a ticket')
            .setFooter(message.guild, message.guild.iconURL())
            .setTimestamp()
            .setAuthor(message.client.user.tag, message.client.user.displayAvatarURL())

        message.channel.send(embed).then(m => {
            m.react('✔️')

            const filter = (reaction, user) => {return reaction.emoji.name == '✔️' && user.id == message.author.id}

            m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const chan = message.guild.channels.cache.find(c => c.name === 'tickets')
                    const mem = collected.first().users.cache.get(message.author.id);
                    const embed = new MessageEmbed()
                        .setTitle(`${mem.tag}'s Ticket`)
                        .setDescription('Example')
                        .setFooter(message.guild, message.guild.iconURL())
                        .setTimestamp()
                        .setAuthor(mem.tag, mem.displayAvatarURL())

                    chan.send(embed);
                })
        });
    }
}