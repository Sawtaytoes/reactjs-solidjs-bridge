import {
  createElement,
} from 'react'
import {
  render,
} from 'solid-js/web'

import ReactComponent from '../react/ReactComponent.jsx'
import SolidComponent from './SolidComponent.jsx'
import SolidContextConsumer from './SolidContextConsumer.jsx'
import SolidContext from './SolidContext.js'
import SolidContextProvider from './SolidContextProvider.jsx'
import SolidToReactBridge from './SolidToReactBridge.jsx'

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
