module.exports = {
    help: {
        name: 'invite',
        desc: 'Creates a bot invite link',
        aliases: [''],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        message.channel.send(`Invite the bot to your server with this link!\n ${(await message.client.generateInvite({permissions: ['ADMINISTRATOR']}))}`)
    }
}