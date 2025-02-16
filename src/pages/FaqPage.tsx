import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is a temporary email address?',
    answer: 'A temporary email address is a disposable email address that you can use to receive emails without revealing your personal email address. It\'s perfect for signing up for services, downloading content, or receiving one-time communications.'
  },
  {
    question: 'How long does the temporary email address last?',
    answer: 'Your temporary email address remains active as long as you keep the browser window open. Once you close the window or click the "Remove" button, the email address is deleted and all emails are permanently removed.'
  },
  {
    question: 'Is this service completely free?',
    answer: 'Yes! SnapMails is completely free to use. There are no hidden fees or premium features.'
  },
  {
    question: 'Can I send emails from my temporary address?',
    answer: 'No, this service is for receiving emails only. You cannot send emails from your temporary email address.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take security seriously. We don\'t store any personal information, and all emails are automatically deleted when you close your session.'
  },
  {
    question: 'Can I create multiple email addresses?',
    answer: 'Yes, you can create a new temporary email address by clicking the "Remove" button and then refreshing the page.'
  }
];

export function FaqPage() {
  return (
    <>
      <SEO 
        title="FAQ - Temp Mail | SnapMails"
        description="Find answers to frequently asked questions about SnapMails temporary email service."
      />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <HelpCircle className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}