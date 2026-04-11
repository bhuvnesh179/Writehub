import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Singin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { ProtectedRoute } from './components/ProtectedRoute'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={localStorage.getItem("token") ? <Navigate to="/blogs" /> : <Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="/blog/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App