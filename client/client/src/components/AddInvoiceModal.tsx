import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useAddInvoice } from '../hooks/useInvoices';

export default function AddInvoiceModal() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<{
    vendorName: string;
    amount: number;
    dueDate: string;
    description: string;
    paid: boolean;
    userId: number;
  }>({
    vendorName: '',
    amount: 0,
    dueDate: '',
    description: '',
    paid: false,
    userId: 1, // Hardcode or fetch from auth
  });

  const addInvoice = useAddInvoice();

  // 🔑 Convert input fields to correct data types
  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // 🔑 Submit the form
  const handleSubmit = () => {
    // Optionally validate fields here
    if (!formData.vendorName || !formData.dueDate) {
      alert('Please fill out all required fields.');
      return;
    }

    addInvoice.mutate(formData, {
      onSuccess: () => {
        alert('Thank you for submitting!');
        setOpen(false);
      },
      onError: (error: any) => {
        console.error('Error creating invoice:', error);
        alert(error.response?.data?.message || 'Failed to create invoice.');
      },
    });
  };

  return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
            Add Invoice
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity animate-fade-in" />
          <Dialog.Content
              aria-describedby="invoice-modal-description"
              className="fixed inset-0 flex items-center justify-center p-4 transition-transform animate-slide-up"
          >
            <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg relative">
              <Dialog.Title className="text-lg font-bold mb-4">Add Invoice</Dialog.Title>
              <p id="invoice-modal-description" className="text-sm text-gray-600 mb-4">
                Fill out the details below to create a new invoice.
              </p>

              {/* Form Fields */}
              <div className="flex flex-col gap-3">
                <label className="font-semibold">Vendor Name</label>
                <input
                    type="text"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <label className="font-semibold">Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <label className="font-semibold">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <label className="font-semibold">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <label className="flex items-center gap-2">
                  <input
                      type="checkbox"
                      name="paid"
                      checked={formData.paid}
                      onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            paid: e.target.checked,
                          }))
                      }
                      className="w-5 h-5"
                  />
                  Mark as Paid
                </label>
              </div>

              {/* Submit Button */}
              <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  );
}
