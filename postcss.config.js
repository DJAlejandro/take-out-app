// postcss.config.js
const path = require("path");

module.exports = {
    plugins: [
        require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            propList: ['*', '!font-size', '!font', '!border-image', '!border', '!border-top', '!border-left', '!border-right', '!border-bottom']
        }),
        require("postcss-write-svg")({
            utf8: false
        }),
        require("@fullhuman/postcss-purgecss")({
            content: [
                "./src/*.vue",
                "./src/components/**/*.vue",
                "./src/views/**/*.vue"
            ],
            whitelist: ["html", "body"]
        }),
        require("cssnano")(),
        require("postcss-preset-env")()
    ]
};