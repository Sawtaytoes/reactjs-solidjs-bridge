import {
  useEffect,
  useRef,
} from 'react'

const ReactToSolidPortalElement = ({
  getChildElement,
}) => {
  const domElementRef = useRef()
  
  useEffect(
    () => {
      getChildElement(
        domElementRef
        .current
      )
    },
    [],
  )
  
  return (
    <div ref={domElementRef} />
  )
}

export default ReactToSolidPortalElement
