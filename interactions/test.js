const { post } = require('axios')

module.exports = {
    name: 'test',
    run(interaction, client) {
        const headers = client.headers
        post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
        {
            method: 'POST',
            type: 3,
            data: {
                content: 'test'
            },
            headers
            
        })
    }
}