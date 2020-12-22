const { post } = require('axios')

module.exports = {
    name: 'send',
    run(interaction, client) {
        const headers = client.headers
        post(`https://discord.com/api/v8/webhooks/${client.user.id}/${interaction.token}`,
        {
            content: `${interaction.data.options[0].value}`,
            flags: 1<<6,
            headers
    })
    }
}