const { Tags } = require("../../dbInit")
const { MessageEmbed } = require('discord.js')

module.exports = {
    help: {
        name: 'taginfo',
        desc: 'Shows a tags info',
        aliases: [''],
    },

    config: {
        args: true,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        const tagName = args.join(' ');

        const tag = await Tags.findOne({ where: { name: tagName } });
        if (tag) {
            const content = tag.description.trim().replace(/^`{1,3}|`{1,3}$/g, '')
            const embed = new MessageEmbed()
                .setAuthor(`Created by: ${tag.username}`, tag.pfp)
                .setTitle(`${tag.name}`)
                .setDescription(`**Created At:** ${tag.createdAt}\n**Used:** ${tag.usage_count} times`)
                .addField('**Content:**', `\`\`\`${content}\`\`\``)
                .setColor(0xff0000)
                .setFooter(message.guild.name)
                .setTimestamp()

            return message.channel.send(embed)
        }
        return message.reply(`Could not find: ${tagName}`);
    }
}