import {
  createElement,
} from 'react'
import {
  render,
} from 'solid-js/web'

import {
  convertToSolidComponent,
} from './convertToSolidComponent'
import {
  ReactComponent,
} from '../react/ReactComponent'
import {
  SolidComponent,
} from './SolidComponent'
import {
  SolidContextConsumer,
} from './SolidContextConsumer'
import {
  SolidContextProvider,
} from './SolidContextProvider'
import {
  SolidToReactBridge,
} from './SolidToReactBridge'

const ConvertedReactComponent = convertToSolidComponent(ReactComponent)

const dispose = (
  render(
    () => (
      <SolidContextProvider>
        <SolidContextConsumer />

        <SolidToReactBridge
          getReactComponent={({
            getChildren,
          }) => (
            createElement(
              ReactComponent,
              {
                children: getChildren(),
              },
            )
          )}
        >
          <SolidComponent />
          <SolidContextConsumer />
        </SolidToReactBridge>
      </SolidContextProvider>
    ),
    (
      document
      .getElementById(
        'solid-root'
      ) as (
        HTMLDivElement
      )
    ),
  )
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
  .dispose(dispose)
}
