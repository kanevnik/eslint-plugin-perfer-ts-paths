// use-import-alias.ts
import { Rule } from "eslint";

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      preferAliasImport: "Use alias instead of relative import for {{path}}",
    },
    fixable: "code",
    schema: [
      {
        type: "array",
        items: {
          type: "string",
        },
        additionalItems: false,
      },
    ],
  },
  create: function (context) {
    const paths: string[] = context.options[0]; // Getting the configured paths from options

    if (!paths || paths.length === 0) {
      throw new Error("Please provide an array of strings for path checking.");
    }

    return {
      ImportDeclaration(node) {
        const importSource = String(node.source.value);
        const applicablePath = paths.find(path => importSource.includes(`/${path}`));

        if (applicablePath) {
          context.report({
            node,
            messageId: "preferAliasImport",
            data: { path: applicablePath }, // Providing data for the message
            fix(fixer) {
              const newImportSource = getNewImportSource(importSource, applicablePath);
              return fixer.replaceText(node.source, `'${newImportSource}'`);
            },
          });
        }
      },
    };
  },
};

function getNewImportSource(importSource: string, path: string) {
  const index = importSource.indexOf(`/${path}`) + 1; // skip the initial slash
  const newPath = importSource.slice(index);
  return "@" + newPath;
}

export = rule;
