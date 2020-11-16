module.exports = {
  rootDir: '.',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: true,
  clearMocks: true,
  collectCoverageFrom: ["src/**", "!src/@types/*"],
  coverageDirectory: '__tests__/coverage',
};