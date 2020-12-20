const { client } = require('./client/client')
const Discord  = require('discord.js');
const { applyImage } = require('./client/joinimage')
const { post } = require('axios');
const fetch = require('node-fetch')

client.on('ready', () => {
    console.log('Ready!')
})



client.on('guildMemberAdd', async (member) => {
    applyImage(member);
    return;
})

client.ws.on('INTERACTION_CREATE', async interaction => {
    const intname = interaction.data.name
    const int = client.interactions.get(intname)
    int.run(interaction, client)
})



client.on('message', async message => {

    if (!message.content.startsWith(client.prefix) && !message.guild) {
        if (message.author.bot) return;
        const embed = new Discord.MessageEmbed()
            .setTitle('DM')
            .setTimestamp()
            .setDescription(`${message.content}`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(0xff0000)

        client.users.cache.get('372516983129767938').send(embed)
    }

    if(!message.content.startsWith(client.prefix) || message.author.bot) return;

    const args = message.content.slice(client.prefix.length).trim().split(/\s+/);

    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    if(!command) return;

    if(command.config.perms && !message.member.hasPermission(command.config.perms)) return message.reply('you dont have permission to use this command!')

    if (command.config.role && !message.member.roles.cache.some(role => role.name === `${command.config.role}`)) {
        if (message.author.id !== message.guild.ownerID) return message.reply('you dont have the role to use this command');
    }

    if (command.config.args && !args.length) {
        let reply = `You didnt provide any arguments, ${message.author}`;

        if(command.config.usage){
            reply += `\nThe correct usage for this command would be \`${client.prefix}${command.help.name} ${command.config.usage}\``
        }
        return message.channel.send(reply)
    }

    try {
        command.execute(message, args, client);
    }
    catch(error){
        console.log(error)
        message.reply('there was an error trying to execute that command!')
    }
});

client.login(client.token)