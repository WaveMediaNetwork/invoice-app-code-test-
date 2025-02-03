import React, { useMemo, useState } from 'react';
import { useInvoices, useDeleteInvoices } from '../hooks/useInvoices';
import AddInvoiceModal from '../components/AddInvoiceModal';
import InvoiceDetailModal from '../components/InvoiceDetailModal';
import { Invoice } from '../hooks/useInvoices';
import { useNavigate } from 'react-router-dom';

interface TooltipIconProps {
    icon: React.ReactNode;
    tooltip: string;
    onClick?: () => void;
}

function TooltipIcon({ icon, tooltip, onClick }: TooltipIconProps) {
    return (
        <div className="relative group cursor-pointer" onClick={onClick}>
            <div className="mx-2">{icon}</div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-50">
                {tooltip}
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const navigate = useNavigate();

    const {
        data: invoiceResponse,
        status,
        error,
    } = useInvoices();


    const invoices: Invoice[] = Array.isArray(invoiceResponse)
        ? invoiceResponse
        : invoiceResponse?.data ?? [];

    const deleteInvoices = useDeleteInvoices();
    const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
    const [sortAsc, setSortAsc] = useState<boolean | null>(null);

    // 3️⃣ Invoice Detail Modal
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleSelectInvoice = (id: number) => {
        setSelectedInvoiceId(id);
        setIsDetailOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedInvoiceId(null);
        setIsDetailOpen(false);
    };

    // 4️⃣ Sort invoices by amount
    const sortedInvoices = useMemo(() => {
        if (!Array.isArray(invoices)) return [];
        if (invoices.length === 0) return [];
        if (sortAsc === null) return invoices;
        return [...invoices].sort((a, b) =>
            sortAsc ? a.amount - b.amount : b.amount - a.amount
        );
    }, [invoices, sortAsc]);

    // 5️⃣ Toggle sorting
    const toggleSort = () => {
        if (sortAsc === null) setSortAsc(true);
        else if (sortAsc) setSortAsc(false);
        else setSortAsc(null);
    };

    // 6️⃣ Check/uncheck invoices
    const toggleCheckbox = (id: number) => {
        setSelectedInvoices((prev) =>
            prev.includes(id) ? prev.filter((invoiceId) => invoiceId !== id) : [...prev, id]
        );
    };

    const deleteSelected = () => {
        deleteInvoices.mutate(selectedInvoices);
        setSelectedInvoices([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-400 flex">
            {/* Left Sidebar */}
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
                    {/* Add Invoice Modal Trigger */}
                    <AddInvoiceModal />
                </nav>

                {/* Logout */}
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}
                    className="w-3/4 bg-red-500 text-white py-2 rounded-lg mt-8 hover:bg-red-600 transition"
                >
                    Logout
                </button>
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

                {/* Invoices Table */}
                <div className="p-8 overflow-auto">
                    {/* 7️⃣ React Query status: 'loading'|'error'|'success' */}
                    {status === 'pending' && <p className="text-gray-500">Loading invoices...</p>}
                    {status === 'error' && (
                        <p className="text-red-600">Error loading invoices: {String(error)}</p>
                    )}
                    {status === 'success' && (
                        <>
                            {/* Sort Button */}
                            <button
                                onClick={toggleSort}
                                className="bg-gray-200 px-3 py-1 rounded text-sm mb-2 hover:bg-gray-300"
                            >
                                Sort by Amount:{" "}
                                {sortAsc === null ? "No Sort" : sortAsc ? "Ascending" : "Descending"}
                            </button>

                            {/* Table Container */}
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                                    <thead>
                                    <tr className="bg-sky-600 text-white text-left">
                                        <th className="py-3 px-4">
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    setSelectedInvoices(
                                                        e.target.checked
                                                            ? sortedInvoices.map((inv) => inv.id)
                                                            : []
                                                    )
                                                }
                                                checked={
                                                    sortedInvoices.length > 0 &&
                                                    selectedInvoices.length === sortedInvoices.length
                                                }
                                            />
                                        </th>
                                        <th className="py-3 px-4">Date</th>
                                        <th className="py-3 px-4">Vendor</th>
                                        <th className="py-3 px-4">Description</th>
                                        <th className="py-3 px-4">Due Date</th>
                                        <th className="py-3 px-4">Amount</th>
                                        <th className="py-3 px-4">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {sortedInvoices.map((inv, i) => (
                                        <tr
                                            key={inv.id}
                                            onClick={() => handleSelectInvoice(inv.id)}
                                            className={
                                                i % 2 === 0
                                                    ? "hover:bg-gray-50 cursor-pointer"
                                                    : "bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                            }
                                        >
                                            <td className="py-3 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedInvoices.includes(inv.id)}
                                                    onChange={(e) => {
                                                        e.stopPropagation(); // prevent row click
                                                        toggleCheckbox(inv.id);
                                                    }}
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                {new Date(inv.dueDate).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">{inv.vendorName}</td>
                                            <td className="py-3 px-4">{inv.description}</td>
                                            <td className="py-3 px-4">
                                                {new Date(inv.dueDate).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">${inv.amount}</td>
                                            <td className="py-3 px-4">
                          <span
                              className={
                                  inv.paid
                                      ? "text-green-600 font-medium"
                                      : "text-yellow-600 font-medium"
                              }
                          >
                            {inv.paid ? "Paid" : "Pending"}
                          </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Delete Button */}
                            {selectedInvoices.length > 0 && (
                                <button
                                    onClick={deleteSelected}
                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Delete Selected
                                </button>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Invoice Detail Modal */}
            {isDetailOpen && selectedInvoiceId !== null && (
                <InvoiceDetailModal
                    invoiceId={selectedInvoiceId}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
