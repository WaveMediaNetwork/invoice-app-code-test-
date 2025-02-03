import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './Router'; // ✅ Import your Router.tsx component

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter /> {/* ✅ Renders the single Router definition */}
        </QueryClientProvider>
    );
}
