import { AppRoute } from './types';

export const ROUTES: Record<string, AppRoute> = {
  HOME: {
    path: '/',
    name: 'Home',
    description: 'Página inicial do Brev.ly'
  },
  REDIRECT_LINK: {
    path: '/:shortKey',
    name: 'Redirect - link',
    description: 'Página de redirecionamento do link'
  },
  NOT_FOUND: {
    path: '*',
    name: 'Not Found',
    description: 'Página 404 - Página não encontrada'
  },
  // Exemplo de como adicionar novas rotas no futuro:
  // LINKS: {
  //   path: '/links',
  //   name: 'Links',
  //   description: 'Gerenciar links'
  // },
  // SETTINGS: {
  //   path: '/settings',
  //   name: 'Configurações',
  //   description: 'Configurações da conta'
  // },
} as const;

export const getRoutePath = (routeKey: keyof typeof ROUTES): string => {
  return ROUTES[routeKey].path;
}; 