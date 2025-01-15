import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { fetchInvoices } from '../store/invoicesSlice';
import axios from 'axios';

export default function AddInvoiceModal() {
  const [formData, setFormData] = useState({
    vendorName: '',
    amount: '',
    dueDate: '',
    description: '',
    paid: false,
  });
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/invoices', {
        vendor_name: formData.vendorName,
        amount: parseFloat(formData.amount),
        due_date: formData.dueDate,
        description: formData.description,
        paid: formData.paid,
        user_id: 1,
      });
      setIsFormVisible(false);
      setIsThankYouVisible(true);
      dispatch(fetchInvoices());
      setTimeout(() => {
        setIsThankYouVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
          Add Invoice
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        {isFormVisible && (
          <>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity animate-fade-in" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 transition-transform animate-slide-up">
              <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg relative">
                <Dialog.Title className="text-lg font-bold mb-4">Add Invoice</Dialog.Title>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Vendor Name</span>
                    <input
                      type="text"
                      name="vendorName"
                      placeholder="Enter vendor name"
                      value={formData.vendorName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Amount</span>
                    <input
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Due Date</span>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Description</span>
                    <textarea
                      name="description"
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="paid"
                      checked={formData.paid}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm font-semibold text-gray-700">Mark as Paid</span>
                  </label>
                </div>
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                  Submit
                </button>
              </div>
            </Dialog.Content>
          </>
        )}

        {isThankYouVisible && (
          <>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity animate-fade-in" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 transition-transform animate-zoom-in">
              <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Thank You!</h2>
                <p>Your invoice has been successfully added.</p>
              </div>
            </Dialog.Content>
          </>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
