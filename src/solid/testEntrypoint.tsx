import {
  render,
} from 'solid-js/web'

const dispose = (
  render(
    () => (
      <div>yo</div>
    ),
    (
      document
      .getElementById(
        'solid-root'
      ) as (
        HTMLDivElement
      )
    ),
  )
)

if (
  import
  .meta
  .hot
) {
  import
  .meta
  .hot
  .accept()

  import
  .meta
  .hot
  .dispose(
    dispose
  )
}
