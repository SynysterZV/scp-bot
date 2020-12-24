const { post } = require('axios')

module.exports = {
    name: 'eval',
    async run(interaction, client) {
        const headers = client.headers
        if(!client.guilds.cache.get(interaction.guild_id).ownerID === interaction.member.user.id) return
        let evaled = await eval(interaction.data.options[0].value)

        if(typeof evaled !== 'string') {
            evaled = require('util').inspect(evaled)
        }

        post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
        {
            type: 3,
            data: {
                flags: 1<<6,
                content: `\`\`\`${evaled}\`\`\``,
            },
            headers
        })
    }
}