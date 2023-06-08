import { FunctionComponent } from 'react'
import {
  SolidToReactBridge,
} from './SolidToReactBridge'
import { ParentComponent } from 'solid-js'

export const convertToSolidComponent = <
  Props,
>(
  ReactComponent: (
    FunctionComponent<
      Props
    >
  ),
) => {
  const ConvertedReactComponent: (
    ParentComponent<
      Props
    >
  ) = (
    props
  ) => (
    // TODO: Figure out why this component is being passed the wrong props.
    <SolidToReactBridge
      props={props}
      solidComponent={ReactComponent}
    >
      {props.children}
    </SolidToReactBridge>
  )

  return ConvertedReactComponent
}

export default convertToSolidComponent
