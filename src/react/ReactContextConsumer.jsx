import {
  useContext,
} from 'react'

import ReactContext from './ReactContext.js'

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
        I'm a React context consumer.
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
