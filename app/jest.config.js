module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  modulePaths: ['<rootDir>/src/'],
  testMatch: ['**/test/**/*.test.(ts|js)'],
};
