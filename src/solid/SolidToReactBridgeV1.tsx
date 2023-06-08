import {
  createPortal,
  render,
  unmountComponentAtNode,
} from 'react-dom'
import {
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js'

// Bridge component that portals React children into a Solid element.
const SolidToReactBridge = ({
  children: ReactComponent,
}) => {
  const domElement = (
    <div />
  )

  createEffect(
    () => {
      render(
        ReactComponent,
        domElement,
      )

      // console.log(
      //   createPortal(
      //     children,
      //     ref.current, // This needs to be a ref around the Solid code.
      //   )
      // );

      onCleanup(() => {
        unmountComponentAtNode(
          domElement
        )
      })
    },
  )

  return domElement
}

export default SolidToReactBridge
