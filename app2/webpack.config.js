const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 9002,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "swc-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./root": "./src/index.ts",
      },
      shared: {
        vue: {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "^3.5.14",
        },
        zustand: {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "^5.0.4",
        },
        "vue-router": {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "^4.5.1",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
