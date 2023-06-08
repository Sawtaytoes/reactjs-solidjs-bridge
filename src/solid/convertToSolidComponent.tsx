import SolidToReactBridge from './SolidToReactBridge'

const convertToSolidComponent = (
  SolidComponent,
) => {
  const ConvertedReactComponent = (
    props
  ) => (
    <SolidToReactBridge
      props={props}
      solidComponent={SolidComponent}
    >
      {props.children}
    </SolidToReactBridge>
  )

  return ConvertedReactComponent
}

export default convertToSolidComponent
