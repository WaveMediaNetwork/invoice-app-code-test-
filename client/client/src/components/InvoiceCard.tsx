// src/components/InvoiceCard.tsx
import React from 'react';
import { Invoice } from '../store/invoicesSlice';
import { format } from 'date-fns';

interface InvoiceCardProps {
  invoice: Invoice;
  onSelect: (id: number) => void;
}

export default function InvoiceCard({ invoice, onSelect }: InvoiceCardProps) {
  // Trigger the onSelect callback with the invoice ID
  const handleClick = () => {
    onSelect(invoice.id);
  };

  // Determine the status color based on invoice status
  const statusColor = invoice.status === 'Paid' ? 'text-green-600' : 'text-yellow-600';

  return (
    <div
      onClick={handleClick}
      className="
        p-4
        border
        rounded-lg
        shadow-md
        hover:bg-gray-50
        cursor-pointer
        transition
      "
    >
      {/* Display Vendor Name */}
      <h2 className="font-bold text-lg mb-2">{invoice.vendorName}</h2>

      {/* Display Invoice Amount */}
      <p className="text-gray-600">
        Amount: <span className="font-medium">${invoice.amount.toFixed(2)}</span>
      </p>

      {/* Display Due Date */}
      <p className="text-gray-600">
        Due: {format(new Date(invoice.dueDate), 'MM/dd/yyyy')}
      </p>

      {/* Display Status */}
      <p className={`${statusColor} font-semibold`}>{invoice.status}</p>
    </div>
  );
}
