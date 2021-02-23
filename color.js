// const configFactory = require('./webpack.prod.js')
const {generateTheme} = require('antd-theme-generator')
const path = require('path')

const options = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './src'), // all files with .less extension will be processed
    varFile: path.join(__dirname, './src/theme.less'), // default path is Ant Design default.less file
    themeVariables: ['@primary-color', '@link-color', '@border-radius-base'],
    outputFilePath: path.join(__dirname, './public/color.less'), // if provided, file will be created with generated less/styles
    customColorRegexArray: [/^fade\(.*\)$/], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
}

generateTheme(options).then(less => {
    console.log('Theme generated successfully')
}).catch(error => {
    console.log('Error', error)
})
