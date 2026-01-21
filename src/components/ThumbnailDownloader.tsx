import { AnimatePresence, motion } from 'framer-motion';
import { LinkInput } from '@/components/LinkInput';
import { ThumbnailPreview } from '@/components/ThumbnailPreview';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { useThumbnail } from '@/hooks/useThumbnail';

export function ThumbnailDownloader() {
  const {
    isLoading,
    error,
    data,
    fetchThumbnail,
    reset,
  } = useThumbnail();

  const handleSubmit = (url: string) => {
    fetchThumbnail(url);
  };

  return (
    <div className="space-y-8">
      <LinkInput onSubmit={handleSubmit} isLoading={isLoading} />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingState />
          </motion.div>
        )}

        {error && !isLoading && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ErrorState message={error} onRetry={reset} />
          </motion.div>
        )}

        {data && !isLoading && !error && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ThumbnailPreview data={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
