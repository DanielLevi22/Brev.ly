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
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
} 

