import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { router } from '@/routes';
import { Toaster } from 'sonner';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster 
        richColors 
        position="bottom-right"
        toastOptions={{
          style: {
            backgroundColor: '#f9f9fb', 
            color: '#2c46b1',
            border: 'none',
            boxShadow: '0 4px 4px rgba(0,0,0,.25)' 
          }
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
} 

