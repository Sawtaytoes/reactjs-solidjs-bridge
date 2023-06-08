import {
  useCallback,
  useState,
} from 'react'

const ReactStatefulComponent = ({
  children,
  count = 0,
}) => {
  const [
    localCount,
    setLocalCount,
  ] = (
    useState(
      0
    )
  )

  const incrementLocalCount = (
    useCallback(
      () => {
        setLocalCount((
          localCount,
        ) => (
          localCount
          + 1
        ))
      },
      [],
    )
  )

  return (
    <fieldset>
      <div>
        React stateful component.
      </div>

      <button
        onClick={incrementLocalCount}
        type="button"
      >
        <div>Local: {localCount}</div>
        <div>Controlled: {count}</div>
      </button>
    </fieldset>
  )
}

export default ReactStatefulComponent
