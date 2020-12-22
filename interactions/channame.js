const { post } = require('axios')

module.exports = {
    name: 'channame',
    async run(interaction, client) {
        const headers = client.headers
        const mem = interaction.member
        post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
        {
            method: 'POST',
            type: 3,
            data: {
                content: `${client.channels.cache.get(`${interaction.data.options[0].value}`).setName(`${interaction.data.options[1].value}`).then(m => this.m)}`
            },
            headers
            
        })
    }
}