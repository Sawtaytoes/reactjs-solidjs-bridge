# Solid React Bridging

Render Solid.js components in React.js and visa versa.

Currently, only React is able to retain context when doing this, but the plan is to get Solid to also share context.

Ideally, both React and Solid would share contexts, so you could have one `Provider` component, either in React or Solid, and it would propagate those contexts whenever a bridge occurs.
