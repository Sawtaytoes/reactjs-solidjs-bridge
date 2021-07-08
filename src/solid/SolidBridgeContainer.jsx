import {
  createEffect,
  createSignal,
  For,
  onCleanup,
} from 'solid-js'
import {
  Portal,
} from 'solid-js/web'

const SolidBridgeContainer = (
  props,
) => {
  const [
    children,
    setChildren,
  ] = (
    createSignal(
      props
      .getChildren()
    )
  )

  createEffect(() => {
    const unsubscribe = (
      props
      .subscribeToChildren(
        setChildren
      )
    )

    onCleanup(() => {
      unsubscribe()
    })
  })

  return (
    <For each={children()}>
      {(
        ChildComponent,
      ) => (
        <ChildComponent />
      )}
    </For>
  )
}

export default SolidBridgeContainer
