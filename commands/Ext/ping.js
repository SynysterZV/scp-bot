module.exports = {
    help: {
        name: 'ping',
        desc: 'ping!',
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message) {
        message.channel.send('Loading...').then(async m => {
            const ping = m.createdTimestamp - message.createdTimestamp
            await m.edit(`Pong! Latency is ${ping}ms | API Latency is ${message.client.ws.ping}ms`);
        })
    },
};