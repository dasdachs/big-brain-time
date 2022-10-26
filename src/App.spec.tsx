/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment */
import { createRoot } from 'react-dom/client'
// @ts-ignore
import { useInitFirebaseApp } from "./hooks";
// @ts-ignore
import { initializeApp, FirebaseApp } from "firebase/app";
// @ts-ignore
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth"

jest.mock("firebase/app");
jest.mock("firebase/auth");
jest.mock("./hooks");

import App from "./App"

test("renders without crashing", () => {
	const div = document.createElement("div")
	const root = createRoot(div)
	root.render(<App />)
	root.unmount()
})

