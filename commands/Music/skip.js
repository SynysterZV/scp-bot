const { description } = require("c:/users/rocko/desktop/bot/commands/skip");

module.exports = {
    help: {
        name: 'skip',
        desc: 'Skips the current song, a certain track, or a range of tracks',
        aliases: ['s'],
    },

    config: {
        args: false,
        usage: '{ Track # | Track # Range }',
        perms: false,
        role: false,
    },

    execute(message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('There is no player for this guild');

        const { channel } = message.member.voice;
        if (!channel) return message.reply('You need to join a voice channel.')
        if (channel.id !== player.voiceChannel) return message.reply('You\'re not in the same channel as the player.');

        if (!player.queue.current) return message.reply('There is no music playing!');

        const { title } = player.queue.current;
        let song

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            if(player.queue.current.requester.id !== message.author.id) return message.reply('You did not request this track!');
        }

        if(!args.length) {
            player.stop();
            song = `${title} was skipped`;
        }
        else if (args.length == 1) {
            if (isNaN(args[0])) return message.reply('You must reply which track NUMBER to skip!');
            song = `${player.queue[args[0] - 1].title} was skipped`;

            player.queue.remove(args[0] - 1);
        }
        else if (args.length == 2) {
            if (isNaN(args[0]) || isNaN(args[1])) return message.reply('You must specify which track NUMBERS to skip!');
            song = `${args[1] - args[0] + 1} Tracks Skipped`;
            player.queue.remove(args[0] -1, args[1]);
        }
        return message.reply(`${song}`);
    }
}