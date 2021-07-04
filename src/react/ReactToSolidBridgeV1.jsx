import {
  useEffect,
  useRef,
} from 'react'
import {
  createPortal,
} from 'react-dom'
import { render } from 'solid-js/web'

// Bridge component that portals React children into a Solid element.
const ReactToSolidBridge = ({
  children: SolidComponent,
}) => {
  const divRef = useRef()
  const SolidComponentRef = useRef()

  SolidComponentRef
  .current = (
    SolidComponent
  )

  useEffect(
    () => {
      const dispose = (
        render(
          () => (
            SolidComponentRef
            .current()
          ),
          (
            divRef
            .current
          ),
        )
      )

      // console.log(
      //   createPortal(
      //     children,
      //     ref.current, // This needs to be a ref around the Solid code.
      //   )
      // );

      return () => {
        dispose()
      }
    },
    [],
  )

  return (
    <div ref={divRef} />
  )
}

export default ReactToSolidBridge
