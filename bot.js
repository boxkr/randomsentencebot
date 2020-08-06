const Discord = require('discord.js')
const bot = new Discord.Client();

const token = process.env.DISCORD_TOKEN

const prefix = '-'

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
}




function generateRandomSentence() {

    let conjunction = ['and', 'or', 'but', 'because']
    let properNoun = ['Fred', 'Jane', 'Richard Nixon', 'Miss America', 'Joe', 'Joe Biden', 'Donald Trump', 'Big Don']
    let commonNoun = ['man', 'woman', 'fish', 'elephant', 'unicorn', 'big ass gorilla', 'child']
    let determiner = ['a', 'the', 'every', 'some',]
    let adjective = ['big', 'tiny', 'pretty', 'bald', 'ugly', 'brave', 'gentle', 'faithful', 'huge']
    let intransitive = ['runs', 'jumps', 'talks', 'sleeps', 'laughs', 'claps', 'yells', 'smells']
    let transitive = ['loves', 'hates', 'looks for', 'sees', 'knows', 'finds', 'sells', 'leaves', 'likes']



    let verbPhrase = function () {
        let decider = Math.floor(Math.random() * 4)
        switch (decider) {
            case 0:
                return getRandomElement(intransitive)
            case 1:
                return getRandomElement(transitive) + ' ' + nounPhrase()
            case 2:
                return 'is ' + getRandomElement(adjective)
            case 3:
                return 'believes that ' + nounPhrase() + ' ' + verbPhrase()
        }
    }

    let nounPhrase = function () {
        let decider = Math.round(Math.random())
        if (decider == 1) {
            return getRandomElement(properNoun)
        }
        else {
            return getRandomElement(determiner) + ' ' + getRandomElement(adjective) + ' ' + getRandomElement(commonNoun) + ' ' + 'who ' + verbPhrase()
        }
    }

    let simpleSentence = nounPhrase() + ' ' + verbPhrase()


    return simpleSentence

}


bot.on('ready', () => {
    console.log('bot online')
})

bot.on('message', (message) => {
    let args = message.content.substring(prefix.length).split(" ");



    if (message.content.startsWith(prefix)) {
        switch (args[0]) {
            case 'sentence':
                let randomSentence = generateRandomSentence();
                message.delete();
                message.channel.send(randomSentence)
                break;
        }
    }
})

bot.login(token);