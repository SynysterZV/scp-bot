const { Tags } = require("../../dbInit")
const { MessageEmbed } = require('discord.js')

module.exports = {
    help: {
        name: 'showtags',
        desc: 'Show all tags!',
        aliases: [''],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        const tagList = await Tags.findAll({ attributes: ['name'] });
        const tagString = tagList.map(t => t.name).join(`, `) || 'No tags were found!'
        
        const embed = new MessageEmbed()
            .setTitle('Tag List')
            .setDescription(`\`\`\`${tagString}\`\`\``)
        message.channel.send(embed)
    }
}