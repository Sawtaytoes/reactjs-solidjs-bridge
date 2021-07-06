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

  // createEffect(() => {
  //   console.log(children())
  // })

  return (
    <For each={children()}>
      {(
        SolidChildComponent,
      ) => (
        <SolidChildComponent />
      )}
    </For>
  )
}

export default SolidBridgeContainer
