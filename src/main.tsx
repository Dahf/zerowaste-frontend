import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Login from './login'
import { SaasProvider } from '@saas-ui/react'
import Register from './register'
import Meals from './dashboard/meals'
const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <SaasProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<App />}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="meals" element={<Meals/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </SaasProvider>
  </React.StrictMode>,
)