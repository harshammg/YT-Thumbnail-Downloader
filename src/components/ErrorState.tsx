import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass rounded-2xl p-8 shadow-card text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center"
        >
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </motion.div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-muted-foreground mb-6">
          {message}
        </p>
        
        <Button variant="glass" onClick={onRetry}>
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      </div>
    </motion.div>
  );
}
