import { Link } from 'react-router-dom'
import { BookOpen, Search, Heart, StickyNote, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Home() {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: BookOpen,
      title: t('home.featuresList.reading.title'),
      description: t('home.featuresList.reading.description'),
      href: '/books'
    },
    {
      icon: Search,
      title: t('home.featuresList.search.title'),
      description: t('home.featuresList.search.description'),
      href: '/search'
    },
    {
      icon: Heart,
      title: t('home.featuresList.favorites.title'),
      description: t('home.featuresList.favorites.description'),
      href: '/favorites'
    },
    {
      icon: StickyNote,
      title: t('home.featuresList.notes.title'),
      description: t('home.featuresList.notes.description'),
      href: '/notes'
    }
  ]

  const recentReads = [
    { book: 'João', chapter: 1, verse: 1, text: 'No princípio era o Verbo...' },
    { book: 'Salmos', chapter: 23, verse: 1, text: 'O Senhor é o meu pastor...' }
  ]

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-12 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {t('home.welcome')} <span className="text-primary-600">{t('app.title')}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
          {t('home.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link to="/books" className="btn-primary inline-flex items-center justify-center py-3 px-6 text-base">
            {t('home.startReading')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link to="/search" className="btn-secondary inline-flex items-center justify-center py-3 px-6 text-base">
            {t('home.searchVerse')}
            <Search className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">{t('home.features')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.title}
                to={feature.href}
                className="card hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Recent Reads */}
      <section className="px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">{t('home.recentReads')}</h2>
        <div className="space-y-4">
          {recentReads.map((read, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {read.book} {read.chapter}:{read.verse}
                  </h3>
                  <p className="verse-text mt-2">{read.text}</p>
                </div>
                <Link
                  to={`/book/${read.book.toLowerCase()}/chapter/${read.chapter}`}
                  className="btn-secondary text-sm"
                >
                  {t('common.read')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Verse */}
      <section className="px-4">
        <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.dailyVerse')}</h2>
        <blockquote className="verse-text text-primary-800 mb-4">
          "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, 
          para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
        </blockquote>
        <cite className="text-sm text-primary-700 font-medium">
          João 3:16
        </cite>
        </div>
      </section>
    </div>
  )
}


