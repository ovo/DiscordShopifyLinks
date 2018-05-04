const request = require('request-promise');
const path = require('path');
const config = require(path.join(__dirname, 'config.json'));
const cheerio = require('cheerio')
const Discord = require('discord.js');
const bot = new Discord.Client();



bot.on('message', msg => {
    if (msg.author.bot || !msg.content.startsWith(config.prefix)) return;
    const args = msg.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    function getlinks() {
        this.links = []
        this.title = []
        if (command === 'links') {
            content = msg.content.slice(7)
            const opts = {
                method: 'GET',
                uri: `${content}.json`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
                },
                gzip: true,
                json: true
            }
            request(opts)
                .then(function (json) {
                    json.product.variants.forEach(function (size) {
                        var atclink = (`${size.title} - http://${content.split('//')[1].split('/')[0]}/cart/${size.id}:1`);
                        links.push(atclink)
                    })
                    var name = (`${json.product.title}`)
                    title.push(name)
                })
                .catch(function (e) {
                    console.error('Error: No vairents found')
                    title.push('N/A')
                    links.push('Cannot find varients for that item')
                })
            
            }
        }
    function send () {
        var embed = new Discord.RichEmbed()
            .setAuthor(title)
            .setDescription(links)
            .setTimestamp(new Date().toISOString())
            .setColor(0x0E76BD)
            .setFooter('made by Tago Mago', 'https://cdn.discordapp.com/embed/avatars/0.png')
        msg.channel.send(embed)
    }
    function exec(err) {
        getlinks()
        setTimeout(send, 1000)
        var clear = ""
        links.push(clear) 
        
    }

    exec()

})

bot.login(config.token)