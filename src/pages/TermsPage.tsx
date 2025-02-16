import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

export function TermsPage() {
  return (
    <>
      <SEO 
        title="Terms of Service - Temp Mail | SnapMails"
        description="Read our terms of service to understand how you can use SnapMails temporary email service."
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4 mb-8">
            <Scale className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          </div>

          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Terms</h2>
              <p>
                By accessing SnapMails, you agree to be bound by these terms of service and agree that 
                you are responsible for compliance with any applicable local laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily use SnapMails for personal, non-commercial transitory 
                viewing only.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>The service must not be used for illegal activities</li>
                <li>You must not modify or copy the materials</li>
                <li>You must not use the materials for any commercial purpose</li>
                <li>You must not attempt to decompile or reverse engineer any software</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
              <p>
                The materials on SnapMails are provided on an 'as is' basis. SnapMails makes no 
                warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                including, without limitation, implied warranties or conditions of merchantability, 
                fitness for a particular purpose, or non-infringement of intellectual property or other 
                violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
              <p>
                In no event shall SnapMails or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use SnapMails.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Revisions</h2>
              <p>
                The materials appearing on SnapMails could include technical, typographical, or 
                photographic errors. SnapMails does not warrant that any of the materials on its 
                website are accurate, complete or current. SnapMails may make changes to the materials 
                contained on its website at any time without notice.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}