import { copyFileSync, existsSync } from 'fs';

const source = 'staticwebapp.config.json';
const target = 'out/staticwebapp.config.json';

if (!existsSync('out/index.html')) {
  console.error('Build output missing: out/index.html');
  process.exit(1);
}

copyFileSync(source, target);
console.log(`Copied ${source} -> ${target}`);
