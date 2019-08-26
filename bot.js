const { Builder, By, Key, until } = require('selenium-webdriver');

async function bot(gameId, nickname) {
    let driver = new Builder().forBrowser('chrome').build();
    try {
        await driver.get("https://kahoot.it");
        await driver.findElement(By.name("gameId")).sendKeys(gameId, Key.RETURN);
        await driver.wait(until.urlIs("https://kahoot.it/v2/join"), 1000);
        await driver.findElement(By.name("nickname")).sendKeys(nickname, Key.RETURN);
        await driver.wait(until.urlIs("https://kahoot.it/v2/start"));
    } finally {
        console.log("Game starting...");
        loop();
    }
    async function loop() {
        driver.getCurrentUrl()
            .then(async url => {
                if (url === "https://kahoot.it/v2/ranking") {
                    console.log("Game Complete");
                    await driver.close();
                } else if (url === "https://kahoot.it/v2/gameblock") {
                    await driver.findElement(By.css("button[data-functional-selector=\"answer answer-1\"]")).click();
                    console.log("Answerd: 1")
                    loop();
                } else loop();
            })

    }
}

module.exports = bot;