export interface Link {
  shortUrl: string;
  originalUrl: string;
  accessCount: number;
  createdAt: Date;
}

export type CreateLinkData = Omit<Link, 'createdAt' | 'accessCount'>;