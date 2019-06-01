const marked = require("marked");

module.exports = (markdown) => {
    return marked(markdown, {
        gfm: true,
        sanitize: false
    });
};