import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import {
  beforeAll,
  describe,
  expect,
  it,
} from 'vitest'
import {
  lookupNodeModulesPaths,
  readPackageJson,
  getDependencies,
} from '../src/utils'

const execPromise = promisify(exec)
const fixtureRoot = path.join(__dirname, 'fixture')
const packageJson = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'package.json'), 'utf8'))
const depsTree = [
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
const depsFlat = [
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

describe('src/index', () => {
  beforeAll(async () => {
    await execPromise('npm install', { cwd: fixtureRoot })
  }, 10000 * 5)

  it('package.json is loaded correct', async () => {
    const packageJson2 = await readPackageJson(fixtureRoot)
    expect(typeof packageJson2).equal('object')
    expect(packageJson2).deep.equal(packageJson)
  })

  it('dependencies of package.json is resolved correct', async () => {
    const { tree, flat } = await getDependencies({ root: fixtureRoot })
    expect(depsTree).deep.equal(tree)
    expect(depsFlat).deep.equal(flat)
  })

  it('node_modules paths is lookup correct', async () => {
    const paths = await lookupNodeModulesPaths(fixtureRoot)
    expect(paths.length).gt(0)
  })
})
