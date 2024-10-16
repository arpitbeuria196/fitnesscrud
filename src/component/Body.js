import React from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Browse from './Browse';
import Login from './Login';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Login/>
       },
       {
        path:"/browse",
        element: <Browse/>
       },
       {
       path: "*", // This will catch all undefined routes
       element: <div>Page Not Found</div>, // Display a custom 404 page
      }
    ])

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
