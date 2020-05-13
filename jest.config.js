module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "^@@/(.*)$": "<rootDir>/$1",
  },
  globals: {
    "ts-jest": {
      tsConfig: {
        ...require("./tsconfig.json").compilerOptions,
        jsx: "react",
      },
    },
  },
};
