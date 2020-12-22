const { ShardingManager } = require('discord.js');
const { token } = require(`./client/auth.json`)
const manager = new ShardingManager('./bot.js', { token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();