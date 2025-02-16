import { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { RefreshCw, Clipboard, X, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getEmailAddress, checkEmails, useEmailStore, setEmailUser, forgetMe, deleteEmails } from '../utils';

export function HomePage() {
  const { 
    emailAddress, 
    sidToken, 
    emails,
    setEmailData,
    setEmails,
  } = useEmailStore();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function initialize() {
      try {
        setError(null);
        const data = await getEmailAddress();
        setEmailData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to initialize email service');
        console.error('Failed to initialize:', error);
      } finally {
        setLoading(false);
      }
    }
    initialize();
  }, []);

  useEffect(() => {
    if (!sidToken) return;

    const checkInterval = setInterval(async () => {
      try {
        const data = await checkEmails(sidToken);
        if (data.list && data.list.length > 0) {
          setEmails(data.list);
        }
      } catch (error) {
        console.error('Failed to check emails:', error);
      }
    }, 15000);

    return () => clearInterval(checkInterval);
  }, [sidToken]);

  const handleRefresh = async () => {
    if (!sidToken) return;
    try {
      setError(null);
      const data = await checkEmails(sidToken);
      if (data.list) {
        setEmails(data.list);
      }
    } catch (error) {
      setError('Failed to refresh emails');
      console.error('Failed to refresh:', error);
    }
  };

  const handleSetCustomEmail = async () => {
    if (!customEmail || !sidToken) return;
    try {
      setError(null);
      const data = await setEmailUser(sidToken, customEmail);
      setEmailData(data);
      setCustomEmail('');
      setShowCustomInput(false);
    } catch (error) {
      setError('Failed to set custom email');
      console.error('Failed to set custom email:', error);
    }
  };

  const handleForgetMe = async () => {
    if (!sidToken || !emailAddress) return;
    try {
      setError(null);
      await forgetMe(sidToken, emailAddress);
      const data = await getEmailAddress();
      setEmailData(data);
      setEmails([]);
    } catch (error) {
      setError('Failed to forget email');
      console.error('Failed to forget email:', error);
    }
  };

  const handleDeleteEmail = async (emailId: string) => {
    if (!sidToken) return;
    try {
      setError(null);
      await deleteEmails(sidToken, [emailId]);
      setEmails(emails.filter(email => email.mail_id !== emailId));
    } catch (error) {
      setError('Failed to delete email');
      console.error('Failed to delete email:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-8 h-8 text-blue-600" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">YOUR TEMP MAIL ADDRESS:</h2>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={emailAddress}
              readOnly
              className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50"
            />
            <motion.button
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Copy to clipboard"
            >
              <Clipboard className="w-6 h-6" />
            </motion.button>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-600 text-sm"
              >
                Copied!
              </motion.span>
            )}
          </div>

          {showCustomInput && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="Enter custom email prefix"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              <motion.button
                onClick={handleSetCustomEmail}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                Set
              </motion.button>
            </div>
          )}

          <div className="flex gap-2 justify-center">
            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </motion.button>
            <motion.button
              onClick={() => setShowCustomInput(!showCustomInput)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
            >
              Change
            </motion.button>
            <motion.button
              onClick={handleForgetMe}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
            >
              <X className="w-5 h-5 mr-2" />
              Remove
            </motion.button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 border-b border-gray-200">
            <div className="col-span-3 font-medium text-gray-700">SENDER</div>
            <div className="col-span-6 font-medium text-gray-700">SUBJECT</div>
            <div className="col-span-2 font-medium text-gray-700">TIME</div>
            <div className="col-span-1 font-medium text-gray-700"></div>
          </div>

          <div className="divide-y divide-gray-200">
            {emails.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No emails yet
              </div>
            ) : (
              emails.map((email) => (
                <motion.div
                  key={email.mail_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50"
                >
                  <div className="col-span-3 truncate">{email.mail_from}</div>
                  <div className="col-span-6 truncate">{email.mail_subject}</div>
                  <div className="col-span-2 text-gray-500">{email.mail_date}</div>
                  <div className="col-span-1 flex justify-end">
                    <motion.button
                      onClick={() => handleDeleteEmail(email.mail_id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}