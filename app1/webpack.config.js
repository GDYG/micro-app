const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 9001,
    headers: {
      "Access-Control-Allow-Origin": "*", // 允许任何来源访问
    },
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    publicPath: "auto",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      exposes: {
        "./root": "./src/index.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "^19.1.0",
        },
        zustand: {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "^5.0.4",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "^19.1.0",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
