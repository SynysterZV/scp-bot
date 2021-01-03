const { Tags } = require('../dbInit')
module.exports = async (message) => {
    if (!message.content.startsWith(message.client.prefix)&& !message.guild) {
        if (message.author.bot) return;
        const embed = new Discord.MessageEmbed()
            .setTitle('DM')
            .setTimestamp()
            .setDescription(`${message.content}`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(0xff0000)

        message.client.users.cache.get('372516983129767938').send(embed)
    }

    let prefix;
    if (message.content.startsWith(message.client.prefix)) {
        prefix = message.client.prefix
    } else {
        const guildPrefix = await message.client.prefixes.get(message.guild.id);
        if (message.content.startsWith(guildPrefix)) prefix = guildPrefix
    }
    if (!prefix) return

    const args = message.content.slice(prefix.length).trim().split(/\s+/);

    const tagMaybe = args
    const tagAgain = tagMaybe.join(' ').split('|').shift().trim()
    const commandName = args.shift().toLowerCase();
    const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));



    if(!command) {
        const tagName = tagAgain

        const tag = await Tags.findOne({ where: { name: tagName } });
        if (tag) {

            tag.increment('usage_count');
            return message.channel.send(`${tag.get('description')}`);
        }
        return;
    };

    if(require('../client/commandOptions/options').options(message, command, args)) return;

    try {
        command.execute(message, args, message.client);
    }
    catch(error){
        console.log(error)
        message.reply('there was an error trying to execute that command!')
    }
}