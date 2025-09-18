import { useState, useEffect } from 'react'
import { StickyNote, Plus, Edit3, Trash2 } from 'lucide-react'
import { Note } from '../types/bible'
import { books } from '../data/bible'

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  // const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem('bible-notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes)
    localStorage.setItem('bible-notes', JSON.stringify(updatedNotes))
  }

  const addNote = (noteData: Partial<Note>) => {
    const newNote: Note = {
      id: Date.now().toString(),
      bookId: noteData.bookId || '',
      chapter: noteData.chapter || 1,
      verse: noteData.verse || 1,
      text: noteData.text || '',
      note: noteData.note || '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    saveNotes([...notes, newNote])
    setShowAddForm(false)
  }

  // const updateNote = (id: string, updatedNote: Partial<Note>) => {
  //   const updatedNotes = notes.map(note => 
  //     note.id === id 
  //       ? { ...note, ...updatedNote, updatedAt: new Date() }
  //       : note
  //   )
  //   saveNotes(updatedNotes)
  //   setEditingNote(null)
  // }

  const deleteNote = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
      const updatedNotes = notes.filter(note => note.id !== id)
      saveNotes(updatedNotes)
    }
  }

  const clearAllNotes = () => {
    if (confirm('Tem certeza que deseja excluir todas as notas?')) {
      setNotes([])
      localStorage.removeItem('bible-notes')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <StickyNote className="w-8 h-8 text-yellow-500 mr-3" />
            Minhas Notas
          </h1>
          <p className="text-gray-600">
            {notes.length === 0 
              ? 'Você ainda não tem notas pessoais' 
              : `${notes.length} ${notes.length === 1 ? 'nota' : 'notas'}`
            }
          </p>
        </div>
        
        <div className="flex space-x-2">
          {notes.length > 0 && (
            <button
              onClick={clearAllNotes}
              className="btn-secondary text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Limpar Todas
            </button>
          )}
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Nota
          </button>
        </div>
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Adicionar Nova Nota</h3>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            addNote({
              bookId: formData.get('bookId') as string,
              chapter: parseInt(formData.get('chapter') as string),
              verse: parseInt(formData.get('verse') as string),
              text: formData.get('text') as string,
              note: formData.get('note') as string
            })
          }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Livro</label>
                <select name="bookId" required className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione um livro</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>{book.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capítulo</label>
                <input
                  type="number"
                  name="chapter"
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Versículo</label>
                <input
                  type="number"
                  name="verse"
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Versículo</label>
              <textarea
                name="text"
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Digite o texto do versículo..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sua Nota</label>
              <textarea
                name="note"
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Escreva sua reflexão ou nota sobre este versículo..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar Nota
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <StickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma nota ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Comece a adicionar suas reflexões pessoais sobre os versículos da Bíblia.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeira Nota
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => {
            const book = books.find(b => b.id === note.bookId)
            return (
              <div key={note.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {book?.name} {note.chapter}:{note.verse}
                    </h3>
                    <p className="verse-text mb-3">
                      <span className="verse-number">{note.verse}</span>
                      {note.text}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => {/* setEditingNote(note) */}}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar nota"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir nota"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Minha Nota:</h4>
                  <p className="text-yellow-800 whitespace-pre-wrap">{note.note}</p>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>Criada em {new Date(note.createdAt).toLocaleDateString('pt-BR')}</span>
                    {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                      <span>Atualizada em {new Date(note.updatedAt).toLocaleDateString('pt-BR')}</span>
                    )}
                  </div>
                  <a
                    href={`/book/${note.bookId}/chapter/${note.chapter}`}
                    className="btn-secondary text-sm"
                  >
                    Ler Contexto
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tips */}
      <div className="card bg-purple-50 border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">Como usar as Notas</h3>
        <ul className="space-y-2 text-purple-800">
          <li>• Adicione suas reflexões pessoais sobre versículos específicos</li>
          <li>• Use as notas para registrar insights, orações ou aplicações práticas</li>
          <li>• Suas notas são salvas localmente no seu navegador</li>
          <li>• Você pode editar ou excluir suas notas a qualquer momento</li>
          <li>• As notas ajudam a aprofundar seu estudo bíblico pessoal</li>
        </ul>
      </div>
    </div>
  )
}

