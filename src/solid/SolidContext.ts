import {
  createContext,
} from 'solid-js'

export type SolidContextType = {
  count: () => number,
  incrementCount: () => void,
}

export const defaultSolidContextValue: (
  SolidContextType
) = {
  count: () => -1,
  incrementCount: () => {},
}

export const SolidContext = (
  createContext(
    defaultSolidContextValue
  )
)

export default SolidContext
