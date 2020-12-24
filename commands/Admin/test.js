

module.exports = {
    help: {
        name: 'test',
        desc: 'test',
        aliases: [''],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        message.channel.send(`${new Date(message.client.uptime).toISOString().slice(11,19)}`)
    }
}