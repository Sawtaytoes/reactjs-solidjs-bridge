import {
  useContext,
} from 'solid-js'

import SolidContext from './SolidContext'

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
    <fieldset>
      <div>
        Solid context consumer.
      </div>

      <button
        onClick={incrementCount}
        type="button"
      >
        {count()}
      </button>
    </fieldset>
  )
}

export default SolidContextConsumer
