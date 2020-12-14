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

    execute(message) {
        console.log(Date.now())
        message.reply(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms.`);
    },
};