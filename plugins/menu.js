const { cmd, commands } = require("../command");

cmd(
{
pattern: "menu",
desc: "Displays all available commands",
category: "main",
filename: __filename,
},
async (vima, mek, m, { from, reply }) => {

try {

const categories = {};

for (const cmdData of commands) {

const cat = cmdData.category?.toLowerCase() || "other";

if (!categories[cat]) categories[cat] = [];

categories[cat].push({
pattern: cmdData.pattern,
desc: cmdData.desc || "No description"
});

}

let menuText = "📋 *VIMA MD COMMAND LIST*\n";

for (const [cat, cmds] of Object.entries(categories)) {

menuText += `\n📂 *${cat.toUpperCase()}*\n`;

cmds.forEach(c => {
menuText += `• .${c.pattern} - ${c.desc}\n`;
});

}

await reply(menuText.trim());

} catch (err) {

console.error(err);
reply("❌ Error generating menu.");

}

}
);
