const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
          title: 'Priority List',
        }),
      ],
    module: {
        rules: [        

          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
}