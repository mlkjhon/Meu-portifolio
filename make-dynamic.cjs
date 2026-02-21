const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // First, let's reset bg-grid-dark back so we can make it dynamic in CSS
    content = content.replace(/bg-grid-dark/g, 'bg-grid-dynamic');

    // Complex/exact matches first
    content = content.replace(/text-white/g, 'text-neutral-900 dark:text-white');
    content = content.replace(/text-neutral-100/g, 'text-neutral-800 dark:text-neutral-100');
    content = content.replace(/text-neutral-300/g, 'text-neutral-700 dark:text-neutral-300');
    content = content.replace(/text-neutral-400/g, 'text-neutral-600 dark:text-neutral-400');

    content = content.replace(/bg-neutral-900\/70/g, 'bg-white/70 dark:bg-neutral-900/70');
    content = content.replace(/bg-neutral-900\/60/g, 'bg-white/60 dark:bg-neutral-900/60');
    content = content.replace(/bg-neutral-950\/40/g, 'bg-white/40 dark:bg-neutral-950/40');
    content = content.replace(/bg-neutral-800\/80/g, 'bg-neutral-100/80 dark:bg-neutral-800/80');

    content = content.replace(/bg-neutral-900/g, 'bg-white dark:bg-neutral-900');
    content = content.replace(/bg-neutral-950/g, 'bg-neutral-50 dark:bg-neutral-950');

    content = content.replace(/border-neutral-700\/60/g, 'border-neutral-200/60 dark:border-neutral-700/60');
    content = content.replace(/border-neutral-800\/50/g, 'border-neutral-100 dark:border-neutral-800/50');
    content = content.replace(/border-neutral-800/g, 'border-neutral-200 dark:border-neutral-800');

    // Fix some over-replaces
    content = content.replace(/text-neutral-900 dark:text-neutral-900 dark:text-white/g, 'text-neutral-900 dark:text-white');
    content = content.replace(/bg-white dark:bg-white dark:bg-neutral-900/g, 'bg-white dark:bg-neutral-900');

    fs.writeFileSync(filePath, content);
}

const dir = path.join(__dirname, 'src', 'components');
['Hero.tsx', 'Technologies.tsx', 'Projects.tsx', 'About.tsx', 'Navbar.tsx', 'AIAssistant.tsx'].forEach(file => {
    replaceInFile(path.join(dir, file));
});

// Update global CSS
let css = fs.readFileSync(path.join(__dirname, 'src', 'index.css'), 'utf8');
// Fix body background directly
css = css.replace(/background-color: #030712;/g, 'background-color: #F8FAFC;');
css = css.replace(/color: #f8fafc;/g, 'color: #111827;');
if (!css.includes('html.dark body')) {
    css += `\nhtml.dark body {\n  background-color: #030712;\n  color: #f8fafc;\n}\n`;
}
if (!css.includes('.bg-grid-dynamic')) {
    css += `\n.bg-grid-dynamic {\n  background-image: var(--bg-grid);\n}\nhtml.dark .bg-grid-dynamic {\n  background-image: var(--bg-grid-dark);\n}\n`;
}

fs.writeFileSync(path.join(__dirname, 'src', 'index.css'), css);

// Update tailwind config to support dark mode
let tailwind = fs.readFileSync(path.join(__dirname, 'tailwind.config.js'), 'utf8');
if (!tailwind.includes("darkMode: 'class'")) {
    tailwind = tailwind.replace('export default {', "export default {\n  darkMode: 'class',");
    fs.writeFileSync(path.join(__dirname, 'tailwind.config.js'), tailwind);
}

console.log("Dynamic Dark Mode migration script created and applied!");
