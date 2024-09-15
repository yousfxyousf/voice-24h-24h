const token=process.env['token']
  // Import the Client class from the discord.js-selfbot-v13 package
const { Client } = require("discord.js-selfbot-v13");
// Import the exit function from the process module
const { exit } = require("process");
// Import the joinVoiceChannel function from the @discordjs/voice package
const { joinVoiceChannel } = require('@discordjs/voice');
// Create a new instance of the Client class from the discord.js-selfbot-v13 package
const client = new Client({
      // Disable the automatic check for updates
    checkUpdate: false,
  });
  // Import the fs module for file system operations
const fs = require("fs");
// Import the server_id constant from the index module
const {server_id} = require("./index");
// Expose the client, exit, joinVoiceChannel, fs, and server_id constants as properties of a single object
const express = require("express");
const server = express();
module.exports = {
client,
exit,
joinVoiceChannel,
fs,
server_id,
}
const prefix = "!";
var chat;
var channel_id;
// Import the connect function from the voice1 module
const connect = require("./voice1");
const { type } = require("os");
function system(){

    server.listen(3000, () => {
    });
    // Listen for the "ready" event on the client
    client.on('ready', () => {
          // Log that the client has successfully logged in
        console.log(`Logged in as ${client.user.tag}! ✅`);
          // Call the connect function
        connect();


// Listen for the "message" event on the client
client.on("message", message => {

      //get token id
      const developers = client.user.id;

      var argresult = message.content.split().slice(1).join(" ");
      //to verify if the developers existe
      if (!developers.includes(message.author.id)) return;
    // If the message doesn't start with the prefix or is sent by a bot, return early
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    // Split the message content into args and remove the prefix
    const args = message.content.slice(prefix.length).split(" ");
  
    // Get the first arg as the command, and convert it to lowercase
    const command = args.shift().toLowerCase();
  
    // If the command is "connect", perform the following actions
    if (command === "connect") {
      // Get the second arg as the channel_id, and convert it to a string
      channel_id = args[0];
      channel_id = channel_id.toString();
      chat = client.channels.cache.get(channel_id);
      if (chat && chat.type === 'GUILD_VOICE') {
      // Write the channel_id to a JSON file named "script.json"
      fs.writeFileSync("script.json", JSON.stringify({ channel_id }));
  
      // Call the connect function
      connect();
      } else{
        console.log(channel_id , ' is not a voice channel ❌')
        connect();
      }
    }
  });

    })


}
module.exports = system;
client.login(token);