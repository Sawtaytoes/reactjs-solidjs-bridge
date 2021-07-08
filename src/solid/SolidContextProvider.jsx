import {
  createSignal,
} from 'solid-js'

import SolidContext from './SolidContext.js'

const SolidContextProvider = (
  props,
) => {
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

  return (
    <SolidContext.Provider
      value={{
        count,
        incrementCount,
      }}
    >
      {
        props
        .children
      }
    </SolidContext.Provider>
  )
}

export default SolidContextProvider
