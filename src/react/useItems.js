import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import createObservable from './createObservable'

const useItems = () => {
  const {
    getValue: getItems,
    publish: publishItems,
    subscribe: subscribeToItems,
  } = (
    useMemo(
      () => (
        createObservable(
          []
        )
      ),
      [],
    )
  )

  const addItem = (
    useCallback(
      (
        item,
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
        item,
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
