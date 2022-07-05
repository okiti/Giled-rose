import { pathsToModuleNameMapper } from 'ts-jest/utils';

const { compilerOptions } = require('./tsconfig.json');

export default {
  roots: ['<rootDir>/src', '<rootDir>src/test/jest'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
