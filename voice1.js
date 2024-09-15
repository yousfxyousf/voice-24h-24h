const {client,exit,joinVoiceChannel,fs,server_id} = require("./system");
  var chat ;

  function connect(){
    // Declare a variable to store the channel ID
    var channel_id;
    

    // Get the Discord guild based on the `server_id` value
    const guild = client.guilds.cache.get(server_id);

    // If the guild is not found, log an error message
    if (!guild) return console.error("Guild not found.");

    // Get the member based on the user ID of the Discord client
    const member = guild.members.cache.get(client.user.id);

    // If the member is not found, log an error message
    if (!member) return console.error("Member not found.");

    // Read the contents of the `script.json` file
    fs.readFile("script.json", "utf-8", (err, data) => {
        // If there was an error reading the file, return from the function
        if (err) return;

        // Parse the JSON data from the file
        const script = JSON.parse(data);

        // Get the `channel_id` value from the script
        channel_id = script.channel_id;

        // If the member is not found, log an error message
        if (!member) return console.error("Member not found.");  
         // Get the channel based on the channel ID
        chat = client.channels.cache.get(channel_id);

        if (chat && chat.type === 'GUILD_VOICE') {

          console.log(`The user connected in the voice channel: ${chat.name} ✅` );
          console.log("------------------------------------------------------------");
      
     
    
       
        // Register an event listener for voice state updates
        client.on('voiceStateUpdate', (oldState, newState) => {

          // If the member is not in a voice channel
          if (!member.voice.channel)  {
            // Try to join the voice channel
            try{
                // Store the result of `joinVoiceChannel` in the `connection` variable
                connection = joinVoiceChannel({
                  channelId: channel_id,
                  guildId: server_id,
                  adapterCreator: chat.guild.voiceAdapterCreator,
                  selfMute: false,
                  selfDeaf: false,
                });
            } catch(error){
                // Log the error if it occurs
                console.log(error)
            }
          } else {
            // Return from the function if the member is already in a voice channel
            return;
          }
        });     
      }
    });
}

module.exports = connect;
