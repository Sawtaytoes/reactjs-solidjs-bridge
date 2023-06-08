export type Subscriber<
  ValueType
> = (
  (
    value: (
      ValueType
    ),
  ) => (
    void
  )
)

export type Unsubscriber = () => (
  void
)

export type Observable<
  ValueType,
> = {
  __subscribersRef: {
    current: (
      Subscriber<
        ValueType
      >[]
    ),
  },
  getValue: () => (
    ValueType
  ),
  publish: (
    value: (
      ValueType
    ),
  ) => void,
  subscribe: (
    subscriber: (
      Subscriber<
        ValueType
      >
    ),
  ) => (
    Unsubscriber
  ),
}

export const createObservable = <
  SubscriberValue,
>(
  initialValue: (
    SubscriberValue
  ),
): (
  Observable<
    SubscriberValue
  >
) => {
  type ReturnType = (
    Observable<
      SubscriberValue
    >
  )

  const valueRef = {
    current: (
      initialValue
    ),
  }

  const subscribersRef: (
    ReturnType["__subscribersRef"]
  ) = {
    current: (
      []
    ),
  }

  const cancelatorsRef = {
    current: (
      new Map<
        Subscriber<
          SubscriberValue
        >,
        (
          | (
            () => () => void
          )
          | void
        )
      >()
    ),
  }

  const getValue: (
    ReturnType["getValue"]
  ) = () => (
    valueRef
    .current
  )

  const publish: (
    ReturnType["publish"]
  ) = (
    value
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

  const subscribe: (
    ReturnType["subscribe"]
  ) = (
    subscriber,
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
    __subscribersRef: subscribersRef,
    getValue,
    publish,
    subscribe,
  }
}
