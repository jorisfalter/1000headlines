export interface Headline {
  id: string;
  media: string;
  headline: string;
  brand: string;
  createdAt: string;
}

export interface Industry {
  id: string;
  name: string;
  count: number;
}

export interface Platform {
  id: string;
  name: string;
  count: number;
}

export type MediaType = 
  | 'Print'
  | 'Facebook Ad'
  | 'Google Ad'
  | 'Blog'
  | 'Billboard'
  | 'Google Search Results'; 