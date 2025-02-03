import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

export interface Invoice {
    id: number;
    vendorName: string;
    amount: number;
    dueDate: string;
    description: string;
    paid: boolean;
    userId: number;
}

const BASE_URL = 'http://localhost:3000';

/**
 * Fetch paginated invoices.
 * @param page Current page (default = 1).
 * @param limit Number of invoices per page (default = 10).
 */
export function useInvoices(page = 1, limit = 10): UseQueryResult<any, Error> {
    return useQuery({
        queryKey: ['invoices', page, limit],
        queryFn: async () => {
            // Call backend with pagination
            const { data } = await axios.get(`${BASE_URL}/invoices?page=${page}&limit=${limit}`);
            return data; // e.g. { data: [], total, page, limit, totalPages }
        },
    });
}

/**
 * Add a new invoice (without 'id', since backend will assign it).
 * Automatically refetches the 'invoices' query on success.
 */
export function useAddInvoice() {
    const queryClient = useQueryClient();

    return useMutation({
        // `newInvoice` must be an object that matches the Invoice fields minus 'id'
        mutationFn: async (newInvoice: Omit<Invoice, 'id'>) => {
            const { data } = await axios.post<Invoice>(`${BASE_URL}/invoices`, newInvoice);
            return data; // The newly created Invoice (with 'id')
        },
        // When mutation succeeds, refetch 'invoices'
        onSuccess: () => {
            queryClient.invalidateQueries(['invoices']);
        },
    });
}

/**
 * Delete multiple invoices by ID.
 * Automatically refetches the 'invoices' query on success.
 */
export function useDeleteInvoices() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (invoiceIds: number[]) => {
            return axios.delete(`${BASE_URL}/invoices/bulk-delete`, {
                data: { ids: invoiceIds },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['invoices']);
        },
    });
}
