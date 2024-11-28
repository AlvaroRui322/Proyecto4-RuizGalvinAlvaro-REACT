import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import {router} from "./router/index.jsx";
import UserProvider from "./context/UserContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserProvider>
          <RouterProvider router={router}/>
      </UserProvider>
  </StrictMode>,
)
