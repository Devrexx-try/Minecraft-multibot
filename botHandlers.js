// botHandlers.js
// Created by Rexx (rexx.pro@proton.me)

const mineflayer = require('mineflayer');
const { randomUsername } = require('./utils');
const config = require('./config');

// Function to auto-authenticate
function handleAutoAuth(bot) {
  bot.on('message', (message) => {
    const msg = message.toString().toLowerCase();
    if (msg.includes('/register')) bot.chat('/register lol1234L lol1234L');
    if (msg.includes('/login')) bot.chat('/login lol1234L');
  });
}

function afkBypass(bot) {
  setInterval(() => {
    const movements = ['forward', 'back', 'left', 'right', 'jump'];
    bot.setControlState(movements[Math.floor(Math.random() * movements.length)], true);
    setTimeout(() => {
      bot.clearControlStates();
    }, 1000);
  }, Math.floor(Math.random() * 45000) + 15000);
}

// Create bot
function createBot() {
  const botOptions = {
    host: config.serverIP,
    port: config.serverPort,
    username: randomUsername(),
    version: false,
  };

  const bot = mineflayer.createBot(botOptions);

  bot.on('login', () => {
    console.log(`${bot.username} joined the server.`);
    afkBypass(bot);
    handleAutoAuth(bot);
    simulateLag(bot);
  });

  bot.on('end', () => {
    console.log(`${bot.username} disconnected. Attempting to reconnect...`);
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => console.log(`${bot.username} error: ${err.message}`));
  bot.on('kicked', (reason) => {
    console.log(`${bot.username} was kicked from the server: ${reason}`);
  });

  return bot;
}

// Simulate lag by sending messages periodically
function simulateLag(bot) {
  setInterval(() => {
    bot.chat('lol kid');
  }, 5000);
}

// Spawn bots
function spawnBots(numberOfBots) {
  for (let i = 0; i < numberOfBots; i++) {
    setTimeout(() => {
      createBot();
    }, i * 5000); // 5-second delay between bot joins
  }
}

module.exports = { spawnBots };

