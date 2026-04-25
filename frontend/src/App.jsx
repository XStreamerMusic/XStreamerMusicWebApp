import { router } from "./routes"
import { fetchCsrfToken } from "./api/api"
import { RouterProvider } from "react-router-dom"


function App() {

	fetchCsrfToken()
	
    return (
		<RouterProvider router={router}/>
	)
}

export default App
