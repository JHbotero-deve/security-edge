#!/usr/bin/env node
// tools/ui-indexer.js
// Scans repository files for UI-related keywords and creates docs/ui-search/ui-index.json

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs', 'ui-search', 'ui-index.json');

const KEYWORDS = [
  'login', 'signin', 'auth', 'authenticate',
  'button', 'btn', 'submit',
  'table', 'datatable', 'thead', 'tbody',
  'route', 'router', 'path',
  'navbar', 'nav', 'menu',
  'form', 'input', 'password'
];

function containsKeyword(content) {
  const tags = new Set();
  const snippets = [];
  const lines = content.split(/\r?\n/);
  lines.forEach((line, i) => {
    const low = line.toLowerCase();
    KEYWORDS.forEach(k => {
      if (low.includes(k)) {
        tags.add(k);
        snippets.push({line: i+1, text: line.trim().slice(0, 200)});
      }
    });
  });
  return {tags: Array.from(tags), snippets};
}

function isBinary(filename) {
  const binExt = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip'];
  return binExt.includes(path.extname(filename).toLowerCase());
}

(async function main(){
  const files = glob.sync('**/*.*', {ignore: ['node_modules/**', 'docs/ui-search/**', '.git/**', 'dist/**']});
  const results = [];
  for (const f of files) {
    try {
      if (isBinary(f)) continue;
      const p = path.join(ROOT, f);
      const content = fs.readFileSync(p, 'utf8');
      const {tags, snippets} = containsKeyword(content);
      if (tags.length) {
        results.push({
          path: f,
          tags: Array.from(new Set(tags)),
          snippets: snippets.slice(0,5)
        });
      }
    } catch (e) {
      // ignore unreadable files
    }
  }

  // ensure output dir
  fs.mkdirSync(path.dirname(OUT), {recursive: true});
  fs.writeFileSync(OUT, JSON.stringify({generated_at: new Date().toISOString(), results}, null, 2));
  console.log('UI index written to', OUT);
})();
