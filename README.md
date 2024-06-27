# dependencies-tree

Collect dependencies from package.json

## Install

```sh
npm i dependencies-tree
```

## Usage

Assume there is a dependency `electron-squirrel-startup` in **package.json**.

```json
{
  "dependencies": {
    "electron-squirrel-startup": "^1.0.0"
  }
}
```

We get the dependency tree based on the path where **package.json** is located.

```ts
import dependenciesTree from 'dependencies-tree'

const root = process.cwd()
const depsTree = await dependenciesTree(root)

console.log(depsTree)

// ↓↓↓↓

[
  {
    name: 'electron-squirrel-startup',
    path: {
      src: path.join(fixtureRoot, 'node_modules', 'electron-squirrel-startup'),
      dest: path.join('node_modules', 'electron-squirrel-startup'),
      name: 'electron-squirrel-startup',
    },
    dependencies: [
      {
        name: 'debug',
        path: {
          src: path.join(fixtureRoot, 'node_modules', 'debug'),
          dest: path.join('node_modules', 'debug'),
          name: 'debug',
        },
        dependencies: [
          {
            name: 'ms',
            path: {
              src: path.join(fixtureRoot, 'node_modules', 'ms'),
              dest: path.join('node_modules', 'ms'),
              name: 'ms',
            },
            dependencies: [],
          },
        ],
      },
    ],
  },
]
```

Get the flat dependency tree

```ts
import { flatDependencies } from 'dependencies-tree'

const root = process.cwd()
const depsFlat = await flatDependencies(root)

console.log(depsFlat)

// ↓↓↓↓

[
  {
    src: path.join(fixtureRoot, 'node_modules', 'electron-squirrel-startup'),
    dest: path.join('node_modules', 'electron-squirrel-startup'),
    name: 'electron-squirrel-startup',
  },
  {
    src: path.join(fixtureRoot, 'node_modules', 'debug'),
    dest: path.join('node_modules', 'debug'),
    name: 'debug',
  },
  {
    src: path.join(fixtureRoot, 'node_modules', 'ms'),
    dest: path.join('node_modules', 'ms'),
    name: 'ms',
  },
]
```
