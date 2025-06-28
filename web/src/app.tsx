import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { queryClient } from '@/lib/react-query';
import { router } from '@/routes';
import { Toaster } from 'sonner';

export function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster 
          richColors 
          position="bottom-right"
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  );
} 

