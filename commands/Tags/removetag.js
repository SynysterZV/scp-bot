const { Tags } = require("../../dbInit")

module.exports = {
    help: {
        name: 'removetag',
        desc: 'Removes a Tag!',
        aliases: [''],
    },

    config: {
        args: true,
        usage: '{tag}',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        const tagName = args.join(' ').split('|').shift().trim()

        const rowCount = await Tags.destroy({ where: { name: tagName } });
        if(!rowCount) return message.reply('That tag didnt exist!')

        return message.reply('Tag Deleted!');
    }
}