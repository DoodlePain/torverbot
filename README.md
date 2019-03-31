# TorVerBot

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/doodlepain/torverbot)
# Description
Torverbot is a magic Telegram bot that allows you to fetch data from Tor Vergata CS website directly from the smartphone.
The bot is written entirely in Javascript
 and drop images (requires your Dropbox account be linked)

### Features

The main benefits of this bots are:
* Easy to read - the data is worked to have an "human" shape
* Easy to access - you just have to start chatting with @Tor_VerBot
* 24/7 - accessible day/night
* Indipendent - works even if the website is offline
* Open-Source - anyone is allowed to take a look and give feedback/fixes

### Contributing

Want to contribute? Great!
To contribute please talk with the repository owner.

### Installation

Installation is quite easy.
You have to 
```
git clone https://github.com/DoodlePain/torverbot.git
cd torverbot
npm install
````
now you have to set up the bot's access token.

Go ahead to the BotFather and create a bot, as you get the access token you have to
create one file inside './Server' folder called 'accessToken.js'
Inside teh file you have to write:
```
exports.aT = 'YOUR_BOT_ACCESS_TOKEN'
```

Now you are ready to go, type 'node index.js'


