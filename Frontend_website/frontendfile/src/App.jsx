import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactsPage'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/documents" element={<MainPage />} />
          <Route path="/documents/council" element={<MainPage type="council" />} />
          <Route path="/documents/administration" element={<MainPage type="administration" />} />
          <Route path="/documents/control" element={<MainPage type="control" />} />
          <Route path="/documents/other" element={<MainPage type="other" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactPage />} />
                    
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
