require('dotenv').config();
const { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  ChannelType, 
  PermissionsBitField 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const activeThreads = new Map(); // userId -> channelId

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Handle DMs → create modmail thread
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // If DM
  if (message.channel.type === ChannelType.DM) {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) return;

    let threadChannel;

    if (activeThreads.has(message.author.id)) {
      threadChannel = guild.channels.cache.get(activeThreads.get(message.author.id));
    } else {
      threadChannel = await guild.channels.create({
        name: `modmail-${message.author.username}`,
        type: ChannelType.GuildText,
        parent: process.env.CATEGORY_ID,
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel]
          }
        ]
      });

      activeThreads.set(message.author.id, threadChannel.id);

      threadChannel.send(`📩 New modmail from <@${message.author.id}> (${message.author.tag})`);
    }

    threadChannel.send(`**User:** ${message.content}`);
  }

  // Staff replying in thread
  if (message.guild && message.channel.parentId === process.env.CATEGORY_ID) {
    if (message.content.startsWith('!close')) {
      const userId = [...activeThreads.entries()]
        .find(([_, chId]) => chId === message.channel.id)?.[0];

      if (userId) {
        const user = await client.users.fetch(userId);
        user.send("❌ Your modmail ticket has been closed.");
        activeThreads.delete(userId);
      }

      message.channel.send("Thread closed.");
      setTimeout(() => message.channel.delete(), 3000);
      return;
    }

    // Relay to user
    const userId = [...activeThreads.entries()]
      .find(([_, chId]) => chId === message.channel.id)?.[0];

    if (!userId) return;

    const user = await client.users.fetch(userId);
    if (!user) return;

    user.send(`**Staff:** ${message.content}`);
  }
});

client.login(process.env.TOKEN);
