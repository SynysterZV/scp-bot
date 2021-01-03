

module.exports = {
    help: {
        name: 'restart',
        desc: 'reload the bot',
        aliases: [''],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: 'Owner',
    },

    execute(message, args) {
        message.client.destroy()
    }
}