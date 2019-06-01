const program = require("commander");
const fs = require("fs");
const marked = require('marked');

program.parse(process.argv);
const filePath = program.args[0];

fs.readFile(filePath, 'utf-8', (err, file) => {
    if (err) {
        console.log(err);
        process.exit(err.code);
        return;
    }
    const html = marked(file, {
        gfm: true,
        sanitize: false
    });
    console.log(html);
});