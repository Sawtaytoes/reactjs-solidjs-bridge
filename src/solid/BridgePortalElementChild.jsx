import {
  useContext,
} from 'solid-js'

import BridgePortalElementContext from '../solid/BridgePortalElementContext'

const BridgePortalElementChild = () => {
  const {
    getChildElement,
  } = (
    useContext(
      BridgePortalElementContext
    )
  )
  
  const domElement = <div />

  getChildElement(
    domElement
  )
  
  return domElement
}

export default BridgePortalElementChild
