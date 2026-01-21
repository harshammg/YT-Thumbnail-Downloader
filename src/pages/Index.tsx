import { motion } from 'framer-motion';
import { Youtube, ArrowDown, Image } from 'lucide-react';
import { ThumbnailDownloader } from '@/components/ThumbnailDownloader';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >


          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            YouTube Thumbnail{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Downloader
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Download high-quality thumbnails from any YouTube video in seconds.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Paste a YouTube link below to get started</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.div>
        </motion.div>

        {/* Main Downloader */}
        <ThumbnailDownloader />

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 md:mt-28"
        >
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Multiple Qualities',
                description: 'Choose from default to max resolution (1280×720)',
              },
              {
                title: 'Live Preview',
                description: 'See all thumbnail sizes before downloading',
              },
              {
                title: 'One-Click Download',
                description: 'Save thumbnails directly to your device',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass rounded-xl p-6 text-center hover:scale-[1.02] transition-transform"
              >
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-muted-foreground">
        <p>Free YouTube thumbnail downloader • No registration required</p>
      </footer>
    </div>
  );
};

export default Index;
