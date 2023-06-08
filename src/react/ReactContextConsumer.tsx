import {
  type FunctionComponent,
  useContext,
} from 'react'

import ReactContext from './ReactContext'

export const ReactContextConsumer: (
  FunctionComponent
) = () => {
  const {
    count,
    incrementCount,
  } = (
    useContext(
      ReactContext
    )
  )

  return (
    <fieldset>
      <div>
        React context consumer.
      </div>

      <button
        onClick={incrementCount}
        type="button"
      >
        {count}
      </button>
    </fieldset>
  )
}

export default ReactContextConsumer
