const fs = require('fs');
const path = require('path');

const fixContactAndFooter = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // General text
    content = content.replace(/text-white/g, 'text-neutral-900 dark:text-white');
    content = content.replace(/text-neutral-300/g, 'text-neutral-700 dark:text-neutral-300');
    content = content.replace(/text-primary-light/g, 'text-primary dark:text-primary-light');

    // Backgrounds & Borders
    content = content.replace(/bg-white\/5/g, 'bg-black/5 dark:bg-white/5');
    content = content.replace(/bg-white\/10/g, 'bg-black/10 dark:bg-white/10');
    content = content.replace(/border-white\/10/g, 'border-black/10 dark:border-white/10');
    content = content.replace(/border-white\/5/g, 'border-black/5 dark:border-white/5');
    content = content.replace(/border-white\/40/g, 'border-black/40 dark:border-white/40');

    // Make sure we didn't duplicate `dark:text-white` from previous scripts
    content = content.replace(/text-neutral-900 dark:text-neutral-900 dark:text-white/g, 'text-neutral-900 dark:text-white');
    content = content.replace(/bg-neutral-950 text-neutral-900 dark:text-white/g, 'bg-transparent text-neutral-900 dark:text-white');
    content = content.replace(/bg-neutral-950/g, 'bg-transparent');

    fs.writeFileSync(filePath, content);
}

const pContact = path.join(__dirname, 'src', 'components', 'Contact.tsx');
const pFooter = path.join(__dirname, 'src', 'components', 'Footer.tsx');

fixContactAndFooter(pContact);
fixContactAndFooter(pFooter);

console.log("Contact and Footer made dynamic.");
