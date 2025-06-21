import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { Home } from './pages/home';


export function App() {

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
} 

