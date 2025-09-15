// Dados locais da Bíblia em português (Almeida Corrigida Fiel)
// Este é um fallback quando a API externa não está disponível

export interface LocalBibleVerse {
  number: number
  text: string
}

export interface LocalBibleChapter {
  number: number
  verses: LocalBibleVerse[]
}

export interface LocalBibleBook {
  id: string
  name: string
  chapters: LocalBibleChapter[]
}

// Dados de exemplo - Gênesis capítulo 1 em Português (ACF)
export const GENESIS_1_PT: LocalBibleChapter = {
  number: 1,
  verses: [
    { number: 1, text: "No princípio criou Deus os céus e a terra." },
    { number: 2, text: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas." },
    { number: 3, text: "E disse Deus: Haja luz; e houve luz." },
    { number: 4, text: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas." },
    { number: 5, text: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã: o dia primeiro." },
    { number: 6, text: "E disse Deus: Haja uma expansão no meio das águas, e haja separação entre águas e águas." },
    { number: 7, text: "E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão; e assim foi." },
    { number: 8, text: "E chamou Deus à expansão Céus, e foi a tarde e a manhã: o dia segundo." },
    { number: 9, text: "E disse Deus: Ajuntem-se as águas debaixo dos céus num lugar; e apareça a porção seca; e assim foi." },
    { number: 10, text: "E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares; e viu Deus que era bom." },
    { number: 11, text: "E disse Deus: Produza a terra erva verde, erva que dê semente, árvore frutífera que dê fruto segundo a sua espécie, cuja semente está nela sobre a terra; e assim foi." },
    { number: 12, text: "E a terra produziu erva, erva dando semente conforme a sua espécie, e a árvore frutífera, cuja semente está nela conforme a sua espécie; e viu Deus que era bom." },
    { number: 13, text: "E foi a tarde e a manhã: o dia terceiro." },
    { number: 14, text: "E disse Deus: Haja luminares na expansão dos céus, para haver separação entre o dia e a noite; e sejam eles para sinais e para tempos determinados e para dias e anos." },
    { number: 15, text: "E sejam para luminares na expansão dos céus, para iluminar a terra; e assim foi." },
    { number: 16, text: "E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; e fez as estrelas." },
    { number: 17, text: "E Deus os pôs na expansão dos céus para iluminar a terra," },
    { number: 18, text: "E para governar o dia e a noite, e para fazer separação entre a luz e as trevas; e viu Deus que era bom." },
    { number: 19, text: "E foi a tarde e a manhã: o dia quarto." },
    { number: 20, text: "E disse Deus: Produzam as águas abundantemente répteis de alma vivente; e voem as aves sobre a face da expansão dos céus." },
    { number: 21, text: "E Deus criou as grandes baleias, e todo o réptil de alma vivente que as águas abundantemente produziram conforme as suas espécies; e toda a ave de asas conforme a sua espécie; e viu Deus que era bom." },
    { number: 22, text: "E Deus os abençoou, dizendo: Frutificai e multiplicai-vos, e enchei as águas nos mares, e as aves se multipliquem na terra." },
    { number: 23, text: "E foi a tarde e a manhã: o dia quinto." },
    { number: 24, text: "E disse Deus: Produza a terra alma vivente conforme a sua espécie; gado, e répteis, e feras da terra conforme a sua espécie; e assim foi." },
    { number: 25, text: "E fez Deus as feras da terra conforme a sua espécie, e o gado conforme a sua espécie, e todo o réptil da terra conforme a sua espécie; e viu Deus que era bom." },
    { number: 26, text: "E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra, e sobre todo o réptil que se move sobre a terra." },
    { number: 27, text: "E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou." },
    { number: 28, text: "E Deus os abençoou, e Deus lhes disse: Frutificai e multiplicai-vos, e enchei a terra, e sujeitai-a; e dominai sobre os peixes do mar e sobre as aves dos céus, e sobre todo o animal que se move sobre a terra." },
    { number: 29, text: "E disse Deus: Eis que vos tenho dado toda a erva que dê semente, que está sobre a face de toda a terra; e toda a árvore, em que há fruto que dê semente, ser-vos-á para mantimento." },
    { number: 30, text: "E a todo o animal da terra, e a toda a ave dos céus, e a todo o réptil da terra, em que há alma vivente, toda a erva verde será para mantimento; e assim foi." },
    { number: 31, text: "E viu Deus tudo quanto tinha feito, e eis que era muito bom; e foi a tarde e a manhã: o dia sexto." }
  ]
}

// Dados de exemplo - Gênesis capítulo 1 em Inglês (KJV)
export const GENESIS_1_EN: LocalBibleChapter = {
  number: 1,
  verses: [
    { number: 1, text: "In the beginning God created the heaven and the earth." },
    { number: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
    { number: 3, text: "And God said, Let there be light: and there was light." },
    { number: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
    { number: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
    { number: 6, text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters." },
    { number: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so." },
    { number: 8, text: "And God called the firmament Heaven. And the evening and the morning were the second day." },
    { number: 9, text: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so." },
    { number: 10, text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good." },
    { number: 11, text: "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so." },
    { number: 12, text: "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good." },
    { number: 13, text: "And the evening and the morning were the third day." },
    { number: 14, text: "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:" },
    { number: 15, text: "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so." },
    { number: 16, text: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also." },
    { number: 17, text: "And God set them in the firmament of the heaven to give light upon the earth," },
    { number: 18, text: "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good." },
    { number: 19, text: "And the evening and the morning were the fourth day." },
    { number: 20, text: "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven." },
    { number: 21, text: "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good." },
    { number: 22, text: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth." },
    { number: 23, text: "And the evening and the morning were the fifth day." },
    { number: 24, text: "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so." },
    { number: 25, text: "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good." },
    { number: 26, text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth." },
    { number: 27, text: "So God created man in his own image, in the image of God created he him; male and female created he them." },
    { number: 28, text: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth." },
    { number: 29, text: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat." },
    { number: 30, text: "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so." },
    { number: 31, text: "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day." }
  ]
}

// Dados de exemplo - Gênesis capítulo 1 em Espanhol (RVR1960)
export const GENESIS_1_ES: LocalBibleChapter = {
  number: 1,
  verses: [
    { number: 1, text: "En el principio creó Dios los cielos y la tierra." },
    { number: 2, text: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas." },
    { number: 3, text: "Y dijo Dios: Sea la luz; y fue la luz." },
    { number: 4, text: "Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas." },
    { number: 5, text: "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día." },
    { number: 6, text: "Luego dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas." },
    { number: 7, text: "E hizo Dios la expansión, y separó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión. Y fue así." },
    { number: 8, text: "Y llamó Dios a la expansión Cielos. Y fue la tarde y la mañana el día segundo." },
    { number: 9, text: "Dijo también Dios: Júntense las aguas que están debajo de los cielos en un lugar, y descúbrase lo seco. Y fue así." },
    { number: 10, text: "Y llamó Dios a lo seco Tierra, y a la reunión de las aguas llamó Mares. Y vio Dios que era bueno." },
    { number: 11, text: "Después dijo Dios: Produzca la tierra hierba verde, hierba que dé semilla; árbol de fruto que dé fruto según su género, que su semilla esté en él, sobre la tierra. Y fue así." },
    { number: 12, text: "Produjo, pues, la tierra hierba verde, hierba que da semilla según su naturaleza, y árbol que da fruto, cuya semilla está en él, según su género. Y vio Dios que era bueno." },
    { number: 13, text: "Y fue la tarde y la mañana el día tercero." },
    { number: 14, text: "Dijo luego Dios: Haya lumbreras en la expansión de los cielos para separar el día de la noche; y sirvan de señales para las estaciones, para días y años," },
    { number: 15, text: "y sean por lumbreras en la expansión de los cielos para alumbrar sobre la tierra. Y fue así." },
    { number: 16, text: "E hizo Dios las dos grandes lumbreras; la lumbrera mayor para que señorease en el día, y la lumbrera menor para que señorease en la noche; hizo también las estrellas." },
    { number: 17, text: "Y las puso Dios en la expansión de los cielos para alumbrar sobre la tierra," },
    { number: 18, text: "y para señorear en el día y en la noche, y para separar la luz de las tinieblas. Y vio Dios que era bueno." },
    { number: 19, text: "Y fue la tarde y la mañana el día cuarto." },
    { number: 20, text: "Dijo Dios: Produzcan las aguas seres vivientes, y aves que vuelen sobre la tierra, en la abierta expansión de los cielos." },
    { number: 21, text: "Y creó Dios los grandes monstruos marinos, y todo ser viviente que se mueve, que las aguas produjeron según su género, y toda ave alada según su especie. Y vio Dios que era bueno." },
    { number: 22, text: "Y los bendijo Dios, diciendo: Fructificad y multiplicaos, y llenad las aguas en los mares, y multiplíquense las aves en la tierra." },
    { number: 23, text: "Y fue la tarde y la mañana el día quinto." },
    { number: 24, text: "Luego dijo Dios: Produzca la tierra seres vivientes según su género, bestias y serpientes y animales de la tierra según su especie. Y fue así." },
    { number: 25, text: "E hizo Dios animales de la tierra según su género, y ganado según su género, y todo animal que se arrastra sobre la tierra según su especie. Y vio Dios que era bueno." },
    { number: 26, text: "Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza; y señoree en los peces del mar, en las aves de los cielos, en las bestias, en toda la tierra, y en todo animal que se arrastra sobre la tierra." },
    { number: 27, text: "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó." },
    { number: 28, text: "Y los bendijo Dios, y les dijo: Fructificad y multiplicaos; llenad la tierra, y sojuzgadla, y señoread en los peces del mar, en las aves de los cielos, y en todas las bestias que se mueven sobre la tierra." },
    { number: 29, text: "Y dijo Dios: He aquí que os he dado toda planta que da semilla, que está sobre toda la tierra, y todo árbol en que hay fruto y que da semilla; os serán para comer." },
    { number: 30, text: "Y a toda bestia de la tierra, y a todas las aves de los cielos, y a todo lo que se arrastra sobre la tierra, en que hay vida, toda planta verde les será para comer. Y fue así." },
    { number: 31, text: "Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera. Y fue la tarde y la mañana el día sexto." }
  ]
}

// Mapeamento de livros e capítulos disponíveis localmente por idioma
export const LOCAL_BIBLE_DATA: Record<string, Record<string, Record<number, LocalBibleChapter>>> = {
  'pt-BR': {
    'genesis': {
      1: GENESIS_1_PT
    }
  },
  'en-US': {
    'genesis': {
      1: GENESIS_1_EN
    }
  },
  'es-ES': {
    'genesis': {
      1: GENESIS_1_ES
    }
  }
}

// Função para obter dados locais da Bíblia por idioma
export function getLocalBibleChapter(bookId: string, chapterNumber: number, language: string = 'pt-BR'): LocalBibleChapter | null {
  const languageData = LOCAL_BIBLE_DATA[language]
  if (!languageData) {
    return null
  }
  
  const bookData = languageData[bookId.toLowerCase()]
  if (!bookData) {
    return null
  }
  
  return bookData[chapterNumber] || null
}

// Função para verificar se um capítulo está disponível localmente
export function isLocalChapterAvailable(bookId: string, chapterNumber: number, language: string = 'pt-BR'): boolean {
  return getLocalBibleChapter(bookId, chapterNumber, language) !== null
}
