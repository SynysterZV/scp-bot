const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'help',
        desc: 'help'
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    async execute(message, args) {

        message.delete()

        function comsPage(conf, array) {
            const end = conf.page * conf.multiple
            const start = end - conf.multiple

            return array.slice(start, end);
        }

        const conf = {
            multiple: 10,
            page: 1
        }

        const array = message.client.commands.array();
        

        const coms = await comsPage(conf, array);
        const maxPages = Math.ceil(array.length / conf.multiple);

        const embed = new MessageEmbed()
            .setTitle('Help')
            .setColor(0xff0000)
            .setFooter(`Page ${conf.page > maxPages ? maxPages : conf.page} of ${maxPages}`)
            .setTimestamp()

        for(let i in coms){
            embed.addField(`${message.client.prefix}${coms[i].help.name}`, `${coms[i].help.desc}`);
        }
        
        message.channel.send(embed).then(async (m) => {
            m.react('⬅️');
            m.react('➡️');

            async function removeReac() {
                const userReactions = m.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                try {
                    for(const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                }
                    catch (error) {
                        console.error('Failed to remove reactions.', error);
                    }
            }

            const forward = (reaction, user) => {return reaction.emoji.name === '➡️' && user.id === message.author.id;};
            const backward = (reaction, user) => {return reaction.emoji.name === '⬅️' && user.id === message.author.id;};

            const backwardcol = m.createReactionCollector(backward, { time: 15000 });
            const forwardcol = m.createReactionCollector(forward, { time: 15000 });

            backwardcol.on('collect', async () => {
                conf.page = conf.page - 1
                if (conf.page < 1) {
                    removeReac()
                    return conf.page = conf.page + 1
                }

                const coms = await comsPage(conf, array)

                embed.fields = []
                embed.setFooter(`Page ${conf.page > maxPages ? maxPages : conf.page} of ${maxPages}`)

                for(let i in coms){
                    embed.addField(`${message.client.prefix}${coms[i].help.name}`, `${coms[i].help.desc}`);
                }

                m.edit(embed)
                await removeReac()
            })

            forwardcol.on('collect', async () => {
                conf.page = conf.page + 1
                if (conf.page > maxPages) {
                    removeReac()
                    return conf.page = maxPages
                }

                

                const coms = await comsPage(conf, array)

                embed.fields = []
                embed.setFooter(`Page ${conf.page > maxPages ? maxPages : conf.page} of ${maxPages}`)

                for(let i in coms){
                    embed.addField(`${message.client.prefix}${coms[i].help.name}`, `${coms[i].help.desc}`);
                }

                m.edit(embed);
                await removeReac()
            })
        });
    },

};