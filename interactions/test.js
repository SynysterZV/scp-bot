const { post } = require('axios')

module.exports = {
    name: 'test',
    async run(interaction, client) {
        const headers = client.headers
        const mem = interaction.member
        post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
        {
            method: 'POST',
            type: 3,
            data: {
                content: `${mem.nick || mem.user.username}`
            },
            headers
            
        })
    }
}