// utils.js
// Created by Rexx (rexx.pro@proton.me)

const randomUsername = () => {
  const adjectives = ['Adventurer', 'Gamer', 'Player', 'Miner', 'Explorer'];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${randomNum}`;
};

module.exports = { randomUsername };

