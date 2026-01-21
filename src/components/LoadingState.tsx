import { motion } from 'framer-motion';

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass rounded-2xl overflow-hidden shadow-card">
        {/* Skeleton Image */}
        <div className="aspect-video bg-secondary/30 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Skeleton Controls */}
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-16 bg-secondary/50 rounded animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-14 w-20 bg-secondary/30 rounded-lg animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
          <div className="h-14 w-full bg-secondary/30 rounded-xl animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
