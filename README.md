# dependencies-tree

Collect dependencies from package.json

## Install

```sh
npm i dependencies-tree
```

## Usage

**package.json**

```json
{
  "name": "dependencies-tree/test",
  "private": true,
  "version": "0.0.0",
  "dependencies": {
    "electron-squirrel-startup": "^1.0.0"
  }
}
```

**main.js**

```ts
import dependenciesTree, { flatDependencies } from 'dependencies-tree'

const root = process.cwd()
const depsTree = await dependenciesTree(root)
const depsFlat = await flatDependencies(root)

console.log(depsTree)
// ↓↓↓↓
[
  {
    "name": "electron-squirrel-startup",
    "path": {
      "src": "/Users/name/project-path/node_modules/electron-squirrel-startup",
      "dest": "node_modules/electron-squirrel-startup"
    },
    "dependencies": [
      {
        "name": "debug",
        "path": {
          "src": "/Users/name/project-path/node_modules/debug",
          "dest": "node_modules/debug"
        },
        "dependencies": [
          {
            "name": "ms",
            "path": {
              "src": "/Users/name/project-path/node_modules/ms",
              "dest": "node_modules/ms"
            },
            "dependencies": []
          }
        ]
      }
    ]
  }
]

console.log(depsFlat)
// ↓↓↓↓
[
  {
    "src": "/Users/name/project-path/node_modules/electron-squirrel-startup",
    "dest": "node_modules/electron-squirrel-startup"
  },
  {
    "src": "/Users/name/project-path/node_modules/debug",
    "dest": "node_modules/debug"
  },
  {
    "src": "/Users/name/project-path/node_modules/ms",
    "dest": "node_modules/ms"
  }
]
```
