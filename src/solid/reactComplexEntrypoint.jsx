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
import ReactToSolidBridge from './ReactToSolidBridge.jsx'
import SolidComponent from '../solid/SolidComponent.jsx'
import SolidContext from '../solid/SolidContext.js'
import SolidContextConsumer from '../solid/SolidContextConsumer.jsx'
import SolidToReactBridge from '../solid/SolidToReactBridge.jsx'

render(
  (
    <ReactContextProvider>
      <ReactContextConsumer />

      <ReactContext.Consumer>
        {
          ({
            count,
          }) => (
            <ReactToSolidBridge
              getSolidComponent={({
                getChildren,
              }) => ([
                SolidContext
                .Provider({
                  get children() {
                    return [
                      SolidContextConsumer(),
                      getChildren(),
                    ]
                  },
                  value: {
                    count: () => (
                      count
                    ),
                  },
                })
              ])}
            >
              <ReactContextConsumer />

              <ReactToSolidBridge
                getSolidComponent={({
                  getChildren,
                }) => (
                  SolidContext
                  .Provider({
                    get children() {
                      return getChildren()
                    }
                  })
                )}
              >
                <ReactContextConsumer />
              </ReactToSolidBridge>
            </ReactToSolidBridge>
          )
        }
      </ReactContext.Consumer>
    </ReactContextProvider>
  ),
  (
    document
    .querySelector(
      '#react-root'
    )
  ),
)
