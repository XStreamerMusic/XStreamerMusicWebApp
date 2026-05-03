import { router } from "./routes"
import { useEffect } from "react"
import { fetchCsrfToken } from "./api/api"
import { RouterProvider } from "react-router-dom"


function App() {

	useEffect(() => {
        fetchCsrfToken()
    }, [])
	
    return (
		<RouterProvider router={router}/>
	)
}

export default App
