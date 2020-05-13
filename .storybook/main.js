const path = require("path");
const {
  JsConfigPathsPlugin,
} = require("next/dist/build/webpack/plugins/jsconfig-paths-plugin");
const tsconfig = require("../tsconfig.json");

module.exports = {
  stories: ["../components/**/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-viewport/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-knobs/register",
  ],
  webpackFinal: async (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve("ts-loader"),
              options: {
                transpileOnly: true,
                compilerOptions: {
                  ...tsconfig.compilerOptions,
                  jsx: "react",
                },
              },
            },
            {
              loader: require.resolve("react-docgen-typescript-loader"),
            },
          ],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, ".ts", ".tsx"],
      plugins: [
        new JsConfigPathsPlugin(
          tsconfig.compilerOptions.paths,
          path.resolve(__dirname, "../", tsconfig.compilerOptions.baseUrl)
        ),
      ],
    },
  }),
};
