const { post } = require('axios')

module.exports = {
    name: 'clear',
    run(interaction, client) {
        const headers = client.headers
        client.channels.fetch(interaction.channel_id).then(c =>
        c.bulkDelete(interaction.data.options[0].value))

        post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
        {
            type: 3,
            data: {
                flags: 1<<6,
                content: `${interaction.data.options[0].value} message(s) have been deleted!`,
            },
            headers
        })
    }
}