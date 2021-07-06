import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  createPortal,
} from 'react-dom'
import {
  Portal,
} from 'solid-js/web'

import BridgePortalElementChild from '../solid/BridgePortalElementChild.jsx'
import BridgePortalElementContext from '../solid/BridgePortalElementContext.js'
import ReactToSolidBridgeContext from './ReactToSolidBridgeContext.js'
import SolidBridgeContainer from '../solid/SolidBridgeContainer.jsx'
import useItems from './useItems.js'

const ReactToSolidBridge = ({
  children,
  getSolidComponent,
}) => {
  const {
    addSolidChild,
    removeSolidChild,
  } = (
    useContext(
      ReactToSolidBridgeContext
    )
  )

  const {
    addItem: addSolidGrandchild,
    getItems: getSolidGrandchildren,
    removeItem: removeSolidGrandchild,
    subscribeToItems: subscribeToSolidGrandchildren,
  } = (
    useItems()
  )

  const [
    portalDomElement,
    setPortalDomElement,
  ] = (
    useState()
  )

  const parentDomElement = useRef()

  const getSolidComponentRef = useRef()

  getSolidComponentRef
  .current = (
    getSolidComponent
  )

  useEffect(
    () => {
      if (!addSolidChild) {
        throw new Error(
          'You need to wrap `ReactToSolidBridge` in a `ReactToSolidBridgeProvider` component at the top-level of your React app.'
        )
      }

      const SolidChildComponent = () => (
        Portal({
          get children() {
            return (
              BridgePortalElementContext
              .Provider({
                get children() {
                  return (
                    getSolidComponentRef
                    .current({
                      getChildren: () => ([
                        BridgePortalElementChild(),
                        (
                          SolidBridgeContainer({
                            getChildren: (
                              getSolidGrandchildren
                            ),
                            subscribeToChildren: (
                              subscribeToSolidGrandchildren
                            ),
                          })
                        )
                      ]),
                    })
                  )
                },
                value: {
                  getChildElement: (
                    setPortalDomElement
                  ),
                },
              })
            )
          },
          mount: (
            parentDomElement
            .current
          ),
        })
      )

      addSolidChild(
        SolidChildComponent
      )

      return () => {
        removeSolidChild(
          SolidChildComponent
        )
      }
    },
    [
      addSolidChild,
      getSolidGrandchildren,
      removeSolidChild,
      subscribeToSolidGrandchildren,
    ],
  )

  const providerValue = (
    useMemo(
      () => ({
        addSolidChild: addSolidGrandchild,
        removeSolidChild: removeSolidGrandchild,
      }),
      [
        addSolidGrandchild,
        removeSolidGrandchild,
      ],
    )
  )

  return (
    <div ref={parentDomElement}>
      <ReactToSolidBridgeContext.Provider
        value={providerValue}
      >
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
      </ReactToSolidBridgeContext.Provider>
    </div>
  )
}

export default ReactToSolidBridge
