export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string; // URL for the thumbnail
  backdrop?: string; // URL for the large hero image
  category?: string;
  matchScore?: number; // AI match score
  year?: number;
  duration?: string;
  type?: 'movie' | 'series';
  isOriginal?: boolean;
  videoId?: string; // YouTube ID for the player
}

export interface Brand {
  id: string;
  name: string;
  videoUrl?: string; // Optional hover video
  image: string; // Static gradient/image
  colorStart: string;
  colorEnd: string;
  filterCategory?: string; // Category to filter by when clicked
}

export enum ViewState {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  WATCHLIST = 'WATCHLIST',
  MOVIES = 'MOVIES',
  SERIES = 'SERIES',
  ORIGINALS = 'ORIGINALS',
  CATALOGUE = 'CATALOGUE', // Generic filtered view (e.g. for Brands)
  PLAYER = 'PLAYER', // Video player view
}

// Gemini specific types for JSON schema
export interface AIRecognitionResponse {
  recommendations: {
    title: string;
    description: string;
    genre: string;
    visualKey: string; // To pick a placeholder image
  }[];
}