module.exports = {
    help: {
        name: 'reauth',
        desc: 're',
        aliases: [''],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: 'Owner',
    },

    execute(message, args) {
        try {
        message.guild.leave()
        message.guild.addMember(message.client.user, { accessToken: `${message.client.token}`, nick: 'Bruv'})
        } catch (e){
            console.log(e)
        }
    }
}