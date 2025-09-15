import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export interface Language {
  code: string
  name: string
  flag: string
}

export const LANGUAGES: Language[] = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' }
]

export function useLanguage() {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language)

  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [i18n.language])

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    setCurrentLanguage(languageCode)
  }

  const getCurrentLanguage = (): Language | undefined => {
    return LANGUAGES.find(lang => lang.code === currentLanguage)
  }

  const getLanguageName = (code: string): string => {
    const language = LANGUAGES.find(lang => lang.code === code)
    return language ? language.name : code
  }

  return {
    currentLanguage,
    changeLanguage,
    getCurrentLanguage,
    getLanguageName,
    languages: LANGUAGES
  }
}

