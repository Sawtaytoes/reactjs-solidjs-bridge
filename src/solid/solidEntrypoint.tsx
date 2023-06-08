import {
  createElement,
} from 'react'
import {
  render,
} from 'solid-js/web'

import convertToSolidComponent from './convertToSolidComponent'
import ReactComponent from '../react/ReactComponent'
import SolidComponent from './SolidComponent'
import SolidContextConsumer from './SolidContextConsumer'
import SolidContext from './SolidContext'
import SolidContextProvider from './SolidContextProvider'
import SolidToReactBridge from './SolidToReactBridge'

const ConvertedReactComponent = convertToSolidComponent(ReactComponent)

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
    .querySelector(
      '#solid-root'
    )
  ),
)
