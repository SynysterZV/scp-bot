module.exports = async (member) => {
    const Discord = require('discord.js');
    member.client.guilds.fetch(member.guild.id)
    const channel = member.guild.channels.cache.find(c => c.name === 'member-log')
    if(!channel) return;
    const embed = new Discord.MessageEmbed()
        .setTitle('Member Left')
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL(), `https://discord.com/users/${member.user.id}`)
        .addFields(
            {
                name: '**Created At:**', value: new Date(member.user.createdAt).toDateString(), inline: true,
            },
            {
                name: '**Left:**', value: new Date(Date.now()).toDateString(), inline: true,
            },
            {
                name: '\u200b', value: '\u200b', inline: true,
            }, 
            {
                name: '**ID:**', value: member.user.id, inline: true,
            },
            {
                name: '**Profile:**', value: member.user, inline: true
            }
        )
        .setFooter(member.guild.name, member.guild.iconURL())
        .setThumbnail(member.user.displayAvatarURL({ size: 512 }))
        .setColor('RED')
    channel.send(embed)
}
