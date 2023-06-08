import {
  useEffect,
  useRef,
} from 'react'

export type ReactToSolidPortalElementProps = {
  getChildElement: (
    domElement: HTMLDivElement
  ) => void
}

export const ReactToSolidPortalElement = ({
  getChildElement,
}: ReactToSolidPortalElementProps) => {
  const domElementRef = (
    useRef<
      HTMLDivElement
    >(
      null
    )
  )

  useEffect(
    () => {
      getChildElement(
        (
          domElementRef
          .current
        ) as ( // We know better on how React works. This will always have a DOM element. It can never be `null`.
          HTMLDivElement
        )
      )
    },
    [],
  )

  return (
    <div ref={domElementRef} />
  )
}

export default ReactToSolidPortalElement
