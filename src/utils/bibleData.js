// Constantes e dados da Bíblia
export const BIBLE_BOOKS = [
  // Antigo Testamento
  { name: 'Gênesis', chapters: 50, icon: 'auto_stories', testament: 'old', abbreviation: 'Gn' },
  { name: 'Êxodo', chapters: 40, icon: 'auto_stories', testament: 'old', abbreviation: 'Êx' },
  { name: 'Levítico', chapters: 27, icon: 'auto_stories', testament: 'old', abbreviation: 'Lv' },
  { name: 'Números', chapters: 36, icon: 'auto_stories', testament: 'old', abbreviation: 'Nm' },
  { name: 'Deuteronômio', chapters: 34, icon: 'auto_stories', testament: 'old', abbreviation: 'Dt' },
  { name: 'Josué', chapters: 24, icon: 'auto_stories', testament: 'old', abbreviation: 'Js' },
  { name: 'Juízes', chapters: 21, icon: 'auto_stories', testament: 'old', abbreviation: 'Jz' },
  { name: 'Rute', chapters: 4, icon: 'auto_stories', testament: 'old', abbreviation: 'Rt' },
  { name: '1 Samuel', chapters: 31, icon: 'auto_stories', testament: 'old', abbreviation: '1Sm' },
  { name: '2 Samuel', chapters: 24, icon: 'auto_stories', testament: 'old', abbreviation: '2Sm' },
  { name: '1 Reis', chapters: 22, icon: 'auto_stories', testament: 'old', abbreviation: '1Rs' },
  { name: '2 Reis', chapters: 25, icon: 'auto_stories', testament: 'old', abbreviation: '2Rs' },
  { name: '1 Crônicas', chapters: 29, icon: 'auto_stories', testament: 'old', abbreviation: '1Cr' },
  { name: '2 Crônicas', chapters: 36, icon: 'auto_stories', testament: 'old', abbreviation: '2Cr' },
  { name: 'Esdras', chapters: 10, icon: 'auto_stories', testament: 'old', abbreviation: 'Ed' },
  { name: 'Neemias', chapters: 13, icon: 'auto_stories', testament: 'old', abbreviation: 'Ne' },
  { name: 'Ester', chapters: 10, icon: 'auto_stories', testament: 'old', abbreviation: 'Et' },
  { name: 'Jó', chapters: 42, icon: 'auto_stories', testament: 'old', abbreviation: 'Jó' },
  { name: 'Salmos', chapters: 150, icon: 'music_note', testament: 'old', abbreviation: 'Sl' },
  { name: 'Provérbios', chapters: 31, icon: 'psychology', testament: 'old', abbreviation: 'Pv' },
  { name: 'Eclesiastes', chapters: 12, icon: 'auto_stories', testament: 'old', abbreviation: 'Ec' },
  { name: 'Cantares', chapters: 8, icon: 'favorite', testament: 'old', abbreviation: 'Ct' },
  { name: 'Isaías', chapters: 66, icon: 'auto_stories', testament: 'old', abbreviation: 'Is' },
  { name: 'Jeremias', chapters: 52, icon: 'auto_stories', testament: 'old', abbreviation: 'Jr' },
  { name: 'Lamentações', chapters: 5, icon: 'auto_stories', testament: 'old', abbreviation: 'Lm' },
  { name: 'Ezequiel', chapters: 48, icon: 'auto_stories', testament: 'old', abbreviation: 'Ez' },
  { name: 'Daniel', chapters: 12, icon: 'auto_stories', testament: 'old', abbreviation: 'Dn' },
  { name: 'Oséias', chapters: 14, icon: 'auto_stories', testament: 'old', abbreviation: 'Os' },
  { name: 'Joel', chapters: 3, icon: 'auto_stories', testament: 'old', abbreviation: 'Jl' },
  { name: 'Amós', chapters: 9, icon: 'auto_stories', testament: 'old', abbreviation: 'Am' },
  { name: 'Obadias', chapters: 1, icon: 'auto_stories', testament: 'old', abbreviation: 'Ob' },
  { name: 'Jonas', chapters: 4, icon: 'auto_stories', testament: 'old', abbreviation: 'Jn' },
  { name: 'Miquéias', chapters: 7, icon: 'auto_stories', testament: 'old', abbreviation: 'Mq' },
  { name: 'Naum', chapters: 3, icon: 'auto_stories', testament: 'old', abbreviation: 'Na' },
  { name: 'Habacuque', chapters: 3, icon: 'auto_stories', testament: 'old', abbreviation: 'Hc' },
  { name: 'Sofonias', chapters: 3, icon: 'auto_stories', testament: 'old', abbreviation: 'Sf' },
  { name: 'Ageu', chapters: 2, icon: 'auto_stories', testament: 'old', abbreviation: 'Ag' },
  { name: 'Zacarias', chapters: 14, icon: 'auto_stories', testament: 'old', abbreviation: 'Zc' },
  { name: 'Malaquias', chapters: 4, icon: 'auto_stories', testament: 'old', abbreviation: 'Ml' },
  
  // Novo Testamento
  { name: 'Mateus', chapters: 28, icon: 'auto_stories', testament: 'new', abbreviation: 'Mt' },
  { name: 'Marcos', chapters: 16, icon: 'auto_stories', testament: 'new', abbreviation: 'Mc' },
  { name: 'Lucas', chapters: 24, icon: 'auto_stories', testament: 'new', abbreviation: 'Lc' },
  { name: 'João', chapters: 21, icon: 'auto_stories', testament: 'new', abbreviation: 'Jo' },
  { name: 'Atos', chapters: 28, icon: 'auto_stories', testament: 'new', abbreviation: 'At' },
  { name: 'Romanos', chapters: 16, icon: 'auto_stories', testament: 'new', abbreviation: 'Rm' },
  { name: '1 Coríntios', chapters: 16, icon: 'auto_stories', testament: 'new', abbreviation: '1Co' },
  { name: '2 Coríntios', chapters: 13, icon: 'auto_stories', testament: 'new', abbreviation: '2Co' },
  { name: 'Gálatas', chapters: 6, icon: 'auto_stories', testament: 'new', abbreviation: 'Gl' },
  { name: 'Efésios', chapters: 6, icon: 'auto_stories', testament: 'new', abbreviation: 'Ef' },
  { name: 'Filipenses', chapters: 4, icon: 'auto_stories', testament: 'new', abbreviation: 'Fp' },
  { name: 'Colossenses', chapters: 4, icon: 'auto_stories', testament: 'new', abbreviation: 'Cl' },
  { name: '1 Tessalonicenses', chapters: 5, icon: 'auto_stories', testament: 'new', abbreviation: '1Ts' },
  { name: '2 Tessalonicenses', chapters: 3, icon: 'auto_stories', testament: 'new', abbreviation: '2Ts' },
  { name: '1 Timóteo', chapters: 6, icon: 'auto_stories', testament: 'new', abbreviation: '1Tm' },
  { name: '2 Timóteo', chapters: 4, icon: 'auto_stories', testament: 'new', abbreviation: '2Tm' },
  { name: 'Tito', chapters: 3, icon: 'auto_stories', testament: 'new', abbreviation: 'Tt' },
  { name: 'Filemom', chapters: 1, icon: 'auto_stories', testament: 'new', abbreviation: 'Fm' },
  { name: 'Hebreus', chapters: 13, icon: 'auto_stories', testament: 'new', abbreviation: 'Hb' },
  { name: 'Tiago', chapters: 5, icon: 'auto_stories', testament: 'new', abbreviation: 'Tg' },
  { name: '1 Pedro', chapters: 5, icon: 'auto_stories', testament: 'new', abbreviation: '1Pe' },
  { name: '2 Pedro', chapters: 3, icon: 'auto_stories', testament: 'new', abbreviation: '2Pe' },
  { name: '1 João', chapters: 5, icon: 'auto_stories', testament: 'new', abbreviation: '1Jo' },
  { name: '2 João', chapters: 1, icon: 'auto_stories', testament: 'new', abbreviation: '2Jo' },
  { name: '3 João', chapters: 1, icon: 'auto_stories', testament: 'new', abbreviation: '3Jo' },
  { name: 'Judas', chapters: 1, icon: 'auto_stories', testament: 'new', abbreviation: 'Jd' },
  { name: 'Apocalipse', chapters: 22, icon: 'auto_stories', testament: 'new', abbreviation: 'Ap' }
]

// Versículos inspiradores para o versículo do dia
export const DAILY_VERSES = [
  {
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    reference: "João 3:16"
  },
  {
    text: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.",
    reference: "Provérbios 3:5"
  },
  {
    text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
    reference: "Jeremias 29:11"
  },
  {
    text: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13"
  },
  {
    text: "O Senhor é o meu pastor; nada me faltará.",
    reference: "Salmos 23:1"
  },
  {
    text: "Porque para Deus nada é impossível.",
    reference: "Lucas 1:37"
  },
  {
    text: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.",
    reference: "Romanos 8:28"
  }
]

// Funções utilitárias
export function findBookByName(bookName) {
  const normalizedName = bookName.replace(/-/g, ' ').toLowerCase()
  return BIBLE_BOOKS.find(book => 
    book.name.toLowerCase() === normalizedName ||
    book.name.toLowerCase().replace(/\s+/g, ' ') === normalizedName
  )
}

export function generateChapters(count) {
  return Array.from({ length: count }, (_, i) => i + 1)
}

export function getDailyVerse() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const verseIndex = dayOfWeek % DAILY_VERSES.length
  return DAILY_VERSES[verseIndex]
}

export function generateSampleVerses(chapter) {
  // Versículos de exemplo - em uma aplicação real, estes viriam de uma API
  const sampleVerses = {
    1: [
      { number: 1, text: "No princípio criou Deus os céus e a terra." },
      { number: 2, text: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas." },
      { number: 3, text: "E disse Deus: Haja luz; e houve luz." },
      { number: 4, text: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas." },
      { number: 5, text: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro." }
    ],
    2: [
      { number: 1, text: "Assim os céus, a terra e todo o seu exército foram acabados." },
      { number: 2, text: "E havendo Deus acabado no dia sétimo a obra que fizera, descansou no sétimo dia de toda a sua obra, que tinha feito." },
      { number: 3, text: "E abençoou Deus o dia sétimo, e o santificou; porque nele descansou de toda a sua obra que Deus criara e fizera." }
    ]
  }
  
  return sampleVerses[chapter] || [
    { number: 1, text: `Versículo de exemplo do capítulo ${chapter}. Em uma aplicação real, este texto viria de uma API ou banco de dados com o texto completo da Bíblia.` }
  ]
}
