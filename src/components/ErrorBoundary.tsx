'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#212B38] via-[#37465B] to-[#212B38] flex items-center justify-center p-4">
          <div className="max-w-md w-full card-gradient rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Что-то пошло не так
            </h1>
            
            <p className="text-white/80 mb-6">
              Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу или вернуться на главную.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-white/60 cursor-pointer mb-2">
                  Детали ошибки (только для разработки)
                </summary>
                <div className="bg-black/20 p-4 rounded-lg text-xs text-white/80 overflow-auto">
                  <pre>{this.state.error.toString()}</pre>
                  {this.state.errorInfo && (
                    <pre className="mt-2">{this.state.errorInfo.componentStack}</pre>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={this.handleReload}
                className="flex-1 btn-neon flex items-center justify-center space-x-2"
                aria-label="Обновить страницу"
              >
                <RefreshCw size={20} />
                <span>Обновить</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                aria-label="Вернуться на главную"
              >
                <Home size={20} />
                <span>Главная</span>
              </button>
            </div>

            <div className="mt-6 text-sm text-white/60">
              <p>Если проблема повторяется, свяжитесь с нами:</p>
              <a 
                href="tel:+79965645683" 
                className="text-[#4F8EDC] hover:underline"
                aria-label="Позвонить в поддержку"
              >
                +7 (996) 564-56-83
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 