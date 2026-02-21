const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/text-neutral-950/g, 'text-white');
    content = content.replace(/text-neutral-900/g, 'text-white');
    content = content.replace(/text-neutral-800/g, 'text-neutral-100');
    content = content.replace(/text-neutral-700/g, 'text-neutral-300');
    content = content.replace(/text-neutral-600/g, 'text-neutral-400');
    content = content.replace(/bg-white\/70/g, 'bg-neutral-900/70');
    content = content.replace(/bg-white\/60/g, 'bg-neutral-900/60');
    content = content.replace(/bg-white\/40/g, 'bg-neutral-950/40');
    content = content.replace(/bg-white/g, 'bg-neutral-900');
    content = content.replace(/bg-neutral-50/g, 'bg-neutral-950');
    content = content.replace(/bg-neutral-100\/80/g, 'bg-neutral-800/80');
    content = content.replace(/border-neutral-200\/60/g, 'border-neutral-700/60');
    content = content.replace(/border-neutral-200/g, 'border-neutral-800');
    content = content.replace(/border-neutral-100/g, 'border-neutral-800/50');
    content = content.replace(/bg-grid-white/g, 'bg-grid-dark');
    fs.writeFileSync(filePath, content);
}

const dir = path.join(__dirname, 'src', 'components');
['Hero.tsx', 'Technologies.tsx', 'Projects.tsx', 'About.tsx', 'Navbar.tsx', 'AIAssistant.tsx'].forEach(file => {
    replaceInFile(path.join(dir, file));
});

// Update global CSS
let css = fs.readFileSync(path.join(__dirname, 'src', 'index.css'), 'utf8');
css = css.replace(/background-color: #E2E8F0;/g, 'background-color: #030712;');
css = css.replace(/background-color: #F0F2F5;/g, 'background-color: #030712;');
css = css.replace(/color: #111827;/g, 'color: #f8fafc;');
fs.writeFileSync(path.join(__dirname, 'src', 'index.css'), css);
console.log("Dark Mode migration complete!");
