import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { ROUTES } from './constants';
import { RedirectLink } from '@/pages/redirect-link';
import { NotFound } from '@/pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: ROUTES.REDIRECT_LINK.path,
    element: <RedirectLink />,
  },
  {
    path: ROUTES.NOT_FOUND.path,
    element: <NotFound />,
  },
]); 