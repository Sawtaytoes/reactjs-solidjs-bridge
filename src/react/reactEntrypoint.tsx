import {
  createRoot,
} from 'react-dom/client'

import {
  convertToReactComponent,
} from './convertToReactComponent'
import {
  ReactComponent,
} from './ReactComponent'
import {
  ReactContext,
} from './ReactContext'
import {
  ReactContextConsumer,
} from './ReactContextConsumer'
import {
  ReactContextProvider,
} from './ReactContextProvider'
import {
  ReactSolidRouterExample,
} from './ReactSolidRouterExample'
import {
  ReactStatefulComponent,
} from './ReactStatefulComponent'
import {
  ReactToSolidBridge,
} from './ReactToSolidBridge'
import {
  ReactToSolidBridgeProvider,
} from './ReactToSolidBridgeProvider'
import {
  SolidComponent,
} from '../solid/SolidComponent'
import {
  SolidContext,
} from '../solid/SolidContext'
import {
  SolidContextConsumer,
} from '../solid/SolidContextConsumer'
import {
  SolidStatefulComponent,
} from '../solid/SolidStatefulComponent'

const ConvertedSolidContextConsumer = (
  convertToReactComponent(SolidContextConsumer)
)
const ConvertedSolidComponent = (
  convertToReactComponent(SolidComponent)
)
const ConvertedSolidStatefulComponent = (
  convertToReactComponent(SolidStatefulComponent)
)

const reactRoot = (
  createRoot(
    document
    .getElementById(
      'react-root'
    ) as (
      HTMLDivElement
    )
  )
)

reactRoot
.render(
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
