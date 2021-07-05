import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  createPortal,
} from 'react-dom'
import {
  render,
} from 'solid-js/web'

import BridgePortalElementChild from '../solid/BridgePortalElementChild.jsx'
import BridgePortalElementContext from '../solid/BridgePortalElementContext.js'

const ReactToSolidBridge = ({
  children,
  getSolidComponent,
}) => {
  const [
    portalDomElement,
    setPortalDomElement,
  ] = (
    useState()
  )

  const getSolidComponentRef = useRef()

  getSolidComponentRef
  .current = (
    getSolidComponent
  )

  const reactToSolidElementRef = useRef()

  useEffect(
    () => {
      const dispose = (
        render(
          () => (
            BridgePortalElementContext
            .Provider({
              get children() {
                return (
                  getSolidComponentRef
                  .current({
                    getChildren: (
                      BridgePortalElementChild
                    )
                  })
                )
              },
              value: {
                getChildElement: (
                  setPortalDomElement
                ),
              },
            })
          ),
          (
            reactToSolidElementRef
            .current
          ),
        )
      )

      return () => {
        dispose()
      }
    },
    [],
  )

  return (
    <div ref={reactToSolidElementRef}>
      {
        children
        && portalDomElement
        && (
          createPortal(
            children,
            portalDomElement
          )
        )
      }
    </div>
  )
}

export default ReactToSolidBridge
