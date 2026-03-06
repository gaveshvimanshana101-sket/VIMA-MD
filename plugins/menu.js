const { commands } = require("../command");

// ALIVE
commands.push({
pattern: "alive",
alias: ["online"],
react: "🟢",
function: async (vima, mek, m, { reply, pushname }) => {

reply(`🟢 *VIMA-MD BOT IS ONLINE*

👋 Hello ${pushname}

⚡ Status : Online
🤖 Version : V1
👑 Owner : Vima

_I am ready to execute commands._`);

}
});


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


// MENU
commands.push({
pattern: "menu",
react: "📜",
function: async (vima, mek, m, { reply }) => {

reply(`
╭━━〔 VIMA-MD MENU 〕━━╮

🟢 .alive
⚡ .ping
👑 .owner
📜 .menu

╰━━━━━━━━━━━━━━╯
`);

}
});
