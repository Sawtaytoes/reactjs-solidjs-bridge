const scripts = {
  build: () => {
    require('./scripts/build.js')
  },
  start: () => {
    require('./scripts/devServer.js')
  },
}

scripts
[
  process
  .argv
  [2]
]()
