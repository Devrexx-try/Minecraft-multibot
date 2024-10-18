// bot.js
// Created by Rexx (rexx.pro@proton.me)

const readline = require('readline');
const config = require('./config');
const { spawnBots } = require('./botHandlers');

// User input prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter Minecraft server IP or domain: ', (serverIP) => {
  config.serverIP = serverIP;
  
  rl.question('Enter Minecraft server port (default: 25565): ', (portInput) => {
    config.serverPort = portInput ? parseInt(portInput, 10) : 25565;
    
    rl.question('Enter number of bots to join: ', (botsCount) => {
      config.numberOfBots = parseInt(botsCount, 10);
      spawnBots(config.numberOfBots);
      rl.close();
    });
  });
});

