module.exports = {
    help: {
        name: 'info',
        desc: 'Displays the Bots info',
        aliases: ['owner'],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        const CA = await message.client.fetchApplication()
        const embed = new (require('discord.js')).MessageEmbed()
            .setAuthor(message.client.user.tag, message.client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription('I am an all around bot with some simple functions, including simple moderation and music commands')
            .addFields(
                {
                    name: '**Creator:**', value: 'Synyster#6666'
                },
                {
                    name: '**Owner:**', value: CA.owner
                },
                {
                    name: '**Application Created:**', value: new Date(CA.createdTimestamp).toDateString()
                },
                {
                    name: '**Uptime:**', value: `${message.client.uptime / 1000} seconds`
                }
            )
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()

            message.channel.send(embed)
    }
}