import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearSelectedInvoice } from '../store/invoicesSlice';

export default function InvoiceDetailModal() {
  const dispatch = useAppDispatch();
  const { selectedInvoice } = useAppSelector((state) => state.invoices);

  if (!selectedInvoice) return null;

  const handleClose = () => {
    dispatch(clearSelectedInvoice());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 w-full max-w-md rounded shadow relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
        <p>
          <strong>Vendor Name:</strong> {selectedInvoice.vendorName}
        </p>
        <p>
          <strong>Description:</strong> {selectedInvoice.description}
        </p>
        <p>
          <strong>Due Date:</strong>{' '}
          {new Date(selectedInvoice.dueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Amount:</strong> ${selectedInvoice.amount.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span
            className={
              selectedInvoice.status === 'Paid'
                ? 'text-green-600 font-semibold'
                : 'text-yellow-600 font-semibold'
            }
          >
            {selectedInvoice.status}
          </span>
        </p>
      </div>
    </div>
  );
}
