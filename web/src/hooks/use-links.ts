import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { CreateLinkRequest } from '@/types/link';

// Query Keys
export const linkKeys = {
  all: ['links'] as const,
  lists: () => [...linkKeys.all, 'list'] as const,
  list: (filters: string) => [...linkKeys.lists(), { filters }] as const,
  details: () => [...linkKeys.all, 'detail'] as const,
  detail: (id: string) => [...linkKeys.details(), id] as const,
  originalUrl: (shortUrl: string) => [...linkKeys.all, 'originalUrl', shortUrl] as const,
};

// Hook para listar links
export function useLinks() {
  return useQuery({
    queryKey: linkKeys.lists(),
    queryFn: api.listLinks,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

// Hook para criar link
export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLinkRequest) => api.createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: linkKeys.lists(),
      });
    },
    onError: (error) => {
      console.error('Erro ao criar link:', error);
    },
  });
}

// Hook para incrementar contador de acesso
export function useIncrementAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shortUrl: string) => api.incrementAccess(shortUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: linkKeys.lists(),
      });
    },
    onError: (error) => {
      console.error('Erro ao incrementar acesso:', error);
    },
  });
}

// Hook para obter URL original
// Exemplo de uso:
// const { data, isLoading, error } = useGetOriginalUrl('google', true);
// if (data) console.log(data.originalUrl);
export function useGetOriginalUrl(shortUrl: string, enabled: boolean = true) {
  return useQuery({
    queryKey: linkKeys.originalUrl(shortUrl),
    queryFn: () => api.getOriginalUrl(shortUrl),
    enabled: enabled && !!shortUrl,
    staleTime: 1000 * 60 * 30, // 30 minutos
    gcTime: 1000 * 60 * 60, // 1 hora
  });
}

// Hook para deletar link
export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shortUrl: string) => api.deleteLink(shortUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: linkKeys.lists(),
      });
    },
    onError: (error) => {
      console.error('Erro ao deletar link:', error);
    },
  });
} 