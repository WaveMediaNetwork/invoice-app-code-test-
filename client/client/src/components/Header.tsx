import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo/Brand */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          MyInvoices
        </Link>

        {/* Right: Navigation*/}
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/invoices" className="text-gray-600 hover:text-gray-900">
            Invoices
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
