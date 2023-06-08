import {
  ReactNode,
  memo,
} from 'react'
import {
  Component,
} from 'solid-js'

import ReactToSolidBridge from './ReactToSolidBridge'

const convertToReactComponent = (
  SolidComponent: Component,
) => {
  const ConvertedSolidComponent = ({
    children,
    ...props
  }: {
    children: ReactNode,
  }) => (
    <ReactToSolidBridge
      props={props}
      solidComponent={SolidComponent}
    >
      {children}
    </ReactToSolidBridge>
  )

  const MemoizedConvertedSolidComponent = (
    memo(
      ConvertedSolidComponent
    )
  )

  return MemoizedConvertedSolidComponent
}

export default convertToReactComponent
