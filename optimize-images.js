// Script to add lazy loading to all images
// Run this to optimize the HTML file

const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

// Add loading="lazy" to all img tags that don't have it (except logo in header)
html = html.replace(
  /<img\s+([^>]*?)src="IMG\/(bus22|Bus9|Minibus)\.png"([^>]*?)>/gi,
  (match, before, imgName, after) => {
    if (!match.includes("loading=")) {
      return `<img ${before}src="IMG/${imgName}.png"${after} loading="lazy">`;
    }
    return match;
  }
);

// Add defer to non-critical scripts
const scriptsToDefer = [
  "js/services.js",
  "js/contact.js",
  "js/stats-counter.js",
];

scriptsToDefer.forEach((script) => {
  const regex = new RegExp(`<script src="${script}"></script>`, "g");
  html = html.replace(regex, `<script src="${script}" defer></script>`);
});

// Remove duplicate stats-counter script at the end
html = html.replace(/<script src="js\/stats-counter\.js"><\/script>\s*$/m, "");

fs.writeFileSync(htmlPath, html, "utf8");
console.log("✅ Optimization complete!");
console.log("- Added lazy loading to images");
console.log("- Added defer to non-critical scripts");
console.log("- Removed duplicate scripts");
