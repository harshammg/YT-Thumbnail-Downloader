import { useState, useCallback } from 'react';
import type { YouTubeThumbnailResponse } from '@/types/thumbnail';
import { extractVideoId } from '@/lib/url-utils';

interface UseThumbnailState {
  isLoading: boolean;
  error: string | null;
  data: YouTubeThumbnailResponse | null;
}

// Generate YouTube thumbnail URLs using public patterns
function generateYouTubeThumbnails(videoId: string): YouTubeThumbnailResponse {
  return {
    videoId,
    thumbnails: {
      default: {
        url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        width: 120,
        height: 90,
      },
      medium: {
        url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        width: 320,
        height: 180,
      },
      high: {
        url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        width: 480,
        height: 360,
      },
      maxres: {
        url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        width: 1280,
        height: 720,
      },
    },
  };
}

export function useThumbnail() {
  const [state, setState] = useState<UseThumbnailState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const fetchThumbnail = useCallback(async (url: string) => {
    setState({
      isLoading: true,
      error: null,
      data: null,
    });

    try {
      const videoId = extractVideoId(url);
      
      if (!videoId) {
        throw new Error('Could not extract video ID from URL');
      }

      // Simulate a brief loading state for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const thumbnailData = generateYouTubeThumbnails(videoId);
      
      setState({
        isLoading: false,
        error: null,
        data: thumbnailData,
      });
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch thumbnail',
        data: null,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      data: null,
    });
  }, []);

  return {
    ...state,
    fetchThumbnail,
    reset,
  };
}
