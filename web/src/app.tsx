import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';


export function App() {

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <h1 className="text-3xl text-blue-dark"> Hello World</h1>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

