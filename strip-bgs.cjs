const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replaceSectionBgs = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Hero
    content = content.replace(/bg-white dark:bg-neutral-950/g, 'bg-transparent');

    // About
    content = content.replace(/bg-white dark:bg-neutral-900/g, 'bg-transparent');

    // Technologies
    content = content.replace(/bg-neutral-50 dark:bg-neutral-950/g, 'bg-transparent');

    // Projects
    // `bg-white dark:bg-neutral-900 bg-grid-dynamic` => `bg-transparent bg-grid-dynamic`

    // Contact
    content = content.replace(/bg-neutral-950 text-white/g, 'bg-transparent');

    // Contact specific hardcoded text
    content = content.replace(/text-neutral-400/g, 'text-neutral-600 dark:text-neutral-400');
    // But maybe it's already done?
    // Let's just remove the main section backgrounds manually or with safer regex.

    fs.writeFileSync(filePath, content);
}

['Hero.tsx', 'About.tsx', 'Technologies.tsx', 'Projects.tsx', 'Contact.tsx', 'Footer.tsx'].forEach(file => {
    replaceSectionBgs(path.join(dir, file));
});

console.log("Section backgrounds stripped for monolithic theming.");
