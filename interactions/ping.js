const { post } = require('axios')
const { SnowflakeUtil } = require('discord.js')

module.exports = {
    name: 'ping',
    async run(interaction, client) {
        const headers = client.headers
        let ping
        const chan = await client.channels.fetch(interaction.channel_id).then(async c => {
            await c.send('Loading').then(m => {
                m.delete()
                ping = m.createdTimestamp - SnowflakeUtil.deconstruct(interaction.id).timestamp 
                
            })
        })
        
        post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
        {
            type: 3,
            data:{
                content: `Pong! Latency is ${ping}ms`,
                flags: 1<<6
            },
            headers
        })
    }
}