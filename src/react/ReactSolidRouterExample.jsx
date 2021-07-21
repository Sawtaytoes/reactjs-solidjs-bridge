import {
  Cube as SolidCube,
  Horse as SolidHorse,
} from 'phosphor-solid'
import {
  Link as SolidLink,
  Route,
  Router as SolidRouter,
  Routes,
} from 'solid-app-router'

import convertToReactComponent from './convertToReactComponent.jsx'
import ReactToSolidBridge from './ReactToSolidBridge.jsx'

const Cube = convertToReactComponent(SolidCube)
const Horse = convertToReactComponent(SolidHorse)
const Link = convertToReactComponent(SolidLink)
const Router = convertToReactComponent(SolidRouter)

const ReactSolidRouterExample = () => (
  <fieldset>
    <Router>
      <Link href="/">
        Home
      </Link>

      <Link href="/about">
        About
      </Link>

      <ReactToSolidBridge
        getSolidComponent={({
          getChildren,
        }) => (
          Routes({
            get children() {
              return (
                Route({
                  element: getChildren(),
                  path: '/',
                })
              )
            }
          })
        )}
      >
        <Horse
          color="pink"
          size={64}
        />
      </ReactToSolidBridge>

      <ReactToSolidBridge
        getSolidComponent={({
          getChildren,
        }) => (
          Routes({
            get children() {
              return (
                Route({
                  element: getChildren(),
                  path: '/about',
                })
              )
            }
          })
        )}
      >
        <Cube
          color={() => (
            (
              Math
              .round(
                Math
                .random()
              )
            )
            ? 'teal'
            : 'blue'
          )}
          size={64}
          weight="duotone"
        />
      </ReactToSolidBridge>
    </Router>
  </fieldset>
)

export default ReactSolidRouterExample
