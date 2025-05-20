const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  mode: "development",
  devServer: {
    port: 9000,
    headers: {
      "Access-Control-Allow-Origin": "*", // 跨域时必须设置
    },
    historyApiFallback: true,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "swc-loader",
        exclude: /node_modules/,
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
      name: "container",
      filename: "remoteEntry.js",
      exposes: {
        "./hooks": "./src/shared/hooks/index.ts",
        "./ui": "./src/components/index.ts",
        "./store": "./src/shared/store/useGlobalStore.js",
        "./store-vue": "./src/shared/store/bridge.js",
      },
      remotes: {
        app1: "app1@http://localhost:9001/remoteEntry.js",
        app2: "app2@http://localhost:9002/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "^19.1.0",
        },
        "react-dom": {
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
        vue: {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "^3.5.14",
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
