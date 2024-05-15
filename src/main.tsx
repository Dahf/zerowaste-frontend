import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import App from './App'
import Login from './login'
import { Navbar, NavbarContent, NavbarItem, NavbarLink, SaasProvider } from '@saas-ui/react'
import {
  AppShell,
} from '@saas-ui/react'
import { Button } from '@chakra-ui/react'
import Register from './register'
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
          </Route>
        </Routes>
      </BrowserRouter>
    </SaasProvider>
  </React.StrictMode>,
)