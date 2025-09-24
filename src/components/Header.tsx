import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Search, Heart, StickyNote, Menu, Settings } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from './LanguageSelector'
import { OfflineIndicator } from './OfflineStatus'

export function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  const navigation = [
    { name: t('navigation.home'), href: '/', icon: BookOpen },
    { name: t('navigation.books'), href: '/books', icon: BookOpen },
    { name: t('navigation.search'), href: '/search', icon: Search },
    { name: t('navigation.favorites'), href: '/favorites', icon: Heart },
    { name: t('navigation.notes'), href: '/notes', icon: StickyNote },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900">{t('app.title')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Offline Indicator */}
            <OfflineIndicator />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-3">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}


