const path = require("path");

module.exports = {
  stories: ["../**/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-viewport/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-knobs/register"
  ],
  webpackFinal: async config => ({
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
                  ...require("../tsconfig.json").compilerOptions,
                  jsx: "react"
                }
              }
            },
            {
              loader: require.resolve("react-docgen-typescript-loader")
            }
          ]
        }
      ]
    },
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, ".ts", ".tsx"]
    }
  })
};
