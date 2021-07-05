import {
  useContext,
  useEffect,
  useRef,
} from 'react'

import BridgePortalElementContext from '../react/BridgePortalElementContext'

const BridgePortalElementChild = () => {
  const {
    getChildElement,
  } = (
    useContext(
      BridgePortalElementContext
    )
  )

  const domElementRef = useRef()
  
  useEffect(
    () => {
      getChildElement(
        domElementRef
        .current
      )
    },
    [],
  )
  
  return (
    <div ref={domElementRef} />
  )
}

export default BridgePortalElementChild
