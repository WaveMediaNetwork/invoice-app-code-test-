import React from 'react';
import { useInvoices } from '../hooks/useInvoices';
import { format } from 'date-fns';

export default function InvoiceList() {
  const { data: invoices = [], status } = useInvoices();

  if (status === 'pending') return <p>Loading invoices...</p>;
  if (status === 'error') return <p>Error loading invoices.</p>;

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.map((inv) => (
            <div key={inv.id} className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer">
              <h2 className="font-bold text-lg mb-1">{inv.vendorName}</h2>
              <p className="text-gray-600">Description: {inv.description}</p>
              <p className="text-gray-600">Due: {format(new Date(inv.dueDate), 'MM/dd/yyyy')}</p>
              <p className="text-gray-600">Amount: ${inv.amount.toFixed(2)}</p>
              <p className={`font-semibold ${inv.paid ? 'text-green-600' : 'text-yellow-600'}`}>
                {inv.paid ? 'Paid' : 'Pending'}
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
