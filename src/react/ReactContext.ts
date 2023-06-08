import {
  createContext,
} from 'react'

export type ReactContextType = {
  count: number,
  incrementCount: () => (
    void
  ),
}

export const defaultReactContextValue: (
  ReactContextType
) = {
  count: 0,
  incrementCount: () => {},
}

export const ReactContext = (
  createContext(
    defaultReactContextValue
  )
)

export default ReactContext
