export type YouTubeQuality = 'default' | 'medium' | 'high' | 'maxres';

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeThumbnailResponse {
  videoId: string;
  thumbnails: Record<YouTubeQuality, YouTubeThumbnail>;
}

export interface ThumbnailError {
  message: string;
  code?: string;
}
