const commands = [];
const replyHandlers = [];

// COMMAND REGISTER FUNCTION
function cmd(options) {
  commands.push(options);
}

module.exports = {
  commands,
  replyHandlers,
  cmd
};

/* ===============================
   COMMANDS
================================*/

// PING COMMAND
cmd({
  pattern: "ping",
  alias: ["speed"],
  react: "⚡",
  function: async (vima, mek, m, { reply }) => {

    reply("🏓 Pong! Bot is working perfectly.");

  }
});

// OWNER COMMAND
cmd({
  pattern: "owner",
  react: "👑",
  function: async (vima, mek, m, { reply }) => {

    reply(`
👑 *BOT OWNER*

Name : Vima
Number : 94789706579
`);

  }
});

// MENU COMMAND
cmd({
  pattern: "menu",
  react: "📜",
  function: async (vima, mek, m, { reply }) => {

    reply(`
╭━━━〔 🤖 VIMA-MD MENU 〕━━━╮

⚡ .ping
👑 .owner
📜 .menu

╰━━━━━━━━━━━━━━━━━━╯
`);

  }
});
