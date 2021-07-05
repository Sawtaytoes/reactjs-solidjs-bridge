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
    <div>
      <div>
        I'm a React context consumer.
      </div>

      <button
        onClick={incrementCount}
        type="button"
      >
        {count}
      </button>
    </div>
  )
}

export default ReactContextConsumer
