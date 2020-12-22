module.exports = {
    help: {
        name: 'joinemit',
        desc: 'Emits a user join event',
        aliases: [''],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: 'Owner',
    },

    execute(message, args, client) {
        client.emit('guildMemberAdd', message.member)
    }
}