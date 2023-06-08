import {
  useCallback,
  useMemo,
  useState,
} from 'react'

import ReactContext from './ReactContext'

const ReactContextProvider = ({
  children,
}) => {
  const [
    count,
    setCount,
  ] = (
    useState(
      0
    )
  )

  const incrementCount = (
    useCallback(
      () => {
        setCount((
          localCount,
        ) => (
          localCount
          + 1
        ))
      },
      [],
    )
  )

  const providerValue = (
    useMemo(
      () => ({
        count,
        incrementCount,
      }),
      [
        count,
        incrementCount,
      ],
    )
  )

  return (
    <ReactContext.Provider value={providerValue}>
      {children}
    </ReactContext.Provider>
  )
}

export default ReactContextProvider
