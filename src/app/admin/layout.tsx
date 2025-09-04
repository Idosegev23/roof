import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="container max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/80 hover:text-white">ROOF</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Admin</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/admin" className="text-white/70 hover:text-white">Dashboard</Link>
            <Link href="/admin/articles" className="text-white/70 hover:text-white">כתבות</Link>
            <Link href="/admin/leads" className="text-white/70 hover:text-white">לידים</Link>
          </nav>
        </div>
      </header>

      <main className="container max-w-screen-xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}


