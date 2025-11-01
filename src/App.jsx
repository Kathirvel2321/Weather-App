import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Weather from './pages/Weather'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
           <Route path='/weather' element={<Weather/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
