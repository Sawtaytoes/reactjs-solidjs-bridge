const path = require('path')

const getAbsolutePath = (
  filePath,
) => (
  path
  .join(
    (
      process
      .cwd()
    ),
    filePath,
  )
)

const outputPath = (
  getAbsolutePath(
    './build'
  )
)

module.exports = {
  getAbsolutePath,
  outputPath,
}
