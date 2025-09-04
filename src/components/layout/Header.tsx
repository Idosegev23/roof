'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentTime, setCurrentTime] = useState('')

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('he-IL', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Track scroll for morphing header
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation in a completely different style
  const navItems = [
    { href: '/', label: 'בית', symbol: '●', active: true },
    { href: '/category/residential', label: 'נדל״ן למגורים', symbol: '▲' },
    { href: '/category/offices', label: 'נדל״ן משרדי', symbol: '■' },
    { href: '/category/investments', label: 'נדל״ן להשקעה', symbol: '◆' },
  ]

  return (
    <>
      {/* REVOLUTIONARY HEADER - מהפכני לחלוטין */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrollY > 50 
            ? 'bg-black/95 backdrop-blur-2xl shadow-2xl' 
            : 'bg-gradient-to-r from-black via-gray-900 to-black'
        }`}
        style={{
          borderBottom: scrollY > 50 ? '1px solid rgba(217, 65, 136, 0.3)' : 'none'
        }}
      >
        
        {/* TOP SECRET AGENT BAR */}
        <div className="bg-gradient-to-r from-framework-accent-cta/20 via-purple-600/20 to-framework-accent-cta/20 py-1">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-6 text-white/80">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  LIVE · {currentTime}
                </span>
                <span className="hidden md:block">
                  ▲ נדל״ן TLV: +8.2% השנה
                </span>
              </div>
              <Link 
                href="/admin" 
                className="text-white/70 hover:text-framework-accent-cta transition-colors font-mono text-xs tracking-wider"
              >
                [ADMIN ACCESS]
              </Link>
            </div>
          </div>
            </div>

        {/* MAIN HEADER - מיינד בלואינג */}
        <div className="container max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center h-16">
            
                    {/* LOGO INSANE */}
        <Link href="/" className="group relative">
          <div className="flex items-center gap-4">
            {/* Logo Image */}
            <div className="relative">
              <Image
                src="/logo-roof-white.png"
                alt="Roof Logo"
                width={96}
                height={96}
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Slogan */}
            <div className="flex flex-col">
              <div className="text-sm text-framework-white/80 font-light">הפלטפורמה המקצועית לנדל״ן</div>
            </div>
            </div>
          </Link>

            {/* NAVIGATION CLEAN */}
            <nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex items-center gap-0 m-0 p-0 list-none">
                {navItems.map((item, index) => (
                  <li key={item.href} className="relative">
            <Link 
                      href={item.href}
                      className={`
                        inline-block px-5 py-4 relative transition-colors duration-300 ease-in-out
                        text-sm font-bold uppercase tracking-wider
                        ${item.active ? 'text-[#D94188]' : 'text-white hover:text-[#D94188]'}
                        after:content-[''] after:absolute after:bottom-0 after:left-5 after:right-5
                        after:h-0.5 after:transition-all after:duration-300 after:ease-in-out
                        ${item.active ? 'after:bg-[#D94188]' : 'after:bg-[#D94188] after:scale-x-0 hover:after:scale-x-100'}
                      `}
                    >
                      {item.label}
            </Link>
                  </li>
                ))}
              </ul>
          </nav>

            {/* Spacer to push actions to the right */}
            <div className="flex-1"></div>
            
            {/* ACTION ZONE */}
            <div className="flex items-center gap-4">
              
              {/* Search Portal - רק בדסקטופ */}
              <button
                onClick={toggleSearch}
                className="hidden md:block relative group p-3 hover:scale-110 transition-all duration-300"
              >
                <Search 
                  size={24} 
                  className="transition-colors duration-300" 
                  style={{color: '#D94188'}}
                />
                <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" style={{backgroundColor: '#D94188'}}></div>
              </button>

              {/* Mobile Menu Portal */}
              <button
              onClick={toggleMenu}
                className="lg:hidden relative group p-3"
              >
                  <div className="flex flex-col gap-1">
                    <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{backgroundColor: '#D94188'}}></div>
                    <div className={`w-6 h-0.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{backgroundColor: '#D94188'}}></div>
                    <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{backgroundColor: '#D94188'}}></div>
                  </div>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION PORTAL */}
        <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform -translate-y-4 pointer-events-none'
        }`} style={{background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(20px)', borderTop: isMenuOpen ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'}}>
          <div className="container max-w-screen-xl mx-auto px-6 py-6">
            <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
              <Link 
                    key={item.href}
                    href={item.href}
                onClick={toggleMenu}
                    className={`group relative py-3 px-4 transition-all duration-200 rounded-lg ${
                      item.active 
                        ? 'text-[#D94188] bg-white/5' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen ? 'slideUp 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    <div className="text-right">
                      <div className="font-light text-sm tracking-wide">
                        {item.label}
                      </div>
                    </div>
              </Link>
                ))}
                
                {/* כפתור חיפוש במובייל */}
                <button
                  onClick={() => {
                    toggleMenu()
                    toggleSearch()
                  }}
                  className="group relative py-3 px-4 transition-all duration-200 rounded-lg text-white/70 hover:text-white hover:bg-white/5"
                  style={{
                    animationDelay: `${navItems.length * 50}ms`,
                    animation: isMenuOpen ? 'slideUp 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <div className="text-right">
                    <div className="font-light text-sm tracking-wide">
                      חיפוש
                    </div>
                  </div>
                </button>
              </div>
            </div>
        </div>
      </header>

      {/* SEARCH DIMENSION */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-3xl flex items-center justify-center">
          <div className="relative w-full max-w-3xl mx-4">
            
            {/* Close Portal */}
            <button 
              onClick={toggleSearch}
              className="absolute -top-16 right-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-white hover:bg-red-500/40 transition-colors"
            >
              <span className="text-2xl font-bold">×</span>
            </button>
            
            {/* Search Interface */}
            <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-3xl p-12 border border-framework-accent-cta/30 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-black text-white mb-4">
                  חפש ב<span className="gradient-text">מטריקס</span>
                </h2>
                <p className="text-white/60 text-xl">
                  גלה כל מה שאתה צריך בעולם הנדל״ן
                </p>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="הקלד כדי לחפש..."
                  className="w-full bg-white/10 border-2 rounded-2xl px-8 py-6 text-2xl text-white placeholder-white/40 focus:outline-none transition-colors"
                  style={{
                    borderColor: 'rgba(217, 65, 136, 0.3)'
                  }}
                  autoFocus
                />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-3xl font-bold" style={{color: '#D94188'}}>
                  ◐
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
