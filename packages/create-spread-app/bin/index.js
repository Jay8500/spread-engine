#!/usr/bin/env node
// create-spread-app — Angular + Tailwind + Netlify project in one command. Zero dependencies.
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const VERSION = '0.1.0';
const ANGULAR = '22';
const TEMPLATE = join(dirname(fileURLToPath(import.meta.url)), '..', 'template');
const PRESETS = [
  { id: 'blank', label: 'Web app starter — Angular + Tailwind + Netlify', ready: true },
  { id: 'saas', label: 'SaaS — login, payments, admin', ready: false },
  { id: 'booking', label: 'Booking — slots and email confirmations', ready: false },
  { id: 'college', label: 'College project — guided build', ready: false },
];

const c = (code) => (s) => (process.stdout.isTTY && !process.env.NO_COLOR ? `\x1b[${code}m${s}\x1b[0m` : s);
const teal = c('36'), green = c('32'), red = c('31'), dim = c('2'), bold = c('1');
const ok = (s) => console.log(`${green('✔')} ${s}`);
const step = (s) => console.log(`\n${teal('›')} ${bold(s)}`);
const fail = (s) => {
  console.error(`\n${red('✖')} ${s}\n`);
  process.exit(1);
};

const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    preset: { type: 'string' },
    brand: { type: 'string' },
    yes: { type: 'boolean', short: 'y' },
    'skip-install': { type: 'boolean' },
    'skip-git': { type: 'boolean' },
    help: { type: 'boolean', short: 'h' },
    version: { type: 'boolean', short: 'v' },
  },
});

if (opts.version) {
  console.log(VERSION);
  process.exit(0);
}
if (opts.help) {
  console.log(`
  ${bold('create-spread-app')} ${dim('v' + VERSION)}

  Usage:  npx create-spread-app [project-name] [options]

  Options:
    --preset <id>     blank (more presets coming soon)
    --brand <#hex>    brand colour, e.g. #0d9488
    -y, --yes         use defaults, ask nothing
    --skip-install    don't run npm install
    --skip-git        don't create a git repository
    -h, --help        show this help
    -v, --version     show the version

  Docs: https://engine.spreadapps.in
`);
  process.exit(0);
}

console.log(`
  ${teal('●')}${teal('●')}${teal('●')}  ${bold('Spread Engine')} ${dim('· create-spread-app v' + VERSION)}
      ${dim('Angular ' + ANGULAR + ' + Tailwind CSS + Netlify, set up for you. Made with ❤ for India.')}
`);

// ---- checks ----
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 12)) fail(`Node.js 22.12 or newer is needed (you have ${process.versions.node}). Get the LTS from https://nodejs.org`);
const hasGit = run('git', ['--version'], { quiet: true }).status === 0;

// ---- questions ----
const rl = process.stdin.isTTY && !opts.yes ? createInterface({ input: process.stdin, output: process.stdout }) : null;
async function ask(q, def, valid) {
  if (!rl) return def;
  for (;;) {
    const a = (await rl.question(`${teal('?')} ${q} ${dim('(' + def + ')')} `)).trim() || def;
    const err = valid(a);
    if (!err) return a;
    console.log(`  ${red(err)}`);
  }
}

const NAME_RE = /^[a-z][a-z0-9-]{0,49}$/;
const validName = (n) => {
  if (!NAME_RE.test(n)) return 'Use small letters, numbers and dashes, starting with a letter (e.g. my-app).';
  const dir = resolve(n);
  if (existsSync(dir) && readdirSync(dir).length) return `The folder "${n}" already exists and is not empty.`;
  return null;
};
const name = positionals[0] ?? (await ask('Project name:', 'my-app', validName));
const nameErr = validName(name);
if (nameErr) fail(nameErr);

let preset = opts.preset ?? 'blank';
if (!opts.preset && rl) {
  console.log(`${teal('?')} What are you building?`);
  PRESETS.forEach((p, i) => console.log(`  ${i + 1}) ${p.ready ? p.label : dim(p.label + ' (coming soon)')}`));
  const pick = await ask('Choose 1–4:', '1', (a) => (/^[1-4]$/.test(a) ? null : 'Type a number from 1 to 4.'));
  preset = PRESETS[Number(pick) - 1].id;
}
const chosen = PRESETS.find((p) => p.id === preset);
if (!chosen) fail(`Unknown preset "${preset}". Available: blank`);
if (!chosen.ready) {
  console.log(`  ${dim(`"${chosen.label}" is coming soon — creating the Web app starter for now. Join the waitlist: https://engine.spreadapps.in`)}`);
  preset = 'blank';
}

const HEX = /^#[0-9a-fA-F]{6}$/;
const brand = opts.brand ?? (await ask('Brand colour (hex):', '#0d9488', (a) => (HEX.test(a) ? null : 'Use a 6-digit hex colour like #0d9488.')));
if (!HEX.test(brand)) fail('Brand colour must look like #0d9488.');
rl?.close();

// ---- create ----
const dir = resolve(name);
step(`Creating Angular ${ANGULAR} project "${name}"`);
const ng = run('npx', ['-y', `@angular/cli@${ANGULAR}`, 'new', name, '--ssr', '--style=css', '--routing', '--skip-tests', '--skip-git', '--skip-install', '--ai-config=none', '--package-manager=npm', '--defaults', '--interactive=false']);
if (ng.status !== 0 || !existsSync(join(dir, 'angular.json'))) fail('Angular CLI could not create the project. Check your internet connection and try again.');
ok('Angular project created');

step('Adding Tailwind CSS, static prerender and Netlify');
// angular.json: prerender to static files (Netlify serves them; no Node server needed)
const ngJsonPath = join(dir, 'angular.json');
const ngJson = JSON.parse(readFileSync(ngJsonPath, 'utf8'));
const build = ngJson.projects[name].architect.build;
build.options.outputMode = 'static';
delete build.options.ssr;
writeFileSync(ngJsonPath, JSON.stringify(ngJson, null, 2) + '\n');
rmSync(join(dir, 'src', 'server.ts'), { force: true });
rmSync(join(dir, 'src', 'app', 'app.css'), { force: true }); // the starter page uses Tailwind classes only

// package.json: Tailwind in, Express server out
const pkgPath = join(dir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
delete pkg.dependencies.express;
delete pkg.devDependencies?.['@types/express'];
delete pkg.scripts[`serve:ssr:${name}`];
Object.assign(pkg.dependencies, { tailwindcss: '^4.1.0', '@tailwindcss/postcss': '^4.1.0', postcss: '^8.5.0' });
pkg.dependencies = Object.fromEntries(Object.entries(pkg.dependencies).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// template files (placeholders: __NAME__, __BRAND__, __YEAR__)
copyTemplate(TEMPLATE, dir, { __NAME__: name, __BRAND__: brand.toLowerCase(), __YEAR__: String(new Date().getFullYear()) });
const gi = join(dir, '.gitignore');
if (existsSync(gi) && !readFileSync(gi, 'utf8').includes('.netlify')) writeFileSync(gi, readFileSync(gi, 'utf8') + '\n# Netlify\n.netlify\n');
ok('Tailwind CSS v4 with your brand colour');
ok('Static prerender (outputMode: static) — no server needed');
ok('netlify.toml with security headers and SPA fallback');

if (!opts['skip-install']) {
  step('Installing packages (1–3 minutes)');
  if (run('npm', ['install', '--no-audit', '--no-fund'], { cwd: dir }).status !== 0) fail(`npm install failed. Go to the folder and run "npm install" again:\n  cd ${name} && npm install`);
  ok('Packages installed');
}

if (!opts['skip-git'] && hasGit) {
  run('git', ['init', '-q', '-b', 'main'], { cwd: dir, quiet: true });
  run('git', ['add', '-A'], { cwd: dir, quiet: true });
  const commit = run('git', ['commit', '-q', '-m', 'Created with create-spread-app'], { cwd: dir, quiet: true });
  if (commit.status === 0) ok('Git repository with a first commit');
  else console.log(`  ${dim('Git repository created (set your git name/email, then commit).')}`);
}

console.log(`
${green('Done!')} Your app is ready in ${bold('./' + name)}

  ${teal('cd ' + name)}
  ${teal('npm start')}          ${dim('→ open http://localhost:4200  (Ctrl + C to stop)')}
  ${teal('npm run build')}      ${dim('→ static site in dist/' + name + '/browser')}

  ${bold('Go live:')} push to GitHub, then on netlify.com → Add new project → pick the repo.
           netlify.toml already has the build settings.

  ${dim('Login, Supabase and emails are coming in the next versions. Docs: https://engine.spreadapps.in')}
`);

// ---- helpers ----
function run(cmd, args, { cwd, quiet } = {}) {
  const stdio = quiet ? 'ignore' : 'inherit';
  // npm/npx are .cmd scripts on Windows and need a shell. Their args have no spaces (fixed flags or a validated
  // project name), so one command string is safe. Everything else (git) runs without a shell, so messages keep their spaces.
  if (process.platform === 'win32' && (cmd === 'npm' || cmd === 'npx')) return spawnSync([cmd, ...args].join(' '), { cwd, stdio, shell: true });
  return spawnSync(cmd, args, { cwd, stdio });
}

function copyTemplate(from, to, vars) {
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const src = join(from, entry.name);
    // npm drops dotfiles like .gitignore from packages, so templates store them as _dotname
    const dest = join(to, entry.name.startsWith('_dot') ? '.' + entry.name.slice(4) : entry.name);
    if (entry.isDirectory()) {
      mkdirSync(dest, { recursive: true });
      copyTemplate(src, dest, vars);
    } else {
      let text = readFileSync(src, 'utf8');
      for (const [k, v] of Object.entries(vars)) text = text.replaceAll(k, v);
      writeFileSync(dest, text);
    }
  }
}
