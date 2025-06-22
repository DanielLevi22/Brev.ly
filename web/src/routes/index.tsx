import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/layouts/app-layout';
import { HomePage } from '@/pages/home';
import { ROUTES } from './constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME.path,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]); 