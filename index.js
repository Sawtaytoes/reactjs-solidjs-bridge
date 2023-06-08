const scripts = {
  build: () => {
    require('./scripts/build')
  },
  start: () => {
    require('./scripts/devServer')
  },
}

scripts
[
  process
  .argv
  [2]
]()
