
import { Book, Search, Heart, Users, BookOpen, Star, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              Bíblia Sagrada <span className="text-primary">Almeida</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl fade-in">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Experimente a Palavra de Deus como nunca antes
          </h2>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Leia a Bíblia Sagrada versão Almeida completa, marque versículos favoritos, 
            faça anotações pessoais e acompanhe planos de leitura personalizados.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/leitura">
              <Button size="lg" className="min-w-40">
                <BookOpen className="mr-2 h-5 w-5" />
                Começar Leitura
              </Button>
            </Link>
            <Link href="/busca">
              <Button variant="outline" size="lg" className="min-w-40">
                <Search className="mr-2 h-5 w-5" />
                Buscar Versículos
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            <Badge variant="secondary">
              <Shield className="mr-1 h-3 w-3" />
              66 Livros Completos
            </Badge>
            <Badge variant="secondary">
              <Clock className="mr-1 h-3 w-3" />
              31.000+ Versículos
            </Badge>
            <Badge variant="secondary">
              <Star className="mr-1 h-3 w-3" />
              Versão Almeida
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Funcionalidades Completas para sua Jornada Espiritual
          </h3>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa para uma experiência de leitura bíblica profunda e significativa
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Leitura Completa */}
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Leitura Completa</CardTitle>
              <CardDescription>
                Acesse todos os 66 livros da Bíblia Sagrada versão Almeida com navegação intuitiva
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Busca Avançada */}
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Busca Inteligente</CardTitle>
              <CardDescription>
                Encontre versículos por palavras-chave, referências bíblicas ou temas específicos
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Favoritos */}
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Versículos Favoritos</CardTitle>
              <CardDescription>
                Marque e organize seus versículos favoritos para acesso rápido e fácil
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Notas Pessoais */}
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Anotações Pessoais</CardTitle>
              <CardDescription>
                Adicione suas reflexões e insights pessoais a qualquer versículo
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Planos de Leitura */}
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Planos de Leitura</CardTitle>
              <CardDescription>
                Siga planos estruturados: Bíblia em 1 ano, Novo Testamento em 30 dias e mais
              </CardDescription>
            </CardHeader>
          </Card>

          {/* App PWA */}
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Aplicativo PWA</CardTitle>
              <CardDescription>
                Instale em seu dispositivo e use offline, como um app nativo
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
          <CardContent className="text-center py-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Pronto para começar sua jornada?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já transformaram sua vida espiritual 
              com nossa plataforma completa de leitura bíblica.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="min-w-40">
                  <Users className="mr-2 h-5 w-5" />
                  Criar Conta Grátis
                </Button>
              </Link>
              <Link href="/leitura">
                <Button variant="outline" size="lg" className="min-w-40">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explorar sem Conta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Book className="h-6 w-6 text-primary" />
              <span className="font-semibold">Bíblia Sagrada Almeida</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Desenvolvido com ❤️ para servir a comunidade cristã
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
