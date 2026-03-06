const commands = [];
const replyHandlers = [];

module.exports = { commands, replyHandlers };


// ALIVE COMMAND
commands.push({
pattern: "alive",
alias: ["online","bot"],
react: "🤖",
function: async (vima, mek, m, { reply, pushname }) => {

reply(`╭━━〔 VIMA-MD 〕━━╮

👋 Hello ${pushname}

🤖 Bot Status : Online
⚡ Version : V1
👑 Owner : Vima

╰━━━━━━━━━━━━━━╯`);

}
});


// PING COMMAND
commands.push({
pattern: "ping",
alias: ["speed"],
react: "⚡",
function: async (vima, mek, m, { reply }) => {

reply("🏓 Pong! Bot is working ⚡");

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
