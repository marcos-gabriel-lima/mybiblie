import { BibleData, Book } from '../types/bible'

export const books: Book[] = [
  // Antigo Testamento
  { id: 'genesis', name: 'Gênesis', testament: 'old', chapters: 50, abbreviation: 'Gn' },
  { id: 'exodus', name: 'Êxodo', testament: 'old', chapters: 40, abbreviation: 'Ex' },
  { id: 'leviticus', name: 'Levítico', testament: 'old', chapters: 27, abbreviation: 'Lv' },
  { id: 'numbers', name: 'Números', testament: 'old', chapters: 36, abbreviation: 'Nm' },
  { id: 'deuteronomy', name: 'Deuteronômio', testament: 'old', chapters: 34, abbreviation: 'Dt' },
  { id: 'joshua', name: 'Josué', testament: 'old', chapters: 24, abbreviation: 'Js' },
  { id: 'judges', name: 'Juízes', testament: 'old', chapters: 21, abbreviation: 'Jz' },
  { id: 'ruth', name: 'Rute', testament: 'old', chapters: 4, abbreviation: 'Rt' },
  { id: 'samuel1', name: '1 Samuel', testament: 'old', chapters: 31, abbreviation: '1Sm' },
  { id: 'samuel2', name: '2 Samuel', testament: 'old', chapters: 24, abbreviation: '2Sm' },
  { id: 'kings1', name: '1 Reis', testament: 'old', chapters: 22, abbreviation: '1Rs' },
  { id: 'kings2', name: '2 Reis', testament: 'old', chapters: 25, abbreviation: '2Rs' },
  { id: 'chronicles1', name: '1 Crônicas', testament: 'old', chapters: 29, abbreviation: '1Cr' },
  { id: 'chronicles2', name: '2 Crônicas', testament: 'old', chapters: 36, abbreviation: '2Cr' },
  { id: 'ezra', name: 'Esdras', testament: 'old', chapters: 10, abbreviation: 'Ed' },
  { id: 'nehemiah', name: 'Neemias', testament: 'old', chapters: 13, abbreviation: 'Ne' },
  { id: 'esther', name: 'Ester', testament: 'old', chapters: 10, abbreviation: 'Et' },
  { id: 'job', name: 'Jó', testament: 'old', chapters: 42, abbreviation: 'Jó' },
  { id: 'psalms', name: 'Salmos', testament: 'old', chapters: 150, abbreviation: 'Sl' },
  { id: 'proverbs', name: 'Provérbios', testament: 'old', chapters: 31, abbreviation: 'Pv' },
  { id: 'ecclesiastes', name: 'Eclesiastes', testament: 'old', chapters: 12, abbreviation: 'Ec' },
  { id: 'song', name: 'Cantares', testament: 'old', chapters: 8, abbreviation: 'Ct' },
  { id: 'isaiah', name: 'Isaías', testament: 'old', chapters: 66, abbreviation: 'Is' },
  { id: 'jeremiah', name: 'Jeremias', testament: 'old', chapters: 52, abbreviation: 'Jr' },
  { id: 'lamentations', name: 'Lamentações', testament: 'old', chapters: 5, abbreviation: 'Lm' },
  { id: 'ezekiel', name: 'Ezequiel', testament: 'old', chapters: 48, abbreviation: 'Ez' },
  { id: 'daniel', name: 'Daniel', testament: 'old', chapters: 12, abbreviation: 'Dn' },
  { id: 'hosea', name: 'Oséias', testament: 'old', chapters: 14, abbreviation: 'Os' },
  { id: 'joel', name: 'Joel', testament: 'old', chapters: 3, abbreviation: 'Jl' },
  { id: 'amos', name: 'Amós', testament: 'old', chapters: 9, abbreviation: 'Am' },
  { id: 'obadiah', name: 'Obadias', testament: 'old', chapters: 1, abbreviation: 'Ob' },
  { id: 'jonah', name: 'Jonas', testament: 'old', chapters: 4, abbreviation: 'Jn' },
  { id: 'micah', name: 'Miquéias', testament: 'old', chapters: 7, abbreviation: 'Mq' },
  { id: 'nahum', name: 'Naum', testament: 'old', chapters: 3, abbreviation: 'Na' },
  { id: 'habakkuk', name: 'Habacuque', testament: 'old', chapters: 3, abbreviation: 'Hc' },
  { id: 'zephaniah', name: 'Sofonias', testament: 'old', chapters: 3, abbreviation: 'Sf' },
  { id: 'haggai', name: 'Ageu', testament: 'old', chapters: 2, abbreviation: 'Ag' },
  { id: 'zechariah', name: 'Zacarias', testament: 'old', chapters: 14, abbreviation: 'Zc' },
  { id: 'malachi', name: 'Malaquias', testament: 'old', chapters: 4, abbreviation: 'Ml' },
  
  // Novo Testamento
  { id: 'matthew', name: 'Mateus', testament: 'new', chapters: 28, abbreviation: 'Mt' },
  { id: 'mark', name: 'Marcos', testament: 'new', chapters: 16, abbreviation: 'Mc' },
  { id: 'luke', name: 'Lucas', testament: 'new', chapters: 24, abbreviation: 'Lc' },
  { id: 'john', name: 'João', testament: 'new', chapters: 21, abbreviation: 'Jo' },
  { id: 'acts', name: 'Atos', testament: 'new', chapters: 28, abbreviation: 'At' },
  { id: 'romans', name: 'Romanos', testament: 'new', chapters: 16, abbreviation: 'Rm' },
  { id: 'corinthians1', name: '1 Coríntios', testament: 'new', chapters: 16, abbreviation: '1Co' },
  { id: 'corinthians2', name: '2 Coríntios', testament: 'new', chapters: 13, abbreviation: '2Co' },
  { id: 'galatians', name: 'Gálatas', testament: 'new', chapters: 6, abbreviation: 'Gl' },
  { id: 'ephesians', name: 'Efésios', testament: 'new', chapters: 6, abbreviation: 'Ef' },
  { id: 'philippians', name: 'Filipenses', testament: 'new', chapters: 4, abbreviation: 'Fp' },
  { id: 'colossians', name: 'Colossenses', testament: 'new', chapters: 4, abbreviation: 'Cl' },
  { id: 'thessalonians1', name: '1 Tessalonicenses', testament: 'new', chapters: 5, abbreviation: '1Ts' },
  { id: 'thessalonians2', name: '2 Tessalonicenses', testament: 'new', chapters: 3, abbreviation: '2Ts' },
  { id: 'timothy1', name: '1 Timóteo', testament: 'new', chapters: 6, abbreviation: '1Tm' },
  { id: 'timothy2', name: '2 Timóteo', testament: 'new', chapters: 4, abbreviation: '2Tm' },
  { id: 'titus', name: 'Tito', testament: 'new', chapters: 3, abbreviation: 'Tt' },
  { id: 'philemon', name: 'Filemom', testament: 'new', chapters: 1, abbreviation: 'Fm' },
  { id: 'hebrews', name: 'Hebreus', testament: 'new', chapters: 13, abbreviation: 'Hb' },
  { id: 'james', name: 'Tiago', testament: 'new', chapters: 5, abbreviation: 'Tg' },
  { id: 'peter1', name: '1 Pedro', testament: 'new', chapters: 5, abbreviation: '1Pe' },
  { id: 'peter2', name: '2 Pedro', testament: 'new', chapters: 3, abbreviation: '2Pe' },
  { id: 'john1', name: '1 João', testament: 'new', chapters: 5, abbreviation: '1Jo' },
  { id: 'john2', name: '2 João', testament: 'new', chapters: 1, abbreviation: '2Jo' },
  { id: 'john3', name: '3 João', testament: 'new', chapters: 1, abbreviation: '3Jo' },
  { id: 'jude', name: 'Judas', testament: 'new', chapters: 1, abbreviation: 'Jd' },
  { id: 'revelation', name: 'Apocalipse', testament: 'new', chapters: 22, abbreviation: 'Ap' }
]

// Dados de exemplo para alguns capítulos (em produção, isso viria de uma API)
export const sampleChapters: Record<string, any> = {
  'john-1': {
    number: 1,
    verses: [
      { number: 1, text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
      { number: 2, text: 'Ele estava no princípio com Deus.' },
      { number: 3, text: 'Todas as coisas foram feitas por ele, e, sem ele, nada do que foi feito se fez.' },
      { number: 4, text: 'Nele estava a vida, e a vida era a luz dos homens.' },
      { number: 5, text: 'E a luz resplandece nas trevas, e as trevas não a compreenderam.' },
      { number: 6, text: 'Houve um homem enviado de Deus, cujo nome era João.' },
      { number: 7, text: 'Este veio para testemunho, para que testificasse da luz, para que todos cressem por ele.' },
      { number: 8, text: 'Não era ele a luz, mas veio para que testificasse da luz.' },
      { number: 9, text: 'Ali estava a luz verdadeira, que ilumina a todo o homem que vem ao mundo.' },
      { number: 10, text: 'Estava no mundo, e o mundo foi feito por ele, e o mundo não o conheceu.' }
    ]
  },
  'psalms-23': {
    number: 23,
    verses: [
      { number: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
      { number: 2, text: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
      { number: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.' },
      { number: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
      { number: 5, text: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
      { number: 6, text: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.' }
    ]
  }
}

export const bibleData: BibleData = {
  books,
  chapters: sampleChapters
}



