import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export function PrivacyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy - Temp Mail | SnapMails"
        description="Learn about how we protect your privacy at SnapMails."
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4 mb-8">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="space-y-6 text-gray-600">
            <p>
              At SnapMails, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, and protect your information.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p>We collect minimal information necessary to provide our temporary email service:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Temporary email addresses generated</li>
                <li>Email messages received during the session</li>
                <li>Basic usage statistics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p>The information we collect is used solely to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide temporary email services</li>
                <li>Maintain and improve our service</li>
                <li>Prevent abuse of our system</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p>
                All temporary email addresses and messages are automatically deleted after 24 hours. 
                We do not maintain any permanent records of email content or addresses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security</h2>
              <p>
                We implement industry-standard security measures to protect your information during 
                transmission and storage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@snapmails.com
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Last updated: March 2025
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}