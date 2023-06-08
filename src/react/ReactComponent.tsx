import {
  FunctionComponent,
  type ReactNode,
} from "react"

export type ReactComponentProps = {
  children: ReactNode,
}

export const ReactComponent: (
  FunctionComponent<
    ReactComponentProps
  >
) = ({
  children,
}) => (
  <fieldset>
    <div>
      React component.
    </div>

    {
      children
      ? (
        <div>
          with children.

          <fieldset>
            <h3>
              Solid children show up here:
            </h3>

            <div>
              {children}
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

export default ReactComponent
