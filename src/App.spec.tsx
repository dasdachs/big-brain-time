/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment */
import { createRoot } from 'react-dom/client'
// @ts-ignore
import { useInitFirebaseApp } from "./hooks";
// @ts-ignore
import { GamesList } from "./pages"

jest.mock("./pages");
jest.mock("./hooks");

import App from "./App"

test("renders without crashing", () => {
	const div = document.createElement("div")
	const root = createRoot(div)
	root.render(<App />)
	root.unmount()
})

