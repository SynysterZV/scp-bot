const { post } = require('axios')

module.exports = {
    name: 'emoji',
    run(interaction, client) {
        const headers = client.headers
        post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
        {
            type: 3,
            data: {
                content: `${interaction.data.options[0].value}`,
            },
            headers
        })
    }
}