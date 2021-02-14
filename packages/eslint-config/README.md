ESLint configurations used by Dasa for JavaScript projects

# Install

Run
```
yarn add --dev prettier eslint eslint-plugin-import eslint-plugin-chai-expect eslint-plugin-mocha  @dasa-health/eslint-config-dasa-js
```

To use prettier you need to add this line to **prettier.config.js** file:
```javascript
module.exports = require('@dasa-health/eslint-config-dasa-js/prettier.config');
```

# How use:

if your config are at `package.json`

```javascript
  "eslintConfig": {
    "extends": [
      "@dasa-health/dasa-health-js"
    ]
  }
```

if your config are at `.eslintrc`

```json
{
    "extends": [
        "@dasa-health/dasa-health-js",
        "@dasa-health/dasa-health-js/config/react",
        "@dasa-health/dasa-health-js/config/typescript"
    ],
    "overrides": [
        {
            "files": ["src/packages/app/__mocks__/*.js"],
            "rules": {
                "react/no-multi-comp": "off"
            }
        }
    ]
}
```

## How use some specific configuration:

To use specific type of configuration for React, Typescript and Node.js, you only need to extend these configuration above `@dasa-health/dasa-health-js/` declaration, i, e:

```json
{
    "extends": [
        "@dasa-health/dasa-health-js",
        "@dasa-health/dasa-health-js/config/node",
        "@dasa-health/dasa-health-js/config/react",
        "@dasa-health/dasa-health-js/config/typescript"
    ]
}
```

If you want

After this you need to install all peer dependencies:

React

`yarn add --dev eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-react-app eslint-plugin-flowtype`

Typescript

`yarn add --dev @typescript-eslint/eslint-plugin @typescript-eslint/parser`

Node

`yarn add --dev @typescript-eslint/eslint-plugin @typescript-eslint/parser`

# How publish

At project root:

Set your [npm token](https://docs.npmjs.com/creating-and-viewing-access-tokens)

`yarn workspace @dasa-health/commitlint-config publish  --access=public --non-interactive`
