import { render } from 'solid-js/web'

import SolidComponent from './SolidComponent.jsx'

render(
	() => (
		<SolidComponent />
	),
	(
		document
		.querySelector(
			'#root'
		)
	),
)
