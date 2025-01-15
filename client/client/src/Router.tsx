import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InvoicesPage from './pages/DashboardPage'
import NotFound from './pages/NotFound'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoicesPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
