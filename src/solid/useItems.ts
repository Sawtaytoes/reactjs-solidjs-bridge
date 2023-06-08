import {
  createMemo,
  createSignal,
} from 'solid-js'

import {
  createObservable,
} from '../react/createObservable'

const useItems = <
  Item,
>() => {
  const observable = (
    createMemo(
      () => (
        createObservable<
          Array<
            Item
          >
        >(
          []
        )
      ),
    )
  )

  const addItem = (
    item: Item,
  ) => {
    observable()
    .publish(
      observable()
      .getValue()
      .concat(
        item
      )
    )
  }

  const removeItem = (
    item: Item,
  ) => {
    const items = (
      observable()
      .getValue()
    )

    const itemIndex = (
      items
      .indexOf(
        item
      )
    )

    const nextItems = (
      items
      .slice(
        0,
        itemIndex,
      )
      .concat(
        items
        .slice(
          itemIndex
          + 1
        )
      )
    )

    observable()
    .publish(
      nextItems
    )
  }

  return {
    addItem,
    getValue: (
      observable()
      .getValue
    ),
    removeItem,
    subscribeToItems: (
      observable()
      .subscribe
    ),
  }
}

export default useItems
