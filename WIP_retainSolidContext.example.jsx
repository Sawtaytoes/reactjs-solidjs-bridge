// index.html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="react-root"></div>
    <div id="solid-root"></div>

    <script src="http://localhost:3000/reactBundle.js"></script>
  </body>
</html>

// reactEntrypoint.jsx
ReactDOM.render(
  <ReactToSolidBridgeProvider>
    <ReactToSolidBridge
      getSolidComponent={({
        getChildren,
      }) => (
        SolidContext
        .Provider({
          get children() {
            return [
              SolidContextConsumer(),
              
              // This is the styled `div` below.
              getChildren(),
            ]
          },
          value: {
            count: () => (
              count
            ),
          },
        })
      )}
    >
      <div style={{ padding: '20px' }}>
        <ReactToSolidBridge
          getSolidComponent={({
            getChildren,
          }) => (
            // This should refer to the parent's provider.
            SolidContextConsumer()
          )}
        />
      </div>
    </ReactToSolidBridge>
  </ReactToSolidBridgeProvider>
)

// Components
const useItemsList = () => {
  const {
    itemsList,
    setItemsList,
  } = (
    useState(
      []
    )
  )

  const add = (
    useCallback(
      (
        item,
      ) => {
        setItemsList((
          localItemsList,
        ) => (
          localItemsList
          .concat(item)
        ))
      },
      [],
    )
  )

  const remove = (
    useCallback(
      (
        item,
      ) => {
        // ...
      },
      [],
    )
  )

  return {
    add,
    itemsList,
  }
}


const ReactToSolidBridgeProvider = ({
  children,
  getSolidComponent,
}) => {
  const {
    add: addSolidChild,
    itemsList: solidChildren,
  } = (
    useItemsList()
  )
  
  useEffect(
    () => {
      // How do I prevent this from ever re-rendering? I don't want to lose Solid's state because React added another Solid child.
      const dispose = (
        solidWeb.render(
          // I removed React portal implementation details.
          () => (
            getSolidComponent({
              getChildren: () => (
                // This returns an array of all top-level Solid children which were rendered by each `ReactToSolidBridge`.
                // If a `ReactToSolidBridge` renders another `ReactToSolidBridge`, then this component won't see it.
                solidChildren
              ),
            })
          ),
          (
            // The render occurs outside of the React root div because it's going to Portal anyway.
            document
            .querySelector(
              '#solid-root'
            )
          )
        )
      )

      return () => {
        dispose()
      }
    },
    [
      solidChildren,
    ],
  )
  
  return (
    <ReactToSolidBridgeContext.Provider value={{
      addSolidChild,
    }}>
      {/* React will normally portal `children`, so it can keep its context. */}
      {children}
    </ReactToSolidBridgeContext.Provider>
  )
}

const ReactToSolidBridge = () => {
  const {
    addSolidChild,
  } = (
    useContext(
      ReactToSolidBridgeContext
    )
  )
  
  const {
    add: addSolidGrandchild,
    itemsList: solidChildren,
  } = (
    useItemsList()
  )

  useEffect(
    () => {
      SolidPortal({
        get children() {
          const solidChild = (
            getSolidComponent({
              getChildren: () => (
                solidChildren
              ),
            })
          )

          if (addSolidChild) {
            addSolidChild(
              solidChild
            )
          }
          else {
            throw new Error(
              'You need to wrap `ReactToSolidBridge` in a `ReactToSolidBridgeProvider` component at the top-level of your React app.'
            )
          }

          return solidChild
        },
        mount: (
          reactToSolidElementRef
          .current
        ),
      }
    },
    [
      solidChildren,
    ],
  )

  return (
    <ReactToSolidBridgeContext.Provider value={{
      addSolidChild: addSolidGrandchild,
    }}>
      <div ref={reactToSolidElementRef}>
        {/* React will normally portal `children`, so it can keep its context. */}
        {children}
      </div>
    </ReactToSolidBridgeContext.Provider>
  )
}
