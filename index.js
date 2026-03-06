const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');

const fs = require('fs');
const P = require('pino');
const express = require('express');
const axios = require('axios');
const path = require('path');
const qrcode = require('qrcode-terminal');

const config = require('./config');
const { sms, downloadMediaMessage } = require('./lib/msg');
const {
  getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson
} = require('./lib/functions');
const { File } = require('megajs');
const { commands, replyHandlers } = require('./command');

const app = express();
const port = process.env.PORT || 8000;

const prefix = '.';
const ownerNumber = ['94789706579'];
const credsPath = path.join(__dirname, '/auth_info_baileys/creds.json');

async function ensureSessionFile() {
  if (!fs.existsSync(credsPath)) {
    if (!config.SESSION_ID) {
      console.error('❌ SESSION_ID env variable is missing. Cannot restore session.');
      process.exit(1);
    }

    console.log("🔄 creds.json not found. Downloading session from MEGA...");

    const sessdata = config.SESSION_ID;
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);

    filer.download((err, data) => {
      if (err) {
        console.error("❌ Failed to download session file from MEGA:", err);
        process.exit(1);
      }

      fs.mkdirSync(path.join(__dirname, '/auth_info_baileys/'), { recursive: true });
      fs.writeFileSync(credsPath, data);
      console.log("✅ Session downloaded and saved. Restarting bot...");
      setTimeout(() => {
        connectToWA();
      }, 2000);
    });
  } else {
    setTimeout(() => {
      connectToWA();
    }, 1000);
  }
}

async function connectToWA() {
  console.log("Connecting VIMA-MD 🧬...");

  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, '/auth_info_baileys/'));
  const { version } = await fetchLatestBaileysVersion();

  const vima = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    auth: state,
    version,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
  });

  vima.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }

    } else if (connection === 'open') {

      console.log('✅ VIMA-MD connected to WhatsApp');

      const up = `
╭━━〔 VIMA-MD CONNECTED 🤖 〕━━⬣
│
│ 👑 Owner : Vima
│ 📱 Number : 94789706579
│ ⚡ Prefix : ${prefix}
│ 📡 Status : Online
│
╰━━━━━━━━━━━━━━━━━━⬣
`;

      await vima.sendMessage(ownerNumber[0] + "@s.whatsapp.net", {
        image: { url: `https://raw.githubusercontent.com/DANUWA-MD/DANUWA-MD/main/images/DANUWA-MD.png` },
        caption: up
      });

      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() === ".js") {
          require(`./plugins/${plugin}`);
        }
      });

    }
  });

  vima.ev.on('creds.update', saveCreds);

  vima.ev.on('messages.upsert', async ({ messages }) => {

    const mek = messages[0];
    if (!mek || !mek.message) return;

    mek.message = getContentType(mek.message) === 'ephemeralMessage'
      ? mek.message.ephemeralMessage.message
      : mek.message;

    if (mek.key.remoteJid === 'status@broadcast') return;

    const m = sms(vima, mek);

    const type = getContentType(mek.message);
    const from = mek.key.remoteJid;

    const body =
      type === 'conversation'
        ? mek.message.conversation
        : mek.message[type]?.text ||
          mek.message[type]?.caption ||
          '';

    const isCmd = body.startsWith(prefix);

    const commandName = isCmd
      ? body.slice(prefix.length).trim().split(" ")[0].toLowerCase()
      : '';

    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(' ');

    const sender = mek.key.fromMe
      ? vima.user.id
      : (mek.key.participant || mek.key.remoteJid);

    const senderNumber = sender.split('@')[0];
    const isGroup = from.endsWith('@g.us');
    const botNumber = vima.user.id.split(':')[0];
    const pushname = mek.pushName || 'User';
    const isMe = botNumber.includes(senderNumber);
    const isOwner = ownerNumber.includes(senderNumber) || isMe;

    const reply = (text) =>
      vima.sendMessage(from, { text }, { quoted: mek });

    if (isCmd) {

      const cmd = commands.find(
        (c) =>
          c.pattern === commandName ||
          (c.alias && c.alias.includes(commandName))
      );

      if (cmd) {
        try {
          cmd.function(vima, mek, m, {
            from,
            body,
            command: commandName,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            pushname,
            isOwner,
            reply
          });

        } catch (e) {
          console.error("[PLUGIN ERROR]", e);
        }
      }
    }
  });
}

ensureSessionFile();

app.get("/", (req, res) => {
  res.send("Hey, VIMA-MD started✅");
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
