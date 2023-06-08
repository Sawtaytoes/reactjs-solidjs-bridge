import {
  type Component,
  type ParentComponent,
  createEffect,
  createSignal,
  For,
  onCleanup,
} from 'solid-js'

export type SolidBridgeContainerType = {
  getChildren: () => (
    Component
  ),
  subscribeToChildren: (
    subscriber: (
      children: (
        Component
      )
    ) => (
      void
    ),
  ) => (
    () => (
      void
    )
  )
}

export const SolidBridgeContainer: (
  ParentComponent<
    SolidBridgeContainerType
  >
) = (
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
      .subscribeToChildren((
        children,
      ) => {
        setChildren(
          children
        )
      })
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
