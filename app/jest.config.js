module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  modulePaths: ['<rootDir>/src/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/api/**/*.{js,ts}'],
};
