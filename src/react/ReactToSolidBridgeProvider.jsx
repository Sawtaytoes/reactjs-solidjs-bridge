import {
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  render,
} from 'solid-js/web'

import ReactToSolidBridgeContext from './ReactToSolidBridgeContext.js'
import SolidBridgeContainer from '../solid/SolidBridgeContainer.jsx'
import useItems from './useItems.js'

const ReactToSolidBridgeProvider = ({
  children,
  getSolidComponent,
}) => {
  const {
    addItem: addSolidChild,
    getItems: getSolidChildren,
    removeItem: removeSolidChild,
    subscribeToItems: subscribeToSolidChildren,
  } = (
    useItems()
  )

  const parentDomElement = useRef()

  useEffect(
    () => {
      const dispose = (
        render(
          () => (
            SolidBridgeContainer({
              getChildren: (
                getSolidChildren
              ),
              subscribeToChildren: (
                subscribeToSolidChildren
              ),
            })
          ),
          (
            parentDomElement
            .current
          ),
        )
      )

      return () => {
        dispose()
      }
    },
    [
      getSolidChildren,
      subscribeToSolidChildren,
    ],
  )

  const providerValue = (
    useMemo(
      () => ({
        addSolidChild,
        removeSolidChild,
      }),
      [],
    )
  )

  return (
    <div ref={parentDomElement}>
      <ReactToSolidBridgeContext.Provider
        value={providerValue}
      >
        {children}
      </ReactToSolidBridgeContext.Provider>
    </div>
  )
}

export default ReactToSolidBridgeProvider
