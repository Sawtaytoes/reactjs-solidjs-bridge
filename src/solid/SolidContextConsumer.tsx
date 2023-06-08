import {
  useContext,
} from 'solid-js'

import SolidContext from './SolidContext'

export const SolidContextConsumer = () => {
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
        {
          count() === -1
          ? 'No count available.'
          : count()
        }
      </button>
    </fieldset>
  )
}

export default SolidContextConsumer
