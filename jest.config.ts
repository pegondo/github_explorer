import type { Config } from "jest";
import nextJest from "next/jest.js";

// TODO: Remove the warnings from the tests.

const createJestConfig = nextJest({
  dir: ".",
});

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "react-markdown": "<rootDir>/mock/emptyMock.tsx",
    "rehype-raw": "<rootDir>/mock/emptyMock.tsx",
    d3: "<rootDir>/node_modules/d3/dist/d3.js",
    jose: "<rootDir>/mock/emptyMock.tsx",
    "@panva": "<rootDir>/node_modules/@panva/hkdf/dist/node/cjs/index.js",
    uuid: "<rootDir>/mock/emptyMock.tsx",
    preact: "<rootDir>/mock/emptyMock.tsx",
  },
};

export default createJestConfig(config);
