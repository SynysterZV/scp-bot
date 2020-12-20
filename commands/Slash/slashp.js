module.exports = {
    help: {
        name: 'emoji',
        desc: 's',
        aliases: [''],
    },

    config: {
        args: false,
        usage: '',
        perms: ['ADMINISTRATOR'],
        role: false,
    },

    async execute(message, args) {
        if(args[0] == 'post') {
            try{
            message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands.post({
                data: {
                        name: 'emoji',
                        description: 'emoji',
                        options: [
                        {
                            name: 'names',
                            type: 3,
                            description: 'Names of the emojis',
                            choices: [
                            {
                                name: 'SweetTanner',
                                value: `<:sweettanner:721467090757877790>`
                            }
                        ]
                    }
                        ]
                    }})
        }
        catch(e) {
            console.log(e)
        }
    }
    
            else if(args[0] == 'remove') {
                const commands = await message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands.get()
                const emoji = commands.find(e => e.name == 'emoji')
                try {
                    message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands(emoji.id).delete()
                }
                catch(e) {
                    console.log(e);
                }
    
            }

            else if(args[0] == 'edit') {
                const commands = await message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands.get()
                const emoji = commands.find(e => e.name == 'emoji')
                try {
                    message.client.api.applications(message.client.user.id).guilds(message.guild.id).commands(emoji.id).patch({
                        data: {
                            name: 'emoji',
                            description: 'emoji',
                            options: [
                            {
                                name: 'names',
                                type: 3,
                                description: 'Names of the emojis',
                                required: true,
                                choices: [
                                {
                                    name: 'SweetTanner',
                                    value: `<:sweettanner:721467090757877790>`
                                },
                                {
                                    name: 'DJS',
                                    value: `<:notLikeCat:356879787962269707>`
                                },
                                {
                                    name: 'ButterCat',
                                    value: `<:confusedBecel:738059787412963419>`
                                },
                                {
                                    name: 'Beeg',
                                    value: '<a:beeg:587026903584735243>',
                                },
                                {
                                    name: 'VibeCat',
                                    value: '<a:wutvibin:738566075528249354>'
                                }
                            ]
                        }
                            ]
                        }})
                }
                catch(e){
                    console.log(e);
                }
            }
    }
}

// <:yoff:555418548739244043>