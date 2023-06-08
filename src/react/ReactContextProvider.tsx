import {
  type FunctionComponent,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'

import ReactContext from './ReactContext'

export type ReactContextProviderProps = {
  children: ReactNode,
}

export const ReactContextProvider: (
  FunctionComponent<
    ReactContextProviderProps
  >
) = ({
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
