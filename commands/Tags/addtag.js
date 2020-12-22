const { Tags } = require('../../dbInit');

module.exports = {
    help: {
        name: 'addtag',
        desc: 'Adds a tag!',
        aliases: [''],
    },

    config: {
        args: true,
        usage: '{tag name} {tag description}',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        const ar = args.join(' ').split('|')
        const tagName = ar.shift().trim().replace(/^`{1,3}|`{1,3}$/g, '')
        const tagDescription = ar.join(' ')

        try {
            const PFP = message.author.displayAvatarURL()
            const tag = await Tags.create({
                name: tagName,
                description: tagDescription,
                username: message.author.tag,
                pfp: PFP
            });
            return message.reply(`Tag ${tag.name} added.`);
        }
        catch(e) {
            if (e.name === 'SeqelizeUniqueContraintError') {
                return message.reply('That tag already exists!')
            }
            console.log(e)
            return message.reply('Something went wrong with adding a tag')
        }
    }
}