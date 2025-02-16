import { Link, Outlet } from 'react-router-dom';
import { Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/api', label: 'API' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Mail className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">SnapMails</span>
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Legal</h3>
              <div className="mt-4 space-y-4">
                <Link to="/terms" className="text-gray-500 hover:text-gray-900 block">Terms of Service</Link>
                <Link to="/privacy" className="text-gray-500 hover:text-gray-900 block">Privacy Policy</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Resources</h3>
              <div className="mt-4 space-y-4">
                <Link to="/api" className="text-gray-500 hover:text-gray-900 block">API Documentation</Link>
                <Link to="/faq" className="text-gray-500 hover:text-gray-900 block">FAQ</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Company</h3>
              <div className="mt-4 space-y-4">
                <Link to="/about" className="text-gray-500 hover:text-gray-900 block">About Us</Link>
                <Link to="/contact" className="text-gray-500 hover:text-gray-900 block">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Follow Us</h3>
              <div className="mt-4 space-y-4">
                <a href="https://twitter.com/snapmails" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 block">Twitter</a>
                <a href="https://github.com/snapmails" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 block">GitHub</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} SnapMails. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}