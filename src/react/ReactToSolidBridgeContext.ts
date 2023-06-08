import {
  createContext,
} from 'react'
import {
  Component
} from 'solid-js'

export type ReactToSolidBridgeContextType = {
  addSolidChild: (
    solidComponent: (
      Component
    )
  ) => (
    void
  ),
  removeSolidChild: (
    solidComponent: (
      Component
    )
  ) => (
    void
  ),
}

export const defaultReactToSolidBridgeContextValue: (
  ReactToSolidBridgeContextType
) = {
  addSolidChild: () => {},
  removeSolidChild: () => {},
}

export const ReactToSolidBridgeContext = (
  createContext(
    defaultReactToSolidBridgeContextValue
  )
)

export default ReactToSolidBridgeContext
