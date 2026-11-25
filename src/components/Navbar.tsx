import { useState, useEffect } from 'react'
import { Menu, X, Shield, Zap } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-lg rotate-45 group-hover:rotate-[160deg] transition-transform duration-700" />
              <div className="absolute inset-[3px]" style={{ background: '#05050A', transform: 'rotate(45deg)' }} />
              <Shield className="absolute inset-0 m-auto w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">WEB<span className="text-cyan-400">SITY</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button className="relative px-5 py-2 text-sm font-semibold rounded-full overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 transition-opacity opacity-100 group-hover:opacity-90" />
              <span className="relative text-white flex items-center gap-2">
                Get Access
                <Zap className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
            mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="mx-4 mt-2 glass-card rounded-2xl p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-white/70 hover:text-cyan-400 text-base font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm">
              Get Access
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none ${
          scrolled ? 'h-[72px]' : 'h-[80px]'
        }`}
      />
    </>
  )
}
