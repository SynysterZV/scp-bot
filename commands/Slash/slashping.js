const { description } = require("c:/users/rocko/desktop/bot/commands/test")

module.exports = {
    help: {
        name: 'slashping',
        desc: 'Slash Command Deplyoment',
        aliases: ['sp'],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message, args, client) {
        
        if(args[0] == 'post') {
        try{
        message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands.post({
            data: {
            name: 'ping',
            description: 'ping pong',
        }})
    }
    catch(e) {
        console.log(e)
    }
}

        else if(args[0] == 'remove') {
            const commands = await message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands.get()
            const ping = commands.find(ping => ping.name == 'ping')
            try {
                message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands(ping.id).delete()
            }
            catch(e) {
                console.log(e);
            }

        }
    }
}