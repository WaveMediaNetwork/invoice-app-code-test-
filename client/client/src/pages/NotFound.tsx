
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Oops! The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  )
}
