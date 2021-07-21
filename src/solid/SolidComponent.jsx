import {
  children as solidChildren,
} from 'solid-js'

const SolidComponent = (
  props,
) => {
  const getChildren = (
    solidChildren(
      () => (
        props
        .children
      )
    )
  )

  return (
    <fieldset>
      <div>
        Solid component.
      </div>

      {
        getChildren()
        ? (
          <div>
            with children.

            <fieldset>
              <h3>
                React children show up here:
              </h3>

              <div>
                {getChildren()}
              </div>
            </fieldset>
          </div>
        )
        : (
          <div>
            with no children.
          </div>
        )
      }
    </fieldset>
  )
}

export default SolidComponent
