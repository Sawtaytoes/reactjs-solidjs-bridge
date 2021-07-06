const {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import createObservable from './createObservable'

const useItemsList = () => {
  const {
    getValue,
    publish,
    subscribe,
  } = (
    useMemo(
      () => (
        createObservable()
      ),
      [],
    )
  )

  const {
    items,
    setItems,
  } = (
    useState(
      []
    )
  )

  const add = (
    useCallback(
      (
        item,
      ) => {
        setItems((
          localItemsList,
        ) => (
          localItemsList
          .concat(item)
        ))
      },
      [],
    )
  )

  const remove = (
    useCallback(
      (
        item,
      ) => {
        setItems((
          localItemsList,
        ) => {
          const itemIndex = (
            localItemsList
            .indexOf(
              item
            )
          )

          localItemsList
          .slice(
            0,
            itemIndex,
          )
          .concat(
            localItemsList
            .slice(
              itemIndex
              + 1
            )
          )
        })
      },
      [],
    )
  )

  useEffect(
    () => {
      publish(
        items
      )
    },
    [
      items,
      publish,
    ],
  )

  return {
    add,
    getItemsList,
    publishItemsList: publish,
    remove,
    subscribeToItemsList: subscribe,
  }
}

export default useItemsList
