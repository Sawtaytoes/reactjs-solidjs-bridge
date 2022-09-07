# React to Solid to React Bridging
Render Solid.js components in React.js and visa versa.

This library allows you to even render React children in Solid components rendered by React and retain both state and context!

## Installation
### npm
```
npm install react-solid-bridge
```

### yarn
```
yarn add react-solid-bridge
```

## What works today
###### Working
React -> Solid -> React -> Solid -> ...

###### Works but needs testing
Solid -> React -> Solid

###### Incomplete
Solid -> React -> Solid -> React -> ...

_**NOTE:** While context works in both Solid and React, their contexts aren't shared. You have to create a Solid context provider and pass it props from the React context if you want to keep them in sync. Typically, you can do this by passing props through `useContext` in React to Solid components._

## How to Use
For rendering Solid components in React apps, you have to import the provider component: `ReactToSolidBridgeProvider`.

From there, it has multiple APIs:
1. `convertToReactComponent` higher-order component (easiest).
2. `ReactToSolidBridge` with the `solidComponent` prop (medium).
3. `ReactToSolidBridge` with the `getSolidComponent` prop (confusing).

You can import these like so:
```jsx
import {
  convertToReactComponent,
  ReactToSolidBridge,
  ReactToSolidBridgeProvider,
} from 'react-solid-bridge'
```

### `ReactToSolidBridgeProvider`
You'll wrap either your entire app or the part that needs to render Solid.js components in `ReactToSolidBridgeProvider`. Ideally, this would be at the top-level of your app.

### `convertToReactComponent`
`convertToReactComponent` is a friendly wrapper around `ReactToSolidBridge`. It allows you to convert Solid components into React components, but some things won't work right if they have weird APIs (like the `Routes` component from `solid-app-router`).

> _**NOTE:** This does not work with Solid context providers: `Context.Provider`. If you have one of those, you'll have to use `ReactToSolidBridge` with the `getSolidComponent` prop._

Typically, this higher-order component will work without issue.

You use it like so:
```jsx
import {
  Cube as SolidCube,
  Horse as SolidHorse,
} from 'phosphor-solid'
import {
  convertToReactComponent,
  ReactToSolidBridgeProvider,
} from 'react-solid-bridge'

const Cube = convertToReactComponent(SolidCube)
const Horse = convertToReactComponent(SolidHorse)

const App = () => (
  <ReactToSolidBridgeProvider>
    <Cube />
    <Horse />
  </ReactToSolidBridgeProvider>
)

export default App
```

Once you've done this, they'll function like regular React components.

## `ReactToSolidBridge`
`ReactToSolidBridge` is a React component that renders Solid components and allows rendering React children in those Solid components.

This works because `ReactToSolidBridgeProvider` renders a  Solid app into a `div` element that it creates. From there, Solid components are portalled into a `div` rendered by `ReactToSolidBridge`.

If this sounds complicated, it is. Thankfully, that's all been black-boxed, and you shouldn't have to worry about it.

### Medium Difficulty API
This is the same API used by the `convertToReactComponent` higher-order component. It's **highly recommended** to use that function instead.

This example shows rendering both React `children` and props from React into a Solid component.

```jsx
import {
  useCallback,
  useState,
} from 'react'
import {
  ReactToSolidBridge,
  ReactToSolidBridgeProvider,
} from 'react-solid-bridge'

import ReactComponent from './ReactComponent.jsx'
import SolidComponent from '../solid/SolidComponent.jsx'

const App = () => {
  const [
    count,
    setCount,
  ] = (
    useState(
      0
    )
  )

  const incrementCount = (
    useCallback(
      () => {
        setCount((
          localCount,
        ) => (
          localCount
          + 1
        ))
      },
      [],
    )
  )
  
  return (
    <ReactToSolidBridgeProvider>
      <ReactToSolidBridge
        props={{
          count,
          incrementCount,
        }}
        solidComponent={SolidComponent}
      >
        <ReactComponent />
      </ReactToSolidBridge>
    </ReactToSolidBridgeProvider>
  )
}
```

### Customizable, but confusing and sometimes required, API
> _**NOTE:** When creating a Solid component, `children` needs to be a getter, and it's **highly recommended** to do that with all non-function props as well._

If this is a local component, meaning you have Webpack configured to render both React and Solid JSX in the bundle, and this exists in your repository, then you only need `children` to be a getter.

This example details using the customizable, but confusing API for `ReactToSolidBridge` and how you can render multiple Solid components next to each other this way.

This API is not recommended unless you have a use case. If the other APIs throw errors, then this one might be right for you.

```jsx
import {
  useCallback,
  useState,
} from 'react'
import {
  ReactToSolidBridge,
  ReactToSolidBridgeProvider,
} from 'react-solid-bridge'

import ReactComponent from './ReactComponent.jsx'
import SolidComponent1 from '../solid/SolidComponent1.jsx'
import SolidComponent2 from '../solid/SolidComponent2.jsx'

const App = () => {
  const [
    count,
    setCount,
  ] = (
    useState(
      0
    )
  )

  const incrementCount = (
    useCallback(
      () => {
        setCount((
          localCount,
        ) => (
          localCount
          + 1
        ))
      },
      [],
    )
  )
  
  return (
    <ReactToSolidBridgeProvider>
      <ReactToSolidBridge
        props={{
          count,
          incrementCount,
        }}
        getSolidComponent={({
          getChildren,
          props,
        }) => ([
          SolidComponent1({
            get children() {
              return getChildren()
            },
            get count() {
              return (
                props
                .count()
              )
            },
          })
          SolidComponent2({
            incrementCount: (
              props
              .incrementCount
            ),
          })
        ])}
      >
        <ReactComponent />
      </ReactToSolidBridge>
    </ReactToSolidBridgeProvider>
  )
}
```

## Shared Context Example
> _**NOTE:** When creating a Solid component, `children` needs to be a getter, and it's **highly recommended** to do that with all non-function props as well._

This example shows rendering React children in Solid along with both React and Solid components having access to a shared context.

```jsx
import {
  ReactToSolidBridge,
  ReactToSolidBridgeProvider,
} from 'react-solid-bridge'

import ReactComponent from './ReactComponent.jsx'
import ReactContext from './ReactContext.js'
import ReactContextConsumer from './ReactContextConsumer.jsx'
import ReactContextProvider from './ReactContextProvider.jsx'
import ReactStatefulComponent from './ReactStatefulComponent.jsx'
import SolidComponent from '../solid/SolidComponent.jsx'
import SolidContext from '../solid/SolidContext.js'
import SolidContextConsumer from '../solid/SolidContextConsumer.jsx'
import SolidStatefulComponent from '../solid/SolidStatefulComponent.jsx'

const App = () => (
  <ReactToSolidBridgeProvider>
    <ReactContextProvider>
      <ReactContextConsumer />

      <ReactContext.Consumer>
        {
          ({
            count,
            incrementCount,
          }) => (
            <ReactToSolidBridge
              getSolidComponent={({
                getChildren,
                props,
              }) => (
                SolidContext
                .Provider({
                  get children() {
                    return (
                      SolidComponent({
                        children: getChildren,
                      })
                    )
                  },
                  value: {
                    count: (
                      props
                      .count
                    ),
                    incrementCount: (
                      props
                      .incrementCount
                    ),
                  },
                })
              )}
              props={{
                count,
                incrementCount,
              }}
            >
              <ReactContextConsumer />

              <ReactComponent>
                <ReactToSolidBridge
                  getSolidComponent={({
                    getChildren,
                    props,
                  }) => ([
                    SolidContextConsumer(),
                    SolidStatefulComponent({
                      get count() {
                        return (
                          props
                          .count()
                        )
                      },
                    }),
                    getChildren(),
                  ])}
                  props={{
                    count,
                  }}
                >
                  <ReactContextConsumer />
                  <ReactStatefulComponent
                    count={count}
                  />
                </ReactToSolidBridge>
              </ReactComponent>
            </ReactToSolidBridge>
          )
        }
      </ReactContext.Consumer>
    </ReactContextProvider>
  </ReactToSolidBridgeProvider>
)

export default App
```

## Things to keep in mind
### Rendering React and Solid apps side-by-side
When using Solid in side of React or visa versa, this works great if you're using a library.

If you want to run both libraries side-by-side, you need to have separate Babel configs for React and Solid JSX. While both are JSX, they require different pragmas.

That's beyond the scope of this library, but the source code of `react-solid-bridge` actually achieves this feat using a single Webpack config.
