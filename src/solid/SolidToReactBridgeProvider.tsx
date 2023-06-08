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

import SolidToReactBridgeContext from './SolidToReactBridgeContext'
import ReactBridgeContainer from '../react/ReactBridgeContainer'
import useItems from './useItems'

const SolidToReactBridgeProvider = (
  props,
) => {
  const {
    addItem: addSolidChild,
    getItems: getSolidChildren,
    removeItem: removeSolidChild,
    subscribeToItems: subscribeToSolidChildren,
  } = (
    useItems()
  )

  // let solidToReactElementRef = {
  //   current: null,
  // }

  // createEffect(
  //   () => {
  //     render(
  //       (
  //         props
  //         .getReactComponent({
  //           getChildren: () => (
  //             createElement(
  //               ReactToSolidPortalElement,
  //               {
  //                 getChildElement: (
  //                   setPortalDomElement
  //                 ),
  //               },
  //             )
  //           )
  //         })
  //       ),
  //     )

  //     onCleanup(() => {
  //       unmountComponentAtNode(
  //         solidToReactElementRef
  //         .current
  //       )
  //     })
  //   },
  // )

  const providerValue = {
    addSolidChild,
    removeSolidChild,
  }

  return (
    <div ref={parentDomElement}>
      <SolidToReactBridgeContext.Provider
        value={providerValue}
      >
        {children}
      </SolidToReactBridgeContext.Provider>
    </div>
  )
}

export default SolidToReactBridgeProvider
