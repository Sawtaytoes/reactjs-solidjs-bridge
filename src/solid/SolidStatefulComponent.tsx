import {
  type Component,
  createSignal,
} from 'solid-js'

export type SolidStatefulComponentType = {
  count: number,
}

const SolidStatefulComponent: (
  Component<
    SolidStatefulComponentType
  >
) = (
  props,
) => {
  const [
    localCount,
    setLocalCount,
  ] = (
    createSignal(
      0
    )
  )

  const incrementLocalCount = () => {
    setLocalCount((
      localCount,
    ) => (
      localCount
      + 1
    ))
  }

  return (
    <fieldset>
      <div>
        Solid stateful component.
      </div>

      <button
        onClick={incrementLocalCount}
        type="button"
      >
        <div>Local: {localCount()}</div>
        <div>Controlled: {props.count}</div>
      </button>
    </fieldset>
  )
}

export default SolidStatefulComponent
