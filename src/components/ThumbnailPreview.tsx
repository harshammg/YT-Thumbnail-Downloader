import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { YouTubeThumbnailResponse, YouTubeQuality } from '@/types/thumbnail';

interface ThumbnailPreviewProps {
  data: YouTubeThumbnailResponse;
}

const qualityLabels: Record<YouTubeQuality, { label: string; resolution: string }> = {
  default: { label: 'Default', resolution: '120×90' },
  medium: { label: 'Medium', resolution: '320×180' },
  high: { label: 'High', resolution: '480×360' },
  maxres: { label: 'Max Resolution', resolution: '1280×720' },
};

const qualityOrder: YouTubeQuality[] = ['default', 'medium', 'high', 'maxres'];

export function ThumbnailPreview({ data }: ThumbnailPreviewProps) {
  const [selectedQuality, setSelectedQuality] = useState<YouTubeQuality>('maxres');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const imageUrl = data.thumbnails[selectedQuality].url;
      const filename = `youtube-thumbnail-${data.videoId}-${selectedQuality}.jpg`;

      // Fetch the image and create a blob for download
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const currentThumbnail = data.thumbnails[selectedQuality];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="glass rounded-2xl overflow-hidden shadow-card">
        {/* Main Preview Section */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>Thumbnail Preview</span>
          </div>

          {/* Large Preview Image */}
          <div className="relative aspect-video bg-secondary/30 rounded-xl overflow-hidden">
            <motion.img
              key={currentThumbnail.url}
              src={currentThumbnail.url}
              alt="YouTube thumbnail preview"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Quality Selection Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Select Quality</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {qualityOrder.map((quality) => {
                const thumb = data.thumbnails[quality];
                const info = qualityLabels[quality];
                const isSelected = selectedQuality === quality;

                return (
                  <motion.button
                    key={quality}
                    onClick={() => setSelectedQuality(quality)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Thumbnail Preview */}
                    <div className="aspect-video bg-secondary/50">
                      <img
                        src={thumb.url}
                        alt={`${info.label} quality`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Quality Label */}
                    <div className={`p-2 text-center ${isSelected ? 'bg-primary/20' : 'bg-secondary/50'}`}>
                      <p className="text-xs font-medium text-foreground">{info.label}</p>
                      <p className="text-[10px] text-muted-foreground">{info.resolution}</p>
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="selected-quality"
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                        initial={false}
                      >
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Download Button */}
          <Button
            variant="youtube"
            size="xl"
            className="w-full"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span>Downloaded!</span>
              </>
            ) : isDownloading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline-block">Download {qualityLabels[selectedQuality].label} ({qualityLabels[selectedQuality].resolution})</span>
                <span className="sm:hidden">Download {qualityLabels[selectedQuality].label}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
