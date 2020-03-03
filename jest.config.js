module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: {
        ...require('./tsconfig.json').compilerOptions,
        jsx: 'react'
      }
    }
  },
  testMatch: ['**/__tests__/**/*.spec.+(ts|tsx|js)'],
  preset: 'ts-jest'
};
