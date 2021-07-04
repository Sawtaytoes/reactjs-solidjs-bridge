import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  createPortal,
} from 'react-dom'
import { render } from 'solid-js/web'

import ReactPortalElementChild from '../solid/ReactPortalElementChild.jsx'
import ReactPortalElementContext from '../solid/ReactPortalElementContext.js'

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
            ReactPortalElementContext
            .Provider({
              get children() {
                return (
                  getSolidComponentRef
                  .current({
                    getReactElementChildren: (
                      ReactPortalElementChild
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
