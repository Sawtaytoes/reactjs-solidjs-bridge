import {
  render,
} from 'react-dom'

import ReactComponent from './ReactComponent.jsx'
import ReactContextConsumer from './ReactContextConsumer.jsx'
import ReactContextProvider from './ReactContextProvider.jsx'
import ReactToSolidBridge from './ReactToSolidBridge.jsx'
import SolidComponent from '../solid/SolidComponent.jsx'

render(
  (
    <ReactContextProvider>
      <ReactContextConsumer />

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
    </ReactContextProvider>
  ),
  (
    document
    .querySelector(
      '#react-root'
    )
  ),
)
