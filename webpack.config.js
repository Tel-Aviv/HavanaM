var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackCopyAfterBuildPlugin = require('webpack-copy-after-build-plugin');

module.exports = {
    entry: {
        mobile: [path.resolve(__dirname, './src/index.jsx')]
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: true
        }),
        new WebpackCopyAfterBuildPlugin({
            "mobile":
            "C:\\Dev\\Havana\\PS\\mobile.bundle.js",
          })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: ['file-loader']
            } ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'react-native$': 'react-native-web'
        }
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: '/',
        chunkFilename: '[name].bundle.js'

    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true
    },
    devtool: 'eval-source-map',
}