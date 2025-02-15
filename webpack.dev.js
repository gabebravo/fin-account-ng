const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        compress: true,
        port: 3000,
        // Ensures all requests are routed to index.html since we are using UI router to change URLs.
        historyApiFallback: true
    },
    entry: {
        index: "./src/index.ts"
    },
    output: {
        clean: true,
        // Generates a filename like main.7e2c49a622975ebd9b7e.js
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        // Ensures modulesIds only change if their content changes, rather than auto-incrementing every build (the default).
        moduleIds: "deterministic",
        // Creates one runtime chunk, rather than embedding runtime code in each chunk.
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                // Creates a single chunk, "vendors", containing all the node_modules packages used by the application.
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            "window.jquery": "jquery",
            "jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    module: {
        rules: [
            // Use ts-loader for files with .js or .ts extensions
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag"
                        }

                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                /* Enables images to be imported in js/ts files.
                   Example: 
                       import myImage from "./my-image.png";
                       function controllerFn() {
                           this.myImage = myImage;
                       }
                */
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                /* Enables fonts to be imported and used in css/scss files via an @font-face declaration.
                   Example: 
                       @font-face {
                         font-family: 'MyFont';
                         src: url('./my-font.woff2') format('woff2')
                       }
                */
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            },
            {
                /* Enables HTML files to be imported as strings in js/ts files.
                Example:
                    import myTemplate from "./my-template.html";
                    function directiveFn() {
                        template: myTemplate
                    }
                */
                test: /\.(html)$/i,
                type: "asset/source",
                include: [
                    path.resolve(__dirname, "src/app/")
                ]
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};