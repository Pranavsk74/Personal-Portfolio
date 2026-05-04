const fs = require('fs');
const buf = fs.readFileSync('Pranav_s_resume.pdf');
const str = buf.toString('latin1');
const urls = str.match(/https?:\/\/[^\s\)\"\']+/g);
console.log(urls);
