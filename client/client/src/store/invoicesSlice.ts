import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Invoice {
  id: number;
  vendorName: string; // Mapped from `vendor_name`
  amount: number;
  dueDate: string; // Mapped from `due_date`
  description: string;
  status: string; // Derived from `paid` (e.g., `Paid` or `Open`)
  userId: number; // Mapped from `user_id`
}

interface InvoicesState {
  list: Invoice[];
  selectedInvoice: Invoice | null; // Selected invoice for detail modal
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InvoicesState = {
  list: [],
  selectedInvoice: null, // Initialize selected invoice
  status: 'idle',
  error: null,
};

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async () => {
    const response = await axios.get<{ data: any[] }>('http://localhost:3000/invoices');
    return response.data.data.map((invoice) => ({
      id: invoice.id,
      vendorName: invoice.vendor_name,
      amount: invoice.amount,
      dueDate: invoice.due_date,
      description: invoice.description,
      status: invoice.paid ? 'Paid' : 'Open', // Convert `paid` to `status`
      userId: invoice.user_id,
    }));
  }
);

export const deleteInvoices = createAsyncThunk(
  'invoices/deleteInvoices',
  async (ids: number[]) => {
    await axios.delete('http://localhost:3000/invoices/bulk-delete', {
      data: { ids },
    });
    return ids;
  }
);

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {

    clearSelectedInvoice(state) {
      state.selectedInvoice = null; // Clear the selected invoice
    },
    setSelectedInvoice(state, action) {
      state.selectedInvoice = action.payload; // Set the selected invoice
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; // Populate the invoice list
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })

      .addCase(deleteInvoices.fulfilled, (state, action) => {
        state.list = state.list.filter((invoice) => !action.payload.includes(invoice.id));
      });
  },
});

export const { clearSelectedInvoice, setSelectedInvoice } = invoicesSlice.actions; // Export actions
export default invoicesSlice.reducer;
