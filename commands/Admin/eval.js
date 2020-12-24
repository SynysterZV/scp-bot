const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

const { MessageEmbed, SnowflakeUtil } = require(`discord.js`)

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

        try {
            const code = args.join(' ').replace(/^`{1,3}|`{1,3}$/g, '')
            let evaled = await eval(code)

            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);
                
            message.channel.send(clean(evaled), {code:"xl", split: true});
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
        }
    }
}