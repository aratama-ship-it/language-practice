#!/usr/bin/env node
// 問題データの選択肢を並べ替えて、正解位置を (A)〜(D) へ均等に散らす保守ツール。
//
//   node tools/rebalance-answers.js js/data/vol7.js
//
// アプリは選択肢をシャッフルしないため、正解位置が偏っていると内容を理解しなくても
// 位置で当てられてしまい、練習にならない。
//
// ★実行してはいけないファイル: js/data/vol1.js 〜 vol4.js
//   これらは市販教材の原本から起こしたもので、解説に「原本の【正解修正】により (B) が正しい」
//   のように原本の選択肢記号を参照している箇所がある。並べ替えると出典との対応が壊れる。
//   実行前に対象ファイルの解説に (A)〜(D) の記号参照が残っていないことを必ず確認すること
//   （残っていれば内容参照の書き方に直してから実行する）。

const fs = require("fs");

const path = process.argv[2];
if (!path) {
  console.error("使い方: node tools/rebalance-answers.js <データファイル>");
  process.exit(1);
}

let src = fs.readFileSync(path, "utf8");

if (/\([A-D]\)/.test(src)) {
  console.error("中止: 解説に (A)〜(D) の記号参照が残っている。並べ替えると解説と食い違う。");
  console.error("先に記号参照を内容参照へ書き換えること。");
  process.exit(1);
}

// choices: [ ... ] を括弧の対応で切り出す
function readArray(text, from) {
  const open = text.indexOf("[", from);
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === "[") depth++;
    else if (text[i] === "]") { depth--; if (depth === 0) return { open: open, end: i }; }
  }
  throw new Error("choices の括弧を閉じられない");
}

// 出現順に choices/answer の位置を集める
const blocks = [];
for (let pos = src.indexOf("choices: ["); pos >= 0; pos = src.indexOf("choices: [", pos + 1)) {
  const span = readArray(src, pos);
  const aPos = src.indexOf("answer: ", span.end);
  if (aPos < 0) throw new Error("answer が見つからない");
  blocks.push({ open: span.open, end: span.end, aPos: aPos });
}

// 各値が均等に現れる並び。問題数が4の倍数でなくても端数はこの順で配る
const PATTERN = [2, 0, 3, 1, 1, 3, 0, 2, 3, 1, 2, 0, 0, 2, 1, 3,
                 2, 3, 1, 0, 1, 0, 3, 2, 3, 2, 0, 1, 0, 1, 2, 3];

// 後ろから書き換える（前を書き換えると後ろの位置がずれるため）
const before = [], after = [];
for (let i = blocks.length - 1; i >= 0; i--) {
  const b = blocks[i];
  const items = JSON.parse(src.slice(b.open, b.end + 1));
  const answerEnd = src.indexOf(",", b.aPos);
  const current = Number(src.slice(b.aPos + "answer: ".length, answerEnd));

  if (items.length !== 4) throw new Error(`選択肢が4つでない（${items.length}）`);
  if (!(current >= 0 && current < 4)) throw new Error(`answer が範囲外: ${current}`);

  const target = PATTERN[i % PATTERN.length];
  const k = (target - current + 4) % 4;
  const rotated = new Array(4);
  items.forEach((v, j) => { rotated[(j + k) % 4] = v; });

  if (rotated[target] !== items[current]) throw new Error("並べ替えで正解が入れ替わった");
  before[i] = current;
  after[i] = target;

  const multiline = src.slice(b.open, b.end + 1).includes("\n");
  const arrText = multiline
    ? "[\n" + rotated.map(v => "        " + JSON.stringify(v)).join(",\n") + "\n      ]"
    : JSON.stringify(rotated).replace(/","/g, '", "');

  src = src.slice(0, b.open) + arrText +
        src.slice(b.end + 1, b.aPos) + "answer: " + target + src.slice(answerEnd);
}

fs.writeFileSync(path, src);

function dist(arr) {
  return arr.reduce((m, v) => (m[v] = (m[v] || 0) + 1, m), {});
}
console.log(`${path}: ${blocks.length}問を並べ替えた`);
console.log("  変更前:", dist(before));
console.log("  変更後:", dist(after));
