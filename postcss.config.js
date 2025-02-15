const tailwindcss = require("tailwindcss");
const postcssImport = require("postcss-import");

module.exports = {
    plugins: [
        postcssImport,
        "tailwindcss/nesting",
        tailwindcss
    ]
}