import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { setSelectedInvoice } from '../store/invoicesSlice';
import type { Invoice } from '../store/invoicesSlice';
import { format } from 'date-fns';

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const dispatch = useAppDispatch();

  const handleSelectInvoice = (invoice: Invoice) => {
    dispatch(setSelectedInvoice(invoice)); // Set selected invoice for modal
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {invoices.map((inv) => (
        <div
          key={inv.id}
          onClick={() => handleSelectInvoice(inv)}
          className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
        >
          <h2 className="font-bold text-lg mb-1">{inv.vendorName}</h2>
          <p className="text-gray-600">Description: {inv.description}</p>
          <p className="text-gray-600">
            Due: {format(new Date(inv.dueDate), 'MM/dd/yyyy')}
          </p>
          <p className="text-gray-600">Amount: ${inv.amount.toFixed(2)}</p>
          <p className="text-gray-600">
            Status:{' '}
            <span
              className={
                inv.status === 'Paid'
                  ? 'text-green-600 font-semibold'
                  : 'text-yellow-600 font-semibold'
              }
            >
              {inv.status}
            </span>
          </p>
        </div>
      ))}
      {invoices.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No invoices available.
        </div>
      )}
    </div>
  );
}
