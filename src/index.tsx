import React from "react"
import { createRoot } from 'react-dom/client'

// import "./i18n"
import App from "./App"

import "./index.css"

const container = document.getElementById('app')

if (!container) {
	throw Error("Application can not be mounted.")
}

const root = createRoot(container)

root.render(
	<React.StrictMode>
		<React.Suspense fallback="Loading ...">
			<App />
		</React.Suspense>
	</React.StrictMode>,
)

