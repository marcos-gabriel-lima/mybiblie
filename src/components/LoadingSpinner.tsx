import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function LoadingSpinner({ size = 'md', text = 'Carregando...', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`text-center py-12 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} text-primary-600 mx-auto mb-4 animate-spin`} />
      <p className="text-gray-600">{text}</p>
    </div>
  )
}

