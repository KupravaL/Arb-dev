const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    devtool: "inline-source-map",
    stats: { warnings: false },
    performance: { hints: false },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: "svg-inline-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader",
                options: {
                    compact: true,
                    presets: [["@babel/preset-env", { modules: false }]],
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true },
                    },
                ],
            },
        ],
    },
    output: {
        filename: "bundler.js",
        path: path.resolve(__dirname, "public"),
        clean: true,
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/camera/pattern-marker.patt"),
                    to: path.resolve(__dirname, "public"),
                },
                {
                    from: path.resolve(__dirname, "src/camera/camera_para.dat"),
                    to: path.resolve(__dirname, "public"),
                },
                {
                    from: path.resolve(__dirname, "src/camera/solenoid_only_5.fbx"),
                    to: path.resolve(__dirname, "public"),
                },
            ],
        }),
    ],
    mode: "development",
};
