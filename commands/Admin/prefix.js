const message = require("../../events/message")

module.exports = {
    help: {
        name: 'prefix',
        desc: 'Set the guilds prefix',
        aliases: ['pfx'],
    },

    config: {
        args: false,
        usage: '{ prefix || reset }',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        let prefix;
        if(args.length) {
            if(!message.member.permissions.has(['MANAGE_GUILD'])) return message.channel.send('You dont have the require perms to use this command');
            if(args[0].toLowerCase() === 'reset') {
                await message.client.prefixes.set(message.guild.id, message.client.prefix)
                return message.channel.send('Your prefix has been reset!')
            } else {
                await message.client.prefixes.set(message.guild.id, args[0]);
                return message.channel.send(`Successfully set your prefix to \`${args[0]}\``)
            }
        }
        return message.channel.send(`Prefix is \`${await message.client.prefixes.get(message.guild.id) || message.guild.prefix}\``)
    }
}