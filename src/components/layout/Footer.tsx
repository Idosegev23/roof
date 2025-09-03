import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t" style={{borderTopColor: 'rgba(217, 65, 136, 0.3)'}}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
                        <Image
            src="/logo-roof-white.png"
            alt="Roof Logo"
            width={32}
            height={32}
            className="rounded-lg"
            style={{ width: 'auto', height: 'auto' }}
          />
              <h3 className="text-2xl font-light">Roof</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 font-ultralight">
              הפלטפורמה המקצועית לנדל״ן - נתונים אמיתיים, אנליטיקות מתקדמות והזדמנויות השקעה. 
              כל מה שאתם צריכים לקבלת החלטות חכמות בשוק הנדל״ן.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-light mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-framework-primary transition-colors font-ultralight">
                  עמוד הבית
                </Link>
              </li>
              <li>
                <Link href="/category/residential" className="text-gray-300 hover:text-framework-primary transition-colors font-ultralight">
                  דירות מגורים
                </Link>
              </li>
              <li>
                <Link href="/category/commercial" className="text-gray-300 hover:text-framework-primary transition-colors font-ultralight">
                  משרדים
                </Link>
              </li>
              <li>
                <Link href="/category/investments" className="text-gray-300 hover:text-framework-primary transition-colors font-ultralight">
                  השקעות
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-light mb-4">צור קשר</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4" style={{color: '#D94188'}} />
                <span className="text-gray-300 font-ultralight">050-123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4" style={{color: '#D94188'}} />
                <span className="text-gray-300 font-ultralight">info@roof.co.il</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4" style={{color: '#D94188'}} />
                <span className="text-gray-300 font-ultralight">תל אביב, ישראל</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-ultralight">
            © {new Date().getFullYear()} Roof. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  )
}
