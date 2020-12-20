module.exports = {
    help: {
        name: 'slashtest',
        desc: 's',
        aliases: ['stest'],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        if(args[0] == 'post') {
            try{
            message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands.post({
                data: {
                name: 'test',
                description: 'test',
            }})
        }
        catch(e) {
            console.log(e)
        }
    }
    
            else if(args[0] == 'remove') {
                const commands = await message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands.get()
                const ping = commands.find(ping => ping.name == 'test')
                try {
                    message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands(ping.id).delete()
                }
                catch(e) {
                    console.log(e);
                }
    
            }
    }
}