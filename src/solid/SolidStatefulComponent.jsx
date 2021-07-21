import {
  createSignal,
} from 'solid-js'

const SolidStatefulComponent = (
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
