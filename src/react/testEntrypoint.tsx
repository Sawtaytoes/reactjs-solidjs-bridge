import {
  type FunctionComponent,
} from 'react'
import {
  createRoot,
} from 'react-dom/client'

const reactRoot = (
  createRoot(
    (
      document
      .getElementById(
        'react-root'
      ) as (
        HTMLDivElement
      )
    )
  )
)

const TestComponent: (
  FunctionComponent
) = () => (
  <div>
    yo
  </div>
)

reactRoot
.render(
  <TestComponent />
)

if (
  import
  .meta
  .hot
) {
  import
  .meta
  .hot
  .accept()

  import
  .meta
  .hot
  .dispose(() => {
    reactRoot
    .unmount()
  })
}
