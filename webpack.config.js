const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: ['./public/js/main.js', './public/js/cart-comp.js', './public/js/error-comp.js', './public/js/search-comp.js', './public/js/product-comp.js'],
    output: {
        filename: "./build.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new VueLoaderPlugin(),
    ]
}
