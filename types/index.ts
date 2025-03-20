export interface Headline {
  id: string;
  platform: string;
  title: string;
  industry: string;
  date: string;
  views: number;
  saves: number;
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