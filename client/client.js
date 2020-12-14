const Discord = require('discord.js');
const fs = require('fs');
const { token, apikeys } = require('./auth.json');
const { prefix } = require('./config.json');
const { Manager } = require('erela.js');
const Spotify = require('erela.js-spotify');
const Twit = require('twit');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.prefix = prefix;
client.token = token;
client.apikeys = apikeys
client.T = new Twit({
    consumer_key: apikeys.twitter.conkey,
    consumer_secret: apikeys.twitter.consec,
    access_token: apikeys.twitter.acckey,
    access_token_secret: apikeys.twitter.accsec,
});

/*
-------------------------
        Command
        Loader
-------------------------
*/

const commandFolders = fs.readdirSync('./commands', { withFileTypes: true }).filter(dirent => dirent.isDirectory());
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`../commands/${file}`)
    client.commands.set(command.help.name, command);
}


for(const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder.name}`).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`../commands/${folder.name}/${file}`)
        client.commands.set(command.help.name, command);
    }
}

/*
----------------------
        MUSIC
        MANAGER
        erela.js
----------------------
*/

const clientID = apikeys.spotify.spotifyID;
const clientSecret = apikeys.spotify.spotifySecret;

client.manager = new Manager({
    nodes: [
        {
            host: 'localhost',
            port: 2333,
            password: 'youshallnotpass',
        },
    ],
    plugins: [
        new Spotify({
            clientID,
            clientSecret,
        }),
    ],
    autoPlay: true,
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
})
    .on('nodeConnect', node => console.log("\x1b[36m",`Node ${node.options.identifier} connected`,"\x1b[0m"))
    .on('nodeError', (node, error) => console.log(`Node ${node.options.identifier} has had an error ${error}`))
    .on('trackStart', (player, track) => {
        const guild = client.guilds.cache.get(player.guild);
        const req = guild.member(track.requester);
        const embed = new Discord.MessageEmbed()
            .setTitle('» Now Playing: ')
            .setDescription(`[${track.title}](${track.uri})`)
            .setAuthor(req.user.tag, req.user.displayAvatarURL())
            .setFooter(guild, guild.iconURL())
            .setTimestamp()
            .setThumbnail(track.thumbnail);
        if(track.uri !== 'https://www.youtube.com/watch?v=Q-tH0olciZU') {
        client.channels.cache.get(player.textChannel).send(embed).then(m => m.delete({ timeout: 10000 }));
    }
    else {return;}
    })
    .on('queueEnd', (player) => {
        client.channels.cache
            .get (player.textChannel)
            .send('Queue has ended.');

        player.destroy();
    })
    .on('playerMove', (player, currentChannel, newChannel) => {
        player.voiceChannel = client.channels.cache.get(newChannel);
    });

    client.on('raw', (d) => client.manager.updateVoiceState(d));

/*------------------------------------------------------------------------------------------------------------------*/

module.exports = { client }