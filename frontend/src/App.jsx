import { router } from "./routes"
import { useEffect } from "react"
import { fetchCsrfToken } from "./api/api"
import { RouterProvider } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"


function App() {

	useEffect(() => {
        fetchCsrfToken()
    }, [])
	
    return (
      <HelmetProvider>
		    <RouterProvider router={router}/>
      </HelmetProvider>
	)
}

export default App
