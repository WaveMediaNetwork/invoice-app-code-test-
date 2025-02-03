import React from 'react';
import { useInvoices } from '../hooks/useInvoices';
import { format } from 'date-fns';

export default function InvoiceCard({ invoiceId }: { invoiceId: number }) {
  const { data: invoices = [], status } = useInvoices();
  const invoice = invoices.find(inv => inv.id === invoiceId);

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error' || !invoice) return <p>Error loading invoice</p>;

  return (
      <div className="p-4 border rounded-lg shadow-md hover:bg-gray-50 cursor-pointer transition">
        <h2 className="font-bold text-lg mb-2">{invoice.vendorName}</h2>
        <p className="text-gray-600">Amount: <span className="font-medium">${invoice.amount.toFixed(2)}</span></p>
        <p className="text-gray-600">Due: {format(new Date(invoice.dueDate || ''), 'MM/dd/yyyy')}</p>
        <p className={`font-semibold ${invoice.paid ? 'text-green-600' : 'text-yellow-600'}`}>
          {invoice.paid ? 'Paid' : 'Pending'}
        </p>
      </div>
  );
}
