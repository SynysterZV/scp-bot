const fetch = require('node-fetch')
const qs = require('querystring')

module.exports = {
    help: {
        name: 'docs',
        desc: 'Get DJS Docs',
        aliases: [''],
    },

    config: {
        args: true,
        usage: '{ djs query }',
        perms: false,
        role: false,
    },

    async execute(message, args) {
        let mes = message.content
        let includePrivate = true
        let query = mes.includes('--') ? args.join(' ').split('--')[0].trim() : args.join(' ')
        let source = mes.includes('--') ? mes.split('--')[1] : 'stable'


        
        console.log( query, source )
        const DOCUMENTATION_SOURCES = [
            'stable',
            'master',
            'rpc',
            'commando',
            'akairo',
            'akairo-master',
            'v11',
            'collection',
        ];

        if (!DOCUMENTATION_SOURCES.includes(source)) {
            return message.channel.send('That source doesnt exist!')
        }

        if (source === 'v11') {
            source = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${source}.json`;
        }

        const queryString = qs.stringify({ src: source, q: query, force: false, includePrivate})
        const embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryString}`).then(res => res.json());

        if(!embed) {
            message.channel.send('No Results!')
        }
        message.channel.send({embed})
    }
}