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
  children: reactComponentChildren,
}) => {
  const domElement = (
    <div />
  )

  createEffect(
    () => {
      render(
        (
          createPortal(
            reactComponentChildren,
            domElement,
          )
        ),
        domElement,
      )

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
