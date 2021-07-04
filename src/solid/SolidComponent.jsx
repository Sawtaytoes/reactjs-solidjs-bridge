const SolidComponent = ({
  children,
}) => (
  <fieldset>
    I'm a Solid component.

    <h3>
      Children show up here:
    </h3>

    <div>
      {children}
    </div>
  </fieldset>
)

export default SolidComponent
