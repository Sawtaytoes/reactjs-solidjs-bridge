import {
  createElement,
} from 'react'
import {
  render,
  unmountComponentAtNode,
} from 'react-dom'
import {
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js'
import {
  Portal,
} from 'solid-js/web'

import BridgePortalElementChild from '../react/BridgePortalElementChild.jsx'
import BridgePortalElementContext from '../react/BridgePortalElementContext.js'

const SolidToReactBridge = ({
  children,
  getReactComponent,
}) => {
  const [
    portalDomElement,
    setPortalDomElement,
  ] = (
    createSignal()
  )

  let solidToReactElementRef = {
    current: null,
  }

  createEffect(
    () => {
      render(
        (
          createElement(
            (
              BridgePortalElementContext
              .Provider
            ),
            {
              children: (
                getReactComponent({
                  getChildren: () => (
                    createElement(
                      BridgePortalElementChild
                    )
                  )
                })
              ),
              value: {
                getChildElement: (
                  setPortalDomElement
                )
              },
            }
          )
        ),
        (
          solidToReactElementRef
          .current
        ),
      )

      onCleanup(() => {
        unmountComponentAtNode(
          solidToReactElementRef
          .current
        )
      })
    },
  )

  return (
    <div
      ref={
        solidToReactElementRef
        .current
      }
    >
      {
        children
        && portalDomElement()
        && (
          <Portal
            mount={portalDomElement()}
          >
            {children}
          </Portal>
        )
      }
    </div>
  )
}

export default SolidToReactBridge
