module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  modulePaths: ['<rootDir>/src/'],
  testMatch: ['**/tests/**/*.test.(ts|js)'],
};
