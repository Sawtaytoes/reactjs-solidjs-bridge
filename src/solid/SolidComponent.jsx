const SolidComponent = (
  props,
) => (
  <fieldset>
    <div>
      Solid component.
    </div>

    {
      (
        props
        .children
      )
      ? (
        <div>
          with children.

          <fieldset>
            <h3>
              React children show up here:
            </h3>

            <div>
              {
                props
                .children
              }
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

export default SolidComponent
