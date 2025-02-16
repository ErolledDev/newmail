import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Code2, Key, Lock } from 'lucide-react';

export function ApiPage() {
  return (
    <>
      <SEO 
        title="API Documentation - Temp Mail | SnapMails"
        description="Integrate SnapMails temporary email service into your applications with our simple and powerful API."
      />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4 mb-8">
            <Code2 className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">API Documentation</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Getting Started</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our API allows you to integrate temporary email functionality into your applications.
                Follow these simple steps to get started.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <Key className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Authentication</h3>
                  <p className="text-gray-600 dark:text-gray-300">No API key required for basic usage.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Endpoints</h2>
              <div className="space-y-6">
                <div className="border dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Get Email Address</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                    GET /ajax.php?f=get_email_address
                  </pre>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Returns a new temporary email address.
                  </p>
                </div>

                <div className="border dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Check Emails</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                    GET /ajax.php?f=check_email&sid_token="{'{sid_token}'}"
                  </pre>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Checks for new emails in the inbox. The sid_token is returned from the get_email_address call.
                  </p>
                </div>

                <div className="border dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Set Custom Email</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                    GET /ajax.php?f=set_email_user&email_user="{'{email_user}'}"&sid_token="{'{sid_token}'}"
                  </pre>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Sets a custom email address prefix. The sid_token is returned from the get_email_address call.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Rate Limits</h2>
              <div className="flex items-center space-x-4">
                <Lock className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please be mindful of our rate limits:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                    <li>100 requests per minute per IP</li>
                    <li>1000 requests per hour per IP</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}