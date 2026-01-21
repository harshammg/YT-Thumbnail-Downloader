import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, AlertCircle, Loader2, Sparkles, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validateUrl, isYouTubeUrl } from '@/lib/url-utils';

interface LinkInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function LinkInput({ onSubmit, isLoading }: LinkInputProps) {
  const [url, setUrl] = useState('');
  const [isValidYouTube, setIsValidYouTube] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = useCallback((value: string) => {
    setUrl(value);
    setError(null);
    setIsValidYouTube(isYouTubeUrl(value));
  }, []);

  const handleSubmit = useCallback(() => {
    const validation = validateUrl(url);
    
    if (!validation.isValid) {
      setError(validation.error || 'Invalid URL');
      return;
    }
    
    onSubmit(url);
  }, [url, onSubmit]);

  const handleClear = useCallback(() => {
    setUrl('');
    setError(null);
    setIsValidYouTube(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  }, [handleSubmit, isLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass rounded-2xl p-2 shadow-card">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Link2 className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste YouTube video URL..."
              className="w-full h-12 pl-12 pr-24 bg-secondary/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={isLoading}
            />
            <AnimatePresence>
              {isValidYouTube && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg gradient-youtube text-white text-xs font-medium">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex gap-2 sm:w-auto w-full">
            <Button
              variant="youtube"
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading || !url.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Get Thumbnail</span>
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleClear}
              disabled={isLoading || !url.trim()}
              className="px-4"
            >
              <span>Clear</span>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 flex items-center gap-2 text-destructive text-sm px-1"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
