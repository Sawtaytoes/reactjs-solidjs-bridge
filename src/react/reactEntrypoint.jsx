import {
  render,
} from 'react-dom'

import ReactComponent from './ReactComponent.jsx'
import ReactContextConsumer from './ReactContextConsumer.jsx'
import ReactContextProvider from './ReactContextProvider.jsx'
import ReactToSolidBridge from './ReactToSolidBridge.jsx'
import SolidComponent from '../solid/SolidComponent.jsx'
import SolidToReactBridge from '../solid/SolidToReactBridge.jsx'

render(
  (
    <ReactContextProvider>
      <ReactToSolidBridge
        getSolidComponent={({
          getReactElementChildren,
        }) => (
          SolidComponent({
            get children() {
              return getReactElementChildren()
            }
          })
        )}
      >
        <ReactComponent />
        <ReactContextConsumer />
      </ReactToSolidBridge>
    </ReactContextProvider>
  ),
  (
    document
    .querySelector(
      '#root'
    )
  ),
)
