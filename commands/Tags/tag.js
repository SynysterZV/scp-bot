const { Tags } = require("../../dbInit");

module.exports = {
    help: {
        name: 'tag',
        desc: 'Shows a specific tag',
        aliases: [''],
    },

    config: {
        args: true,
        usage: '{tag}',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        const tagName = args.join(' ')

        const tag = await Tags.findOne({ where: { name: tagName } });
        if (tag) {

            tag.increment('usage_count');
            return message.channel.send(`${tag.get('description')}`);
        }
        return message.reply(`Could not find tag: ${tagName}`)
    }
}