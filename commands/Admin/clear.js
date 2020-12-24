module.exports = {
    help: {
        name: 'clear',
        desc: 'Clear N # of messages',
        aliases: ['c'],
    },

    config: {
        args: false,
        usage: '{ # of Messages }',
        perms: ['ADMINISTRATOR'],
        role: false,
    },

    async execute(message, args) {
        const amount = args.length ? args.join(' ') : 100
        if (isNaN(amount)) return message.reply('Amount needs to be a number!');
        if (amount < 1 || amount > 100) return message.reply('Amount needs to be 1-100');

        await message.channel.messages.fetch({ limit: amount }).then(messages => {
            message.channel.bulkDelete(messages, true);
        })
        
    }
}