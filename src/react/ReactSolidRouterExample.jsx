import { Cube, Horse } from 'phosphor-solid'
import { Router, Routes, Route, Link } from 'solid-app-router'

import ReactToSolidBridge from './ReactToSolidBridge.jsx'

const ReactSolidRouterExample = () => (
  <ReactToSolidBridge
    getSolidComponent={({
      getChildren,
    }) => (
      Router({
        get children() {
          return getChildren();
        }
      })
    )}
  >
    <ReactToSolidBridge
      getSolidComponent={({
        getChildren,
      }) => (
        Link({
          get children() {
            return getChildren();
          },
          href: '/',
        })
      )}
    >
      Home
    </ReactToSolidBridge>

    <ReactToSolidBridge
      getSolidComponent={({
        getChildren,
      }) => (
        Link({
          get children() {
            return getChildren();
          },
          href: '/about',
        })
      )}
    >
      About
    </ReactToSolidBridge>

    <ReactToSolidBridge
      getSolidComponent={({
        getChildren,
      }) => (
        Routes({
          get children() {
            return [
              Route({
                element: getChildren(),
                path: '/',
              }),
            ]
          }
        })
      )}
    >
      <ReactToSolidBridge
        props={{
          color: 'pink',
          size: 64,
        }}
        solidComponent={Horse}
      />
    </ReactToSolidBridge>

    <ReactToSolidBridge
      getSolidComponent={({
        getChildren,
      }) => (
        Routes({
          get children() {
            return [
              Route({
                element: getChildren(),
                path: '/about',
              }),
            ]
          }
        })
      )}
    >
      <ReactToSolidBridge
        props={{
          color: () => (
            (
              Math
              .round(
                Math
                .random()
              )
            )
            ? 'teal'
            : 'blue'
          ),
          size: 64,
          weight: 'duotone',
        }}
        solidComponent={Cube}
      />
    </ReactToSolidBridge>
  </ReactToSolidBridge>
)

export default ReactSolidRouterExample
