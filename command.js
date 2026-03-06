const commands = [];
const replyHandlers = [];

module.exports = { commands, replyHandlers };


// PING
commands.push({
pattern: "ping",
alias: ["speed"],
react: "⚡",
function: async (vima, mek, m, { reply }) => {

reply("🏓 Pong! Bot is working.");

}
});


// OWNER
commands.push({
pattern: "owner",
react: "👑",
function: async (vima, mek, m, { reply }) => {

reply(`👑 *BOT OWNER*

Name : Vima
Number : 94789706579`);

}
});


// ALIVE
commands.push({
pattern: "alive",
react: "🤖",
function: async (vima, mek, m, { reply }) => {

reply(`🤖 *VIMA MD BOT*

Status : Online ✅
Version : 1.0
Owner : Vima

Bot is running successfully 🚀`);

}
});


// MENU
commands.push({
pattern: "menu",
react: "📜",
function: async (vima, mek, m, { reply }) => {

reply(`
╭━━〔 *VIMA-MD MENU* 〕━━╮

🤖 .alive
⚡ .ping
👑 .owner
📜 .menu

╰━━━━━━━━━━━━━━╯
`);

}
});
