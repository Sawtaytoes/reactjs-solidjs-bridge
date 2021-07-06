import {
  createEffect,
  createSignal,
  For,
  onCleanup,
} from 'solid-js'
import {
  Portal,
} from 'solid-js/web'

const SolidBridgeContainer = ({
  getChildren,
  subscribeToChildren,
}) => {
  const [
    children,
    setChildren,
  ] = (
    createSignal(
      getChildren()
    )
  )

  createEffect(() => {
    const unsubscribe = (
      subscribeToChildren(
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
