
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Book, Heart, MessageSquare, Clock, Search, User, LogOut, BookOpen, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [mounted, status, router])

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-primary" />
            <Link href="/">
              <h1 className="text-xl font-bold text-foreground cursor-pointer">
                Bíblia Sagrada <span className="text-primary">Almeida</span>
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{session?.user?.name}</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Bem-vindo, {session?.user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-lg text-muted-foreground">
            Continue sua jornada espiritual com suas funcionalidades personalizadas
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Link href="/leitura">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Continuar Leitura</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse todos os livros da Bíblia
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/busca">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Buscar Versículos</h3>
                <p className="text-sm text-muted-foreground">
                  Encontre versículos por palavras-chave
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer opacity-75">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Favoritos</h3>
              <p className="text-sm text-muted-foreground">
                Em breve: Seus versículos favoritos
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer opacity-75">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Anotações</h3>
              <p className="text-sm text-muted-foreground">
                Em breve: Suas notas pessoais
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Atividade Recente</h3>
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Book className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Comece sua jornada</h4>
                <p className="text-muted-foreground mb-4">
                  Sua atividade de leitura aparecerá aqui
                </p>
                <Link href="/leitura">
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Começar Leitura
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Reading Plans */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Planos de Leitura</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Bíblia em 1 Ano</CardTitle>
                </div>
                <CardDescription>
                  Leia toda a Bíblia em 365 dias com aproximadamente 3 capítulos por dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">365 dias</Badge>
                  <Button variant="outline" size="sm" disabled>
                    Em breve
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Novo Testamento</CardTitle>
                </div>
                <CardDescription>
                  Leia todo o Novo Testamento em 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">30 dias</Badge>
                  <Button variant="outline" size="sm" disabled>
                    Em breve
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Salmos</CardTitle>
                </div>
                <CardDescription>
                  Leia todos os 150 Salmos em 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">30 dias</Badge>
                  <Button variant="outline" size="sm" disabled>
                    Em breve
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h3 className="text-2xl font-bold text-foreground mb-6">Suas Estatísticas</h3>
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Versículos Favoritos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Anotações</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Capítulos Lidos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Dias de Sequência</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
