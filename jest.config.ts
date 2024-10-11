// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'], // Resolve both TypeScript and JavaScript files
  globals: {
    'ts-jest': {
      isolatedModules: true // Improve performance for large projects
    }
  }
}
