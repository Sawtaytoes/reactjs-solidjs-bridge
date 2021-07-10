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

import ReactToSolidPortalElement from '../react/ReactToSolidPortalElement.jsx'

const SolidToReactBridge = (
  props,
) => {
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
          props
          .getReactComponent({
            getChildren: () => (
              createElement(
                ReactToSolidPortalElement,
                {
                  getChildElement: (
                    setPortalDomElement
                  ),
                },
              )
            )
          })
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
        (
          props
          .children
        )
        && portalDomElement()
        && (
          <Portal
            mount={portalDomElement()}
          >
            {
              props
              .children
            }
          </Portal>
        )
      }
    </div>
  )
}

export default SolidToReactBridge
