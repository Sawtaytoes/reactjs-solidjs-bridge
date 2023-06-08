import {
  useCallback,
  useMemo,
  useState,
} from 'react'

import {
  createObservable,
} from './createObservable'

const useItems = <
  Item,
>() => {
  const {
    getValue: getItems,
    publish: publishItems,
    subscribe: subscribeToItems,
  } = (
    useMemo(
      () => (
        createObservable<
          Array<
            Item
          >
        >(
          []
        )
      ),
      [],
    )
  )

  const addItem = (
    useCallback(
      (
        item: Item,
      ) => {
        publishItems(
          getItems()
          .concat(
            item
          )
        )
      },
      [
        getItems,
        publishItems,
      ],
    )
  )

  const removeItem = (
    useCallback(
      (
        item: Item,
      ) => {
        const items = (
          getItems()
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

        publishItems(
          nextItems
        )
      },
      [
        getItems,
        publishItems,
      ],
    )
  )

  return {
    addItem,
    getItems,
    removeItem,
    subscribeToItems,
  }
}

export default useItems
