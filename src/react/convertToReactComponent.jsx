import {
  memo,
  useMemo,
} from 'react'

import ReactToSolidBridge from './ReactToSolidBridge.jsx'

const convertToReactComponent = (
  SolidComponent,
) => {
  const ConvertedSolidComponent = ({
    children,
    ...props
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
