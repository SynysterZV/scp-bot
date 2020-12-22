const Discord = require('discord.js');
const fs = require('fs');
const { Manager } = require('erela.js');
const Spotify = require('erela.js-spotify');

const { token, apikeys } = require('./auth.json');
const { prefix } = require('./config.json');


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.interactions = new Discord.Collection()
client.prefix = prefix;
client.token = token;
client.apikeys = apikeys

client.headers = {
    Authorization: `Bot ${client.token}`
}


/*
-------------------------
        Command
        Loader
-------------------------
*/

const commandFolders = fs.readdirSync('./commands', { withFileTypes: true }).filter(dirent => dirent.isDirectory());
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const interactions = fs.readdirSync('./interactions').filter(file => file.endsWith('.js'));

// Top level commands from command folder 

for(const file of commandFiles) {
    const command = require(`../commands/${file}`)
    client.commands.set(command.help.name, command);
}

// Searches command folder for folders, gets commands from those folders

for(const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder.name}`).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`../commands/${folder.name}/${file}`)
        client.commands.set(command.help.name, command);
    }
}

// Interactions for Slash Commands

for(const file of interactions) {
    const interaction = require(`../interactions/${file}`)
    client.interactions.set(interaction.name, interaction)
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