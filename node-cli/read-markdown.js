const program = require("commander");
const fs = require("fs");
const md2html = require('./md2html');

program.parse(process.argv);
const filePath = program.args[0];

fs.readFile(filePath, 'utf-8', (err, file) => {
    if (err) {
        console.log(err);
        process.exit(err.code);
        return;
    }
    const html = md2html(file);
    console.log(html);
});