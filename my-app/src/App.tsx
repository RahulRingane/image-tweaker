import './App.css'
import Pages from './pages'
import "./index.css"
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Navbar/>
      <Pages/>
      <Toaster/>
    </>
  )
}

export default App
