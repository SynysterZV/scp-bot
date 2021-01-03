const message = require("./message");


module.exports = async (reload) => {
    if (!reload) return console.log('Ready!');
    console.log(reload)
}