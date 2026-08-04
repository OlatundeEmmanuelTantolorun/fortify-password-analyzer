import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Workspace from './components/Workspace'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col grid-backdrop">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#111827',
            color: '#F8FAFC',
            border: '1px solid #1f2937',
            fontSize: '14px',
          },
        }}
      />
      <Header />
      <main className="flex-1 flex items-start justify-center py-12 md:py-16">
        <Workspace />
      </main>
      <Footer />
    </div>
  )
}
