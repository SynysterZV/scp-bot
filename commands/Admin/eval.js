const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

const { MessageEmbed, SnowflakeUtil } = require(`discord.js`)
const { post } = require('axios')

module.exports = {
    help: {
        name: 'evaluate',
        desc: 'Evaluates',
        aliases: ['eval'],
    },

    config: {
        args: true,
        usage: '{code to eval}',
        perms: false,
        role: 'Owner',
    },

    async execute(message, args) {
        let evaled
        if(args[0] === 'command') {
    
            const command = message.client.commands.get(args[1].split('.')[0]) || message.client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[1].split('.')[0]));
            if (!command) return message.channel.send('That command doesnt exist!')

            evaled = await command.execute.toString(); 
        } else {
        try {
            const code = args.join(' ').replace(/(^`{1,3}|(?<=```)js)|`{1,3}$/g, '').trim()
            console.log(code)
            evaled = await eval(`( async () => {
                return ${code}
            })()`);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
        }}

        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

        message.channel.send(clean(evaled), {code:"xl", split: true});
    }
}