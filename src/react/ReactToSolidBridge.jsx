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
  createSignal,
} from 'solid-js'
import {
  Portal,
} from 'solid-js/web'

import ReactToSolidBridgeContext from './ReactToSolidBridgeContext.js'
import SolidBridgeContainer from '../solid/SolidBridgeContainer.jsx'
import SolidToReactPortalElement from '../solid/SolidToReactPortalElement.jsx'
import useItems from './useItems.js'

const initialSolidSignals = {}

const ReactToSolidBridge = ({
  children,
  getSolidComponent,
  props,
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

  const propsRef = useRef()

  propsRef
  .current = (
    props
  )

  const solidPropsRef = useRef()

  const solidSignalsRef = (
    useRef(
      initialSolidSignals
    )
  )

  useEffect(
    () => {
      for (let prop in (props?.values || props)) {
        if (
          typeof (
            props
            [prop]
          )
          === 'function'
        ) {
          if (
            !(
              solidSignalsRef
              .current
              [prop]
            )
          ) {
            solidSignalsRef
            .current = {
              ...(
                solidSignalsRef
                .current
              ),
              [prop]: [
                (
                  ...args
                ) => (
                  propsRef
                  .current
                  [prop](
                    ...args
                  )
                )
              ],
            }
          }
        }
        else {
          if (
            !(
              solidSignalsRef
              .current
              [prop]
            )
          ) {
            solidSignalsRef
            .current = {
              ...(
                solidSignalsRef
                .current
              ),
              [prop]: (
                createSignal(
                  props
                  [prop]
                )
              ),
            }
          }
          else {
            solidSignalsRef
            .current
            [prop]
            [1](
              props
              [prop]
            )
          }
        }
      }

      if (
        !(
          solidPropsRef
          .current
        )
      ) {
        solidPropsRef
        .current = (
          Object
          .fromEntries(
            Object
            .entries(
              solidSignalsRef
              .current
            )
            .map(([
              key,
              value,
            ]) => ([
              key,
              (
                value
                [0]
              ),
            ]))
          )
        )
      }
    },
    [
      props,
    ],
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
              getSolidComponentRef
              .current({
                getChildren: () => ([
                  SolidToReactPortalElement({
                    getChildElement: (
                      setPortalDomElement
                    ),
                  }),
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
                props: (
                  solidPropsRef
                  .current
                ),
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
