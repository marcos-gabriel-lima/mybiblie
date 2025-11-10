
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário administrador padrão
  console.log('👤 Criando usuário administrador...');
  const hashedPassword = await bcrypt.hash('johndoe123', 12);
  
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'Administrador',
      password: hashedPassword,
    },
  });

  // Verificar se já existe conteúdo bíblico
  const existingBooks = await prisma.book.count();
  
  if (existingBooks > 0) {
    console.log('📚 Conteúdo bíblico já existe no banco. Pulando inserção...');
  } else {
    console.log('📖 Carregando conteúdo bíblico...');
    
    // Carregar dados da Bíblia
    const bibliaPath = path.join(process.cwd(), 'data', 'biblia_almeida_completa.json');
    const bibliaData = JSON.parse(fs.readFileSync(bibliaPath, 'utf8'));
    
    let bookOrder = 1;
    
    for (const livroData of bibliaData.livros) {
      console.log(`📜 Processando ${livroData.nome}...`);
      
      // Criar livro
      const book = await prisma.book.create({
        data: {
          name: livroData.nome,
          testament: livroData.testamento,
          order: bookOrder++,
        },
      });
      
      // Criar capítulos e versículos
      for (const capituloData of livroData.capitulos) {
        const chapter = await prisma.chapter.create({
          data: {
            bookId: book.id,
            number: capituloData.numero,
          },
        });
        
        // Criar versículos em lote para melhor performance
        const versesData = capituloData.versiculos.map((versiculo: any) => ({
          chapterId: chapter.id,
          number: versiculo.numero,
          text: versiculo.texto,
        }));
        
        await prisma.verse.createMany({
          data: versesData,
        });
      }
    }
    
    console.log('✅ Conteúdo bíblico inserido com sucesso!');
  }
  
  // Criar planos de leitura padrão
  console.log('📅 Criando planos de leitura...');
  
  const readingPlans = [
    {
      name: 'Bíblia em 1 Ano',
      description: 'Leia toda a Bíblia em 365 dias com aproximadamente 3 capítulos por dia',
      duration: 365,
      chapters: generateBibleInOneYearPlan(),
    },
    {
      name: 'Novo Testamento em 30 Dias',
      description: 'Leia todo o Novo Testamento em 30 dias',
      duration: 30,
      chapters: generateNewTestamentPlan(),
    },
    {
      name: 'Salmos em 30 Dias',
      description: 'Leia todos os 150 Salmos em 30 dias',
      duration: 30,
      chapters: generatePsalmsPlan(),
    },
    {
      name: 'Provérbios em 31 Dias',
      description: 'Leia um capítulo de Provérbios por dia',
      duration: 31,
      chapters: generateProverbsPlan(),
    },
  ];
  
  // Verificar se já existem planos de leitura
  const existingPlans = await prisma.readingPlan.count();
  
  if (existingPlans === 0) {
    for (const plan of readingPlans) {
      await prisma.readingPlan.create({
        data: plan,
      });
    }
  } else {
    console.log('📅 Planos de leitura já existem. Pulando inserção...');
  }
  
  console.log('🎉 Seed concluído com sucesso!');
}

function generateBibleInOneYearPlan(): string[] {
  // Plano simplificado - aproximadamente 3-4 capítulos por dia
  const chapters: string[] = [];
  
  for (let day = 1; day <= 365; day++) {
    chapters.push(`Dia ${day}: 3-4 capítulos conforme cronograma`);
  }
  
  return chapters;
}

function generateNewTestamentPlan(): string[] {
  const chapters: string[] = [];
  
  for (let day = 1; day <= 30; day++) {
    chapters.push(`Dia ${day}: Leitura do Novo Testamento (8-9 capítulos)`);
  }
  
  return chapters;
}

function generatePsalmsPlan(): string[] {
  // 150 Salmos divididos em 30 dias = 5 salmos por dia
  const chapters: string[] = [];
  
  for (let day = 1; day <= 30; day++) {
    const startPsalm = (day - 1) * 5 + 1;
    const endPsalm = Math.min(day * 5, 150);
    chapters.push(`Salmos ${startPsalm}-${endPsalm}`);
  }
  
  return chapters;
}

function generateProverbsPlan(): string[] {
  // 31 capítulos de Provérbios para 31 dias
  const chapters: string[] = [];
  
  for (let day = 1; day <= 31; day++) {
    chapters.push(`Provérbios ${day}`);
  }
  
  return chapters;
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
