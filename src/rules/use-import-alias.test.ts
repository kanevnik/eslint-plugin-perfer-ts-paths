import { RuleTester } from "eslint";
import rule from "./use-import-alias";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

// Tests for the rule
ruleTester.run("use-import-alias", rule, {
  valid: [
    // Code snippets that should NOT trigger a warning or error
    {
      code: `import Button from '@components/Button';`,
      options: [["components", "utils", "models"]],
    },
    {
      code: `import Something from 'some-module';`,
      options: [["components", "utils", "models"]],
    },
  ],
  invalid: [
    // Code snippets that SHOULD trigger a warning or error
    {
      code: `import Button from '../components/Button';`,
      options: [["components", "utils", "models"]],
      errors: [
        {
          messageId: "preferAliasImport",
          data: { path: "components" },
          line: 1,
          column: 1,
        },
      ],
      output: `import Button from '@components/Button';`, // Expected autofix output
    },
    // Additional test to check for other paths
    {
      code: `import Model from '../models/Model';`,
      options: [["components", "utils", "models"]],
      errors: [
        {
          messageId: "preferAliasImport",
          data: { path: "models" },
          line: 1,
          column: 1,
        },
      ],
      output: `import Model from '@models/Model';`, // Expected autofix output
    },
    // Another additional test to check for other paths
    {
      code: `import Util from '../utils/Util';`,
      options: [["components", "utils", "models"]],
      errors: [
        {
          messageId: "preferAliasImport",
          data: { path: "utils" },
          line: 1,
          column: 1,
        },
      ],
      output: `import Util from '@utils/Util';`, // Expected autofix output
    },
  ],
});
