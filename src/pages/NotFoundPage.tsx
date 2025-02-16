import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <SEO 
        title="404 - Page Not Found | SnapMails"
        description="The page you're looking for doesn't exist."
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md text-center"
        >
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Return Home
          </a>
        </motion.div>
      </div>
    </>
  );
}