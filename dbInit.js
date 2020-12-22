const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

// Models for now

const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.TEXT,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    pfp: Sequelize.TEXT,
});

Tags.sync();
console.log('DB Synced!')

module.exports = { Tags }