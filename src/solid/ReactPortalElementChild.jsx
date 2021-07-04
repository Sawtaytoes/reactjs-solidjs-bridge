import {
  useContext,
} from 'solid-js'

import ReactPortalElementContext from '../solid/ReactPortalElementContext'

const ReactPortalElementChild = () => {
  const {
    getChildElement,
  } = (
    useContext(
      ReactPortalElementContext
    )
  )
  
  const domElement = <div />

  getChildElement(
    domElement
  )
  
  return domElement
}

export default ReactPortalElementChild
