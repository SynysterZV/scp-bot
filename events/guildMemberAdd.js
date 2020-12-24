

module.exports = (member) => {
    const Discord = require('discord.js');
    const channel = member.guild.channels.cache.find(c => c.name === 'member-log')
    const embed = new Discord.MessageEmbed()
        .setTitle('Member Joined')
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL(), `https://discord.com/users/${member.user.id}`)
        .setDescription(`**Created At:** ${member.user.createdAt}\n**Joined:** ${member.joinedAt}`)
    channel.send(embed)
}


