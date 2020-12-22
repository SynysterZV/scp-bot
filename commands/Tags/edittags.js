const { Tags } = require("../../dbInit");

module.exports = {
    help: {
        name: 'edittag',
        desc: 'Edit a tag',
        aliases: [''],
    },

    config: {
        args: true,
        usage: '{tag}',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        const ar = args.join(' ').split('|');
        const tagName = ar.shift().trim()
        console.log(`AR: ${ar}\ntagName: ${tagName}`)
        const tagDescription = ar.join(' ');

        try {
        const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
        if(affectedRows > 0) {
            return message.reply(`Tag ${tagName} was edited!`);
        }
        return message.reply(`Could not tag: ${tagName}!`);
    } catch (e) {
        console.log(e)
    }
    }
}