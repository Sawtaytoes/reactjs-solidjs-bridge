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
import ReactStatefulComponent from './ReactStatefulComponent.jsx'
import ReactToSolidBridge from './ReactToSolidBridge.jsx'
import ReactToSolidBridgeProvider from './ReactToSolidBridgeProvider.jsx'
import SolidComponent from '../solid/SolidComponent.jsx'
import SolidContext from '../solid/SolidContext.js'
import SolidContextConsumer from '../solid/SolidContextConsumer.jsx'
import SolidContextProvider from '../solid/SolidContextProvider.jsx'
import SolidStatefulComponent from '../solid/SolidStatefulComponent.jsx'

render(
  (
    <ReactToSolidBridgeProvider>
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
                }) => ([
                  // (
                  //   SolidContextProvider({
                  //     get children() {
                  //       return [
                  //         SolidContextConsumer(),
                  //         getChildren(),
                  //       ]
                  //     }
                  //   })
                  // ),
                  (
                    SolidContext
                    .Provider({
                      get children() {
                        return [
                          SolidContextConsumer(),
                          getChildren(),
                        ]
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
                  ),
                ])}
                props={{
                  count,
                  incrementCount,
                }}
              >
                <ReactContextConsumer />

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
                >
                  <ReactContextConsumer />
                  <ReactStatefulComponent
                    count={count}
                  />
                </ReactToSolidBridge>
              </ReactToSolidBridge>
            )
          }
        </ReactContext.Consumer>

        {/*
        <ReactToSolidBridge
          getSolidComponent={({
            getChildren,
          }) => (
            SolidComponent({
              get children() {
                return getChildren()
              }
            })
          )}
        >
          <ReactComponent />
          <ReactContextConsumer />
        </ReactToSolidBridge>
        */}
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
