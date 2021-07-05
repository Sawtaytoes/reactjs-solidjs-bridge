import {
  useContext,
} from 'solid-js'

import SolidContext from './SolidContext.js'

const SolidContextConsumer = () => {
  const {
    count,
    incrementCount,
  } = (
    useContext(
      SolidContext
    )
  )

  return (
    <div>
      <div>
        I'm a Solid context consumer.
      </div>

      <button
        onClick={incrementCount}
        type="button"
      >
        {count()}
      </button>
    </div>
  )
}

export default SolidContextConsumer
