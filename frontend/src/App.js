import "./App.css"

import Layout from "./components/Layout/Layout"
import { Toaster } from "react-hot-toast"

function App() {
	return (
		<>
			<Toaster position="top-right" />
			<Layout />
			
		</>
	)
}

export default App
