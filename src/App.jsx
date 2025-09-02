import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import MovieDetail from './pages/MovieDetail'
import RootLayout from './components/RootLayout'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>

          <Route index element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          
        </Route>
      </Routes>
    </Router>
  )
}

export default App
