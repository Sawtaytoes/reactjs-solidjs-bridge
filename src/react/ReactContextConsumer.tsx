import {
  useContext,
} from 'react'

import ReactContext from './ReactContext'

const ReactContextConsumer = () => {
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
