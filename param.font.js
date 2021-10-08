module.exports = {
    files: ['./app/img/font-icons/*.svg'],
    fontName: 'font-icons',
    classPrefix: 'font-icons-',
    baseSelector: '.font-icons',
    types: ['woff', 'woff2', 'ttf', 'svg'],
    fixedWidth: true,
    cssTemplate: 'param.font.hbs',
    fileName: 'app.[fontname].[chunkhash].[ext]',
    dest: './fonts/font-icons',
};
