const { post } = require('axios')

module.exports = {
    help: {
        name: 'reply',
        desc: 'New replies',
        aliases: [''],
    },

    config: {
        args: false,
        usage: '',
        perms: false,
        role: false,
    },

    execute(message, args) {
        const headers = message.client.headers
        post('https://discord.com/api/webhooks/791578378788012033/TTEaKcDbj75hVGiyy9Z3pMq3RxB3u9Y2kqaN_dLgM2imIg6q3ymIq9D-r-IlmNBNr_B7', 
        {
            type: 19,
            content: 'Hi'
        }
        )
    }
}