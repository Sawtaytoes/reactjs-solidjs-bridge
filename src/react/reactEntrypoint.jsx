import {
  Fragment,
} from 'react'
import {
  render,
} from 'react-dom'

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
                      return (
                        SolidComponent({
                          children: getChildren,
                        })
                      )
                    },
                    value: {
                      count: (
                        props
                        .count
                      ),
                      incrementCount: (
                        props
                        .incrementCount
                      ),
                    },
                  })
                )}
                props={{
                  count,
                  incrementCount,
                }}
              >
                <ReactContextConsumer />

                <ReactComponent>
                  <ReactToSolidBridge
                    getSolidComponent={({
                      getChildren,
                      props,
                    }) => ([
                      SolidContextConsumer(),
                      SolidStatefulComponent({
                        count: (
                          props
                          .count
                        ),
                      }),
                      getChildren(),
                    ])}
                    props={{
                      count,
                    }}
                  >
                    <ReactContextConsumer />
                    <ReactStatefulComponent
                      count={count}
                    />
                  </ReactToSolidBridge>
                </ReactComponent>
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
