import {
  createMemo,
  createSignal,
} from 'solid-js'

import SolidContext from './SolidContext.js'

const SolidContextProvider = ({
  children,
}) => {
  const [
    count,
    setCount,
  ] = (
    createSignal(
      0
    )
  )

  const incrementCount = () => {
    setCount((
      localCount,
    ) => (
      localCount
      + 1
    ))
  }

  const providerValue = (
    createMemo(() => ({
      count,
      incrementCount,
    }))
  )

  return (
    <SolidContext.Provider value={providerValue}>
      {children}
    </SolidContext.Provider>
  )
}

export default SolidContextProvider
