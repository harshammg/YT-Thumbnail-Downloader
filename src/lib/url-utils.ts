export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const YOUTUBE_PATTERNS = [
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?(youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
];

export function isYouTubeUrl(url: string): boolean {
  const trimmedUrl = url.trim();
  if (!trimmedUrl) return false;
  
  return YOUTUBE_PATTERNS.some(pattern => pattern.test(trimmedUrl));
}

export function validateUrl(url: string): ValidationResult {
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) {
    return {
      isValid: false,
      error: 'Please enter a URL',
    };
  }
  
  if (!isYouTubeUrl(trimmedUrl)) {
    if (trimmedUrl.includes('youtube') || trimmedUrl.includes('youtu.be')) {
      return {
        isValid: false,
        error: 'Invalid YouTube URL format. Please use a valid video link.',
      };
    }
    
    return {
      isValid: false,
      error: 'Please enter a valid YouTube URL',
    };
  }
  
  return {
    isValid: true,
  };
}

export function extractVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match && match[4]) {
      return match[4];
    }
  }
  
  return null;
}
