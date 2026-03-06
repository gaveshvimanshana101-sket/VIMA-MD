const commands = [];
const replyHandlers = [];

module.exports = { commands, replyHandlers };


// ALIVE COMMAND
commands.push({
pattern: "alive",
alias: ["online","bot"],
react: "✅",
function: async (vima, mek, m, { reply }) => {

reply(`🤖 *VIMA-MD BOT*

Status : Online ✅
Owner : Vima
Mode : Public
Version : 1.0

Bot is running successfully 🚀`);

}
});


// PING COMMAND
commands.push({
pattern: "ping",
alias: ["speed"],
react: "⚡",
function: async (vima, mek, m, { reply }) => {

reply("🏓 Pong! Bot is working.");

}
});


// OWNER COMMAND
commands.push({
pattern: "owner",
react: "👑",
function: async (vima, mek, m, { reply }) => {

reply(`👑 *BOT OWNER*

Name : Vima
Number : 94789706579`);

}
});


// MENU COMMAND
commands.push({
pattern: "menu",
react: "📜",
function: async (vima, mek, m, { reply }) => {

reply(`
╭━━〔 VIMA-MD MENU 〕━━╮

🤖 .alive
⚡ .ping
👑 .owner
📜 .menu

╰━━━━━━━━━━━━━━╯
`);

}
});
