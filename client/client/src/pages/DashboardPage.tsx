import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchInvoices, deleteInvoices, setSelectedInvoice, Invoice } from '../store/invoicesSlice';
import AddInvoiceModal from '../components/AddInvoiceModal';
import InvoiceDetailModal from '../components/InvoiceDetailModal';

// Tooltip Icon Component
interface TooltipIconProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}

function TooltipIcon({ icon, tooltip, onClick }: TooltipIconProps) {
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className="mx-2">{icon}</div>
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-50"
      >
        {tooltip}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { list, status, error } = useAppSelector((state) => state.invoices);
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [sortAsc, setSortAsc] = useState<boolean | null>(null);

  const sortedInvoices = useMemo(() => {
    if (!list || list.length === 0) return [];
    if (sortAsc === null) return list;
    return [...list].sort((a, b) =>
      sortAsc ? a.amount - b.amount : b.amount - a.amount
    );
  }, [list, sortAsc]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInvoices());
    }
  }, [status, dispatch]);

  const toggleSort = () => {
    if (sortAsc === null) setSortAsc(true);
    else if (sortAsc) setSortAsc(false);
    else setSortAsc(null);
  };

  const toggleCheckbox = (id: number) => {
    setSelectedInvoices((prev) =>
      prev.includes(id) ? prev.filter((invoiceId) => invoiceId !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    dispatch(deleteInvoices(selectedInvoices));
    setSelectedInvoices([]);
  };

  const handleRowClick = (invoice: Invoice) => {
    dispatch(setSelectedInvoice(invoice));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-400 flex">
      {/* Left Nav Bar */}
      <aside className="w-64 min-h-screen flex flex-col items-center bg-gradient-to-b from-[#b6c5fe] to-sky-200 backdrop-blur-md border-r border-white/30 shadow-lg pt-8 px-4">
        <button className="w-3/4 flex items-center justify-center h-14 rounded-full bg-gradient-to-r from-white to-gray-300 text-[#a7a6a9] hover:from-gray-200 hover:to-gray-400 hover:text-gray-900 font-semibold text-lg transition-colors mb-8">
          LOGO
        </button>
        <p className="text-gray-800 font-bold mb-4 w-full text-left">Menu</p>
        <nav className="flex flex-col space-y-2 w-full">
          <button className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-gray-900">
            Home
          </button>
          <button className="flex items-center px-3 py-2 rounded-lg font-bold text-gray-900 bg-white/50 shadow-sm">
            Invoices
          </button>
          <button className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-gray-900">
            Bills
          </button>
          <button className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-gray-900">
            Expenses
          </button>
          <button className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-gray-900">
            Reports
          </button>
          <AddInvoiceModal />
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 bg-white rounded-tl-2xl rounded-bl-2xl shadow-md">
        <header className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-block mr-2">☰</span>
            <nav className="text-gray-600 text-sm">
              Home / <span className="font-bold">Invoices</span>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative mr-2">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <span className="absolute left-2 top-1.5 text-gray-400">🔍</span>
            </div>
            <TooltipIcon icon={<span>🔔</span>} tooltip="my notifications" />
            <TooltipIcon icon={<span>⚙️</span>} tooltip="my settings" />
            <TooltipIcon icon={<span>🌗</span>} tooltip="dark / light mode" />
            <TooltipIcon
              icon={
                <img
                  src="https://via.placeholder.com/32"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              }
              tooltip="my profile"
            />
          </div>
        </header>

        <div className="p-8 overflow-auto">
          {status === 'loading' && <p className="text-gray-500">Loading invoices...</p>}
          {status === 'failed' && error && <p className="text-red-600">Error: {error}</p>}
          {status === 'succeeded' && (
            <>
              <table className="w-full border-collapse">
                <thead>
                <tr className="bg-sky-600 text-white">
                  <th className="py-3 px-4 font-bold text-left border border-gray-300">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedInvoices(
                          e.target.checked ? list.map((inv) => inv.id) : []
                        )
                      }
                      checked={selectedInvoices.length === list.length}
                    />
                  </th>
                  <th className="py-3 px-4 font-bold text-left border border-gray-300">Date</th>
                  <th className="py-3 px-4 font-bold text-left border border-gray-300">Vendor</th>
                  <th className="py-3 px-4 font-bold text-left border border-gray-300">Description</th>
                  <th className="py-3 px-4 font-bold text-left border border-gray-300">Due Date</th>
                  <th className="py-3 px-4 font-bold text-left border border-gray-300">Amount</th>
                  <th className="py-3 px-4 font-bold text-left border border-gray-300">Status</th>
                </tr>
                </thead>
                <tbody>
                {sortedInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="py-3 px-4 border border-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.includes(inv.id)}
                        onChange={() => toggleCheckbox(inv.id)}
                      />
                    </td>
                    <td className="py-3 px-4 border border-gray-300">
                      {new Date(inv.dueDate).toLocaleDateString('en-US')}
                    </td>
                    <td className="py-3 px-4 border border-gray-300">{inv.vendorName}</td>
                    <td className="py-3 px-4 border border-gray-300">{inv.description}</td>
                    <td className="py-3 px-4 border border-gray-300">
                      {new Date(inv.dueDate).toLocaleDateString('en-US')}
                    </td>
                    <td className="py-3 px-4 border border-gray-300">$ {inv.amount}</td>
                    <td
                      className={`py-3 px-4 border border-gray-300 ${
                        inv.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                      }`}
                    >
                      {inv.status}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
              {selectedInvoices.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                >
                  Delete Selected
                </button>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal Component */}
      <InvoiceDetailModal />
    </div>
  );
}
