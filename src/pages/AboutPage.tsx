import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';

export function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us - Temp Mail | SnapMails"
        description="Learn about SnapMails and our mission to protect your privacy with temporary email addresses."
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About SnapMails</h1>
          <div className="space-y-6 text-gray-600">
            <p>
              SnapMails is a free temporary email service designed to help protect your privacy online. 
              We believe that everyone has the right to keep their personal email address private and 
              secure from spam and unwanted communications.
            </p>
            <p>
              Our service provides instant, disposable email addresses that you can use to sign up for 
              services, download content, or receive one-time communications without exposing your 
              personal email address.
            </p>
            <p>
              Founded in 2023, SnapMails has helped thousands of users protect their privacy online. 
              Our commitment to security, ease of use, and reliability has made us a trusted choice 
              for temporary email services.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to provide a simple, secure, and reliable temporary email service that 
              helps protect user privacy online. We strive to make email privacy accessible to everyone, 
              without complicated setup processes or technical barriers.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose SnapMails?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>No registration required</li>
              <li>Instant access to temporary email addresses</li>
              <li>Completely free service</li>
              <li>Mobile-friendly interface</li>
              <li>Secure and anonymous</li>
              <li>24/7 availability</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  );
}