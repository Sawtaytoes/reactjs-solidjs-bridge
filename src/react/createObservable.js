const createObservable = (
  initialValue = null,
) => {
  const valueRef = {
    current: (
      initialValue
    ),
  }

  const subscribersRef = {
    current: (
      []
    ),
  }

  const cancelatorsRef = {
    current: (
      new Map()
    ),
  }

  const getValue = () => (
    valueRef
    .current
  )

  const publish = (
    value,
  ) => {
    valueRef
    .current = (
      value
    )

    subscribersRef
    .current
    .forEach((
      subscriber,
    ) => {
      cancelatorsRef
      .current
      .set(
        subscriber,
        (
          subscriber(
            value
          )
        ),
      )
    })
  }

  const subscribe = (
    subscriber = Function.prototype,
  ) => {
    subscribersRef
    .current = (
      subscribersRef
      .current
      .concat(
        subscriber
      )
    )

    return () => {
      cancelatorsRef
      .current
      .get(
        subscriber
      )?.()

      const subscriberIndex = (
        subscribersRef
        .current
        .indexOf(
          subscriber
        )
      )

      subscribersRef
      .current = (
        subscribersRef
        .current
        .slice(
          0,
          subscriberIndex,
        )
        .concat(
          subscribersRef
          .current
          .slice(
            subscriberIndex
            + 1
          )
        )
      )
    }
  }

  return {
    _subscribersRef: subscribersRef,
    getValue,
    publish,
    subscribe,
  }
}

export default createObservable
