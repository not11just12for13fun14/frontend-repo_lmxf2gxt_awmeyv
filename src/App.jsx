import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { HomeSections, ComplaintsPage, AuthPages, FAQPage, NewsPage, ContactPage, DashboardPage, ProfilePage } from './components/Sections'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-blue-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<>
              <Hero />
              <HomeSections />
            </>} />
            <Route path="/complaints" element={<ComplaintsPage />} />
            <Route path="/login" element={<AuthPages />} />
            <Route path="/register" element={<AuthPages />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
