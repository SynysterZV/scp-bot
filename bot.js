const { client } = require('./client/client')
const fs = require('fs');

fs.readdir('./events', (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0]
        client.on(eventName, event.bind(null))
        
    })
})

client.ws.on('INTERACTION_CREATE', async interaction => {
    const intname = interaction.data.name
    const int = client.interactions.get(intname)

    int.run(interaction, client)
})

client.login(process.env.TOKEN)