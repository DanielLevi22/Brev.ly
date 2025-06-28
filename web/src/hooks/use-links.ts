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

export function useLinks() {

  return useQuery({
    queryKey: linkKeys.lists(),
    queryFn: api.listLinks,
    staleTime: 0, 
    gcTime: 1000 * 60 * 5, 
  });
}

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

export function useGetOriginalUrl(shortUrl: string, enabled: boolean = true) {
  return useQuery({
    queryKey: linkKeys.originalUrl(shortUrl),
    queryFn: () => api.getOriginalUrl(shortUrl),
    enabled: enabled && !!shortUrl,
    staleTime: 1000 * 60 * 30, 
    gcTime: 1000 * 60 * 60, 
  });
}

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

export function useDownloadReport() {
  return useMutation({
    mutationFn: api.downloadReport,
    onSuccess: (blob) => {
      // Criar um link temporário para download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-links-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error('Erro ao baixar relatório:', error);
    },
  });
} 