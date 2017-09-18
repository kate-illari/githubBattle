var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var DIST_DIR = path.resolve(__dirname, "dist");

var config = {
    entry: "./app/index.js",
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: "babel-loader"},
            {test: /\.css$/, use: ["style-loader", "css-loader"]}
        ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [ new HtmlWebpackPlugin({
        template: "app/index.html"
    })]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
        )
}

module.exports = config;