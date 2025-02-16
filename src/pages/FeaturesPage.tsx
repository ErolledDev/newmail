import { SEO } from '../components/SEO';
import { Shield, Zap, Clock, Lock, RefreshCw, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Privacy Protection',
    description: 'Keep your personal email address private and protect yourself from spam and unwanted communications.'
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'No registration required. Get your temporary email address instantly and start receiving emails right away.'
  },
  {
    icon: Clock,
    title: 'Auto-Refresh',
    description: 'Emails are automatically refreshed every 15 seconds, ensuring you never miss important messages.'
  },
  {
    icon: Lock,
    title: 'Secure & Anonymous',
    description: 'Your temporary email address is completely anonymous and secure. No personal information required.'
  },
  {
    icon: RefreshCw,
    title: 'Custom Email Address',
    description: 'Choose your own custom email prefix for a more personalized temporary email address.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Access your temporary email from any device with our responsive, mobile-friendly interface.'
  }
];

export function FeaturesPage() {
  return (
    <>
      <SEO 
        title="Features - Temp Mail | SnapMails"
        description="Discover the powerful features of SnapMails temporary email service. Instant access, privacy protection, and more."
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Features</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}