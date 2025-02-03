import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface InvoiceDetailModalProps {
  open: boolean;               // ✅ Whether to show the modal
  invoiceId: number | null;    // ✅ The ID to fetch
  onClose: () => void;         // ✅ Close callback
}

export default function InvoiceDetailModal({
                                             open,
                                             invoiceId,
                                             onClose,
                                           }: InvoiceDetailModalProps) {
  // 1️⃣ Always call the hook
  const { data: invoice, status } = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/invoices/${invoiceId}`);
      return data;
    },
    enabled: invoiceId != null, // ✅ Only fetch if we have an ID
    staleTime: 5 * 60 * 1000,    // optional: keep data for 5 mins
  });

  // 2️⃣ If `open === false`, don't render anything (but the hook is still declared!)
  if (!open) return null;

  // 3️⃣ If invoice is being fetched or error occurs
  if (status === 'pending') return <ModalWrapper onClose={onClose}>Loading invoice…</ModalWrapper>;
  if (status === 'error') return <ModalWrapper onClose={onClose}>Error loading invoice.</ModalWrapper>;
  if (!invoice) return <ModalWrapper onClose={onClose}>No data found.</ModalWrapper>;

  // 4️⃣ Render the invoice data
  return (
      <ModalWrapper onClose={onClose}>
        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
        <p><strong>Vendor Name:</strong> {invoice.vendorName}</p>
        <p><strong>Description:</strong> {invoice.description}</p>
        <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
        <p><strong>Amount:</strong> ${invoice.amount}</p>
        <p><strong>Status:</strong> {invoice.paid ? 'Paid' : 'Pending'}</p>
      </ModalWrapper>
  );
}

// 5️⃣ A small helper component for the modal overlay & close logic
function ModalWrapper({
                        children,
                        onClose,
                      }: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  // Close if user clicks outside the modal
  const handleOverlayClick = () => onClose();

  // Prevent closing if user clicks inside the modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
      <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
      >
        <div
            className="bg-white p-6 w-full max-w-md rounded shadow relative"
            onClick={handleModalClick}
        >
          {/* "X" close button */}
          <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
  );
}
