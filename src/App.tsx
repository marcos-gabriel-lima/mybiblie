import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { BookList } from './pages/BookList'
import { Chapter } from './pages/Chapter'
import { Search } from './pages/Search'
import { Favorites } from './pages/Favorites'
import { Notes } from './pages/Notes'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-2 md:px-4 py-4 md:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/book/:bookId/chapter/:chapterNumber" element={<Chapter />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App


