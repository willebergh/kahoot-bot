const bot = require("./bot");

function spam(gameId, prefix) {
    var count = 0;
    var intr = setInterval(function () {
        bot(gameId, `${prefix}${count}`);
        if (++count == 10) clearInterval(intr);
    }, 200)
}

spam("gemeId", "bot_name");
