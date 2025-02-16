import React from 'react';
import { Shield, Clock, Lock, RefreshCw, Mail, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "Privacy Protection",
      description: "Keep your real email address private and protect yourself from spam and unwanted subscriptions."
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Instant Access",
      description: "Get a temporary email address immediately with no registration or personal information required."
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      title: "Secure Service",
      description: "Our service is built with security in mind, ensuring your temporary emails are protected."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-500" />,
      title: "Auto Refresh",
      description: "Emails are automatically checked and displayed in real-time as they arrive."
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: "Clean Interface",
      description: "User-friendly design makes it easy to read and manage your temporary emails."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Fast & Reliable",
      description: "High-performance infrastructure ensures your temporary email service is always available."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover all the powerful features that make TempMail Pro the best choice for temporary email services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-8">
          Try TempMail Pro now and experience the best temporary email service available.
        </p>
        <a href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Get Started
        </a>
      </div>
    </div>
  );
}