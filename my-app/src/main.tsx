//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { RecoilRoot } from "recoil";
import "react-contexify/dist/ReactContexify.css";


createRoot(document.getElementById('root')!).render(
<CookiesProvider defaultSetOptions={{ path: "/" }}>
  <BrowserRouter>
  <RecoilRoot>
    <App/>
  </RecoilRoot>
  </BrowserRouter>
  </CookiesProvider>
)
