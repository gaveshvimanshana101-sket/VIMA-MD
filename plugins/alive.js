const config = require('../config')

module.exports = async (sock, m, text, command) => {

if (command === "alive") {

let msg = `╭──〔 VIMA MD BOT 〕
│
│ 🤖 Status : Online ✅
│ ⚡ Bot : Working
│ 👑 Owner : Vima
│
│ 📅 Date : ${new Date().toLocaleDateString()}
│ ⏰ Time : ${new Date().toLocaleTimeString()}
│
╰───────────────`

await sock.sendMessage(m.key.remoteJid, { text: msg }, { quoted: m })

}

}
