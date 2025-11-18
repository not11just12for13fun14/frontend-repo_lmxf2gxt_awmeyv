import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, User, LayoutDashboard, HelpCircle, Newspaper, MessageSquare } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItemClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-blue-500/20 text-white' : 'text-blue-100 hover:text-white hover:bg-blue-500/10'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const u = localStorage.getItem('ccportal_user')
    if (u) setUser(JSON.parse(u))
  }, [])

  const logout = () => {
    localStorage.removeItem('ccportal_user')
    setUser(null)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/flame-icon.svg" className="w-8 h-8" alt="logo" />
              <span className="text-white font-semibold">CreditCare</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/complaints" className={navItemClass}>Pengaduan</NavLink>
            <NavLink to="/faq" className={navItemClass}>FAQ</NavLink>
            <NavLink to="/news" className={navItemClass}>Info</NavLink>
            <NavLink to="/contact" className={navItemClass}>Kontak</NavLink>
            {user && (
              <NavLink to="/dashboard" className={navItemClass}>Dashboard</NavLink>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <NavLink to="/profile" className={navItemClass}><User className="inline w-4 h-4 mr-1"/>Profil</NavLink>
                <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500">Keluar</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className={navItemClass}>Masuk</NavLink>
                <NavLink to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500">Daftar</NavLink>
              </div>
            )}
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            <Menu />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <NavLink to="/complaints" className={navItemClass} onClick={() => setOpen(false)}>Pengaduan</NavLink>
            <NavLink to="/faq" className={navItemClass} onClick={() => setOpen(false)}>FAQ</NavLink>
            <NavLink to="/news" className={navItemClass} onClick={() => setOpen(false)}>Info</NavLink>
            <NavLink to="/contact" className={navItemClass} onClick={() => setOpen(false)}>Kontak</NavLink>
            {user && <NavLink to="/dashboard" className={navItemClass} onClick={() => setOpen(false)}><LayoutDashboard className="inline w-4 h-4 mr-1"/>Dashboard</NavLink>}
            <div className="pt-2 border-t border-white/10"/>
            {user ? (
              <>
                <NavLink to="/profile" className={navItemClass} onClick={() => setOpen(false)}><User className="inline w-4 h-4 mr-1"/>Profil</NavLink>
                <button onClick={() => {logout(); setOpen(false)}} className="w-full px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500">Keluar</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navItemClass} onClick={() => setOpen(false)}>Masuk</NavLink>
                <NavLink to="/register" className="block px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500" onClick={() => setOpen(false)}>Daftar</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
