import {
  Fragment,
} from 'react'
import {
  render,
} from 'react-dom'

import convertToReactComponent from './convertToReactComponent.jsx'
import ReactComponent from './ReactComponent.jsx'
import ReactContext from './ReactContext.js'
import ReactContextConsumer from './ReactContextConsumer.jsx'
import ReactContextProvider from './ReactContextProvider.jsx'
import ReactSolidRouterExample from './ReactSolidRouterExample.jsx'
import ReactStatefulComponent from './ReactStatefulComponent.jsx'
import ReactToSolidBridge from './ReactToSolidBridge.jsx'
import ReactToSolidBridgeProvider from './ReactToSolidBridgeProvider.jsx'
import SolidComponent from '../solid/SolidComponent.jsx'
import SolidContext from '../solid/SolidContext.js'
import SolidContextConsumer from '../solid/SolidContextConsumer.jsx'
import SolidStatefulComponent from '../solid/SolidStatefulComponent.jsx'

const ConvertedSolidContextConsumer = (
  convertToReactComponent(SolidContextConsumer)
)
const ConvertedSolidComponent = (
  convertToReactComponent(SolidComponent)
)
const ConvertedSolidStatefulComponent = (
  convertToReactComponent(SolidStatefulComponent)
)

render(
  (
    <ReactToSolidBridgeProvider>
      <ReactSolidRouterExample />

      <ReactContextProvider>
        <ReactContextConsumer />

        <ReactContext.Consumer>
          {
            ({
              count,
              incrementCount,
            }) => (
              <ReactToSolidBridge
                getSolidComponent={({
                  getChildren,
                  props,
                }) => (
                  SolidContext
                  .Provider({
                    get children() {
                      return getChildren()
                    },
                    get value() {
                      return {
                        count: (
                          props
                          .count
                        ),
                        incrementCount: (
                          props
                          .incrementCount
                        ),
                      }
                    },
                  })
                )}
                props={{
                  count,
                  incrementCount,
                }}
              >
                <ConvertedSolidContextConsumer />

                <ConvertedSolidComponent>
                  <ReactContextConsumer />

                  <ReactComponent>
                    <ConvertedSolidContextConsumer />

                    <ConvertedSolidStatefulComponent
                      count={count}
                    />

                    <ReactContextConsumer />
                    <ReactStatefulComponent
                      count={count}
                    />
                  </ReactComponent>
                </ConvertedSolidComponent>
              </ReactToSolidBridge>
            )
          }
        </ReactContext.Consumer>
      </ReactContextProvider>
    </ReactToSolidBridgeProvider>
  ),
  (
    document
    .querySelector(
      '#react-root'
    )
  ),
)
