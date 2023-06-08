import {
  useEffect,
  useState,
} from 'react'
import {
  Portal,
} from 'react-dom'

const ReactBridgeContainer = ({
  children,
  subscribeToChildren,
}) => {
  const [
    localChildren,
    setLocalChildren,
  ] = (
    useState(
      children
    )
  )

  useEffect(
    () => {
      const unsubscribe = (
        subscribeToChildren(
          setLocalChildren
        )
      )

      return () => {
        unsubscribe()
      }
    },
    [],
  )

  return (
    localChildren
    .map(({
      ChildComponent,
    }) => (
      <ChildComponent />
    ))
  )
}

export default ReactBridgeContainer
