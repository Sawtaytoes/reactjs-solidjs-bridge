import {
  type ReactElement,
  type ReactNode,
  createElement,
} from 'react'
import {
  createRoot,
} from 'react-dom/client'
import {
  type ParentComponent,
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js'
import {
  Portal,
} from 'solid-js/web'

import {
  ReactToSolidPortalElement,
} from '../react/ReactToSolidPortalElement'

export type SolidToReactBridgeType = {
  getReactComponent: ({
    getChildren,
  }: {
    getChildren: () => (
      ReactElement
    ),
  }) => ReactElement
}

export const SolidToReactBridge: (
  ParentComponent<
    SolidToReactBridgeType
  >
) = (
  props,
) => {
  const [
    portalDomElement,
    setPortalDomElement,
  ] = (
    createSignal<
      HTMLDivElement
    >()
  )

  let solidToReactElement: (
    | HTMLDivElement
    | undefined
  )

  createEffect(
    () => {
      const reactRoot = (
        createRoot(
          solidToReactElement as HTMLDivElement
        )
      )

      reactRoot
      .render (
        props
        .getReactComponent({
          getChildren: () => (
            createElement(
              ReactToSolidPortalElement,
              {
                getChildElement: (
                  domElement: HTMLDivElement,
                ) => {
                  setPortalDomElement(
                    domElement
                  )
                },
              },
            )
          )
        })
      )

      onCleanup(() => {
        reactRoot
        .unmount()
      })
    },
  )

  return (
    <div
      ref={solidToReactElement}
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
