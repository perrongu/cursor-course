import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-lg bg-white flex flex-col items-center gap-8">
        <h2 className="text-3xl font-bold mb-4">404 - Page Non Trouvée</h2>
        <p className="text-gray-600 mb-4">Désolé, la page que vous cherchez n'existe pas.</p>
        <Link 
          href="/"
          className="rounded-full px-6 py-2 bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition text-base"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
} 