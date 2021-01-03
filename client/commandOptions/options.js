let options = (message, command, args) => {

//Permissions Handler    
if(command.config.perms && !message.member.hasPermission(command.config.perms)) return message.reply('you dont have permission to use this command!')

//Role Handler
if (command.config.role && !message.member.roles.cache.some(role => role.name === `${command.config.role}`)) {
    if (message.author.id !== message.guild.ownerID) return message.reply('you dont have the role to use this command');
}

//Arguments Hanlder
if (command.config.args && !args.length) {
    let reply = `You didnt provide any arguments, ${message.author}`;

    if(command.config.usage){
        reply += `\nThe correct usage for this command would be \`${message.client.prefix}${command.help.name} ${command.config.usage}\``
    }
    return message.channel.send(reply)
}
//Return
return;
}

module.exports = { options }