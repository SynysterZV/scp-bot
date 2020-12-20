const { post } = require('axios')

module.exports = {
    name: 'ping',
    run(interaction, client) {
        const headers = client.headers
        post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
        {
            type: 3,
            data:{
                content: `Pong! Latency is ${client.ws.ping}ms`,
                flags: 1<<6
            },
            headers
        })
    }
}