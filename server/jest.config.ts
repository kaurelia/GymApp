import { join } from "path";
import { pathsToModuleNameMapper } from "ts-jest/utils";
import { compilerOptions } from "./tsconfig.json";
import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: join(__dirname, "src"),
  }),
  setupFilesAfterEnv: [join(process.cwd(), "src", "tests", "setupTests.ts")],
};

export default config;
