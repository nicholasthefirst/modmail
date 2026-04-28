📩 Discord Modmail Bot

A simple and effective modmail bot built with Discord.js that allows server members to privately contact staff through DMs.

When a user sends a DM to the bot, a private thread is created in your server where staff can respond directly.

✨ Features
📥 Users can DM the bot to contact staff
🧵 Automatically creates a private modmail thread
🔁 Two-way communication between user and staff
🔒 One active thread per user (prevents duplicates)
❌ !close command to end conversations
📦 Requirements
Node.js v18 or higher
A Discord bot token from Discord Developer Portal
A Discord server with a category for modmail
⚙️ Installation
git clone https://github.com/yourusername/modmail-bot.git
cd modmail-bot
npm install
🔑 Configuration

Create a .env file in the root directory:

TOKEN=your_bot_token_here
GUILD_ID=your_server_id
CATEGORY_ID=your_modmail_category_id
▶️ Running the Bot
node index.js
🛠️ Usage
For Users
Send a DM to the bot
Your message will be forwarded to the server staff
For Staff
Reply inside the created modmail channel
Messages will automatically be sent back to the user
Commands
Command	Description
!close	Closes the modmail thread
🔐 Permissions

Make sure the bot has the following permissions:

Manage Channels
Send Messages
Read Message History
📁 Project Structure
modmail-bot/
├── index.js
├── package.json
├── .env
└── README.md
🚀 Future Improvements
Slash commands (/reply, /close)
Message attachments support
Database integration (MongoDB, SQLite, etc.)
Modmail transcripts/logging
Staff role permissions
🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.
