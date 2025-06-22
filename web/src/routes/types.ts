export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export interface AppRoute {
  path: string;
  name: string;
  description?: string;
} 