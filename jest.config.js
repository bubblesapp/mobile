module.exports = {
  verbose: false,
  testEnvironment: 'jest-environment-uint8array',
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  testTimeout: 10000,
  preset: 'react-native',
  setupFiles: [
    '<rootDir>/jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!native-base)/',
  ],
  extraGlobals: ['Uint8Array', 'ArrayBuffer'],
};
