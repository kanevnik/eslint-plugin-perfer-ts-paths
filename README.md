# ESLint `use-import-alias` Rule

This ESLint rule helps enforce the usage of alias imports instead of relative imports for specified paths, keeping your codebase clean and consistent.

### 🛠️ Installation & Set Up

Before utilizing this rule, ensure you've configured TypeScript paths. For example:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@models/*": ["src/models/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

🔗 Refer to [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) for detailed guidance.

### 🚀 Usage

This rule requires you to provide an array of strings, each being a path that the rule should check.

For instance:

```json
// .eslintrc.json
{
  "rules": {
    "your-plugin-name/use-import-alias": ["error", ["components", "utils", "models"]]
  }
}
```

### 📘 Example

Given the configuration above, this ESLint rule will:

❌ Flag as error:

```typescript
import Button from "../components/Button";
import Model from "../../models/Model";
```

✅ Auto-fix to:

```typescript
import Button from "@components/Button";
import Model from "@models/Model";
```

### 🧪 Testing the Rule

In the project, we also provide test cases to ensure the rule behaves as expected.

Example test:

```typescript
import { RuleTester } from "eslint";
import rule from "./use-import-alias";

// ... [rest of the test code]
```

### ⚖️ Configurability

This rule is designed to be flexible and adaptable to various project structures. Simply provide the array of paths as per your project’s structure and needs.

### 💼 Use Case

- Ensure clean import statements throughout your codebase.
- Enforce a consistent use of TypeScript path aliases.
- Reduce the hassle in updating paths during refactors or directory changes.

### 📚 Further Reading

- [ESLint Rules](https://eslint.org/docs/rules/)
- [TypeScript Path Mappings](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

### 🙌 Contributing

Feel free to open issues or PRs if you find a bug or see potential improvements!

### 📃 License

This project is open-source and available under [MIT License](LICENSE).
