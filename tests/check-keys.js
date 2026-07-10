// 解答キー照合: node tests/check-keys.js <vol番号> <原本txtパス>
// 原本の「【QN】正解: (X)」/「QN. 正解: (X)」形式と volN.js の answer を突き合わせる
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const vol = Number(process.argv[2]);
const txtPath = process.argv[3];
const root = path.join(__dirname, "..");

const ctx = vm.createContext({ console });
["js/data/index.js", `js/data/vol${vol}.js`].forEach(f =>
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f }));

const txt = fs.readFileSync(txtPath, "utf8");
const key = {};
const re = /【?Q(\d+)】?[.．]?\s*正解[:：]\s*\(([A-D])\)/g;
for (const m of txt.matchAll(re)) key[Number(m[1])] = "ABCD".indexOf(m[2]);

let bad = 0, checked = 0;
for (const q of ctx.TOEIC_DATA.vols[vol].questions) {
  if (!(q.number in key)) { console.error(`原本に Q${q.number} の解答が見つからない`); bad++; continue; }
  checked++;
  if (key[q.number] !== q.answer) {
    console.error(`不一致 Q${q.number}: 原本=(${"ABCD"[key[q.number]]}) データ=(${"ABCD"[q.answer]})`);
    bad++;
  }
}
console.log(`照合 ${checked}問 / 不一致・欠落 ${bad}件`);
process.exit(bad === 0 ? 0 : 1);
