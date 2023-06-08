export const SolidToReactPortalElement = ({
  getChildElement,
}: {
  getChildElement: (
    domElement: (
      HTMLElement
    )
  ) => void
}) => {
  const domElement = <div />

  getChildElement(
    domElement as (
      HTMLDivElement
    )
  )

  return domElement
}

export default SolidToReactPortalElement
