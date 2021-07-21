# React to Solid to React Bridging
Render Solid.js components in React.js and visa versa.

This library allows you to even render React children in Solid components rendered by React and retain both state and context!

## What works today
###### Working
React -> Solid -> React -> Solid -> ...

###### Works but needs testing
Solid -> React -> Solid

###### Incomplete
Solid -> React -> Solid -> React -> ...

## How to Use
For rendering Solid components in React apps, you'll need to import 2 components:
1. `ReactToSolidBridgeProvider`
2. `ReactToSolidBridge`

Import them like so:
```jsx
import {
  ReactToSolidBridge,
  ReactToSolidBridgeProvider,
} from 'react-solid-bridge'
```

You'll wrap either your entire app or the part that needs to render Solid.js components in `ReactToSolidBridgeProvider`. Ideally, this would be at the top-level of your app.

The `ReactToSolidBridge` component renders Solid components and allows rendering React children in those Solid components.

This works because `ReactToSolidBridgeProvider` renders a  Solid app into a `div` element that it creates. From there, Solid components are portalled into a `div` rendered by `ReactToSolidBridge`.

If this sounds complicated, it is. Thankfully, that's all been black-boxed, and you shouldn't have to worry about it.

## Examples
### Basic Example (no children)

```jsx
import {
  ReactToSolidBridge,
  ReactToSolidBridgeProvider,
} from 'react-solid-bridge'

import SolidComponent from '../solid/SolidComponent.jsx'

const App = () => (
  <ReactToSolidBridgeProvider>
    <ReactToSolidBridge
      getSolidComponent={({
        props,
      }) => (
        SolidComponent({
          count: (
            props
            .count
          ),
          incrementCount: (
            props
            .incrementCount
          ),
        })
      )}
      props={{
        count,
        incrementCount,
      }}
    />
  </ReactToSolidBridgeProvider>
)

export default App
```

### React -> Solid -> React with children

> _**NOTE:** When creating a Solid component, `children` needs to be a getter._

```jsx
import {
  ReactToSolidBridge,
  ReactToSolidBridgeProvider,
} from 'react-solid-bridge'

import ReactComponent from './ReactComponent.jsx'
import SolidComponent from '../solid/SolidComponent.jsx'

const App = () => (
  <ReactToSolidBridgeProvider>
    <ReactToSolidBridge
      getSolidComponent={({
        getChildren,
        props,
      }) => (
        SolidComponent({
          get children() {
            return getChildren()
          },
        })
      )}
    >
      <ReactComponent />
    </ReactToSolidBridge>
  </ReactToSolidBridgeProvider>
)

export default App
```

### Shared Context Example
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
                      count: (
                        props
                        .count
                      ),
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
