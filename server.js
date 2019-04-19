const http = require('http');
const express = require('express');
const app = express();
require('dotenv').config();

function checkHttps(req, res, next){
  // protocol check, if http, redirect to https  
  if(req.get('X-Forwarded-Proto').indexOf("https")!=-1){
    return next()
  } else {
    res.redirect('https://' + req.hostname + req.url);
  }
}

app.all('*', checkHttps);

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

let prefix = process.env.PREFIX;

client.on('ready', () => {
  console.log('DT Bot running');
});
/*
client.on('message', msg => {
  if (msg.content.startsWith("!set")) {
    let roleToAdd = msg.content.split(' ')[1];
    let role = msg.guild.roles.find(role => role.name === roleToAdd);
    if (!msg.member.roles.has(role.id)) {
      msg.member.addRole(msg.guild.roles.find(role => role.name === roleToAdd));
      msg.reply(`Added you to **${role.name}**!`)
    }
  } else if (msg.content.startsWith("!unset")) {
    let roleToRemove = msg.content.split(' ')[1];
    let role = msg.guild.roles.find(role => role.name === roleToRemove);
    if (msg.member.roles.has(role.id)) {
      msg.member.removeRole(role);
      msg.reply(`Removed you from **${role.name}**!`);
    }
  }
});*/


client.login(process.env.TOKEN);