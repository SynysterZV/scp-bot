module.exports = {
    help: {
        name: 'stop',
        desc: 'Stops the player',
        aliases: ['st'],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    execute(message, args) {
        const player = message.client.manager.get(message.guild.id);
        const { channel } = message.member.voice;

        if (!channel) return message.reply('You need to be in a voice channel.');
        if (channel.id !== player.voiceChannel) return message.reply('Youre not in the same voice channel');

        player.destroy();
        return message.reply('Stopped the player!');
    }
}