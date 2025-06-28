import { CreateLinkRequest, CreateLinkResponse, ListLinksResponse } from '@/types/link';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const api = {
  async createLink(data: CreateLinkRequest): Promise<CreateLinkResponse> {
    const response = await fetch(`${API_BASE_URL}/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return handleResponse<CreateLinkResponse>(response);
  },

  async listLinks(): Promise<ListLinksResponse> {
    const response = await fetch(`${API_BASE_URL}/links`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<ListLinksResponse>(response);
  },

  async incrementAccess(shortUrl: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/link/${shortUrl}/access`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.error || `HTTP error! status: ${response.status}`);
    }
  },

  async getOriginalUrl(shortUrl: string): Promise<{ originalUrl: string }> {
    const response = await fetch(`${API_BASE_URL}/link/${shortUrl}`, {
      method: 'GET',
    });

    return handleResponse<{ originalUrl: string }>(response);
  },

  async deleteLink(shortUrl: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/link/${shortUrl}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.error || `HTTP error! status: ${response.status}`);
    }
  },

  async downloadReport(): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/links/report`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.blob();
  },
}; 