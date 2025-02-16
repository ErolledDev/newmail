import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mail, RefreshCw, Trash2, Copy, Edit2, Moon, Sun } from 'lucide-react';
import { GuerrillaClient } from '../lib/guerrilla';

interface Email {
  mail_id: string;
  mail_from: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_timestamp: string;
  mail_read: string;
  mail_date: string;
  mail_body?: string;
}

const REFRESH_INTERVAL = 15000; // 15 seconds
const EMAIL_STORAGE_KEY = 'tempmail_email';
const EMAILS_STORAGE_KEY = 'tempmail_emails';
const THEME_STORAGE_KEY = 'tempmail_theme';

const EMAIL_DOMAINS = [
  '@sharklasers.com',
  '@guerrillamailblock.com',
  '@guerrillamail.com',
  '@guerrillamail.info',
  '@grr.la',
  '@guerrillamail.biz',
  '@guerrillamail.de',
  '@guerrillamail.net',
  '@guerrillamail.org',
  '@pokemail.net',
  '@spam.me'
];

export default function EmailBox() {
  const [client] = useState(() => new GuerrillaClient());
  const [emailAddress, setEmailAddress] = useState('');
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newEmailUser, setNewEmailUser] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(EMAIL_DOMAINS[0]);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved ? JSON.parse(saved) : false;
  });
  const refreshTimerRef = useRef<number>();
  const lastCheckRef = useRef<number>(0);

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Load saved email and emails from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
    const savedEmails = localStorage.getItem(EMAILS_STORAGE_KEY);
    
    if (savedEmail) {
      setEmailAddress(savedEmail);
      setNewEmailUser(savedEmail.split('@')[0]);
    }
    
    if (savedEmails) {
      try {
        setEmails(JSON.parse(savedEmails));
      } catch (e) {
        console.error('Failed to parse saved emails:', e);
      }
    }
  }, []);

  // Save email and emails to localStorage when they change
  useEffect(() => {
    if (emailAddress) {
      localStorage.setItem(EMAIL_STORAGE_KEY, emailAddress);
    }
    if (emails.length > 0) {
      localStorage.setItem(EMAILS_STORAGE_KEY, JSON.stringify(emails));
    }
  }, [emailAddress, emails]);

  const checkEmails = useCallback(async (showLoading = false) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      
      // Don't check more often than every 5 seconds
      const now = Date.now();
      if (now - lastCheckRef.current < 5000) {
        return;
      }
      lastCheckRef.current = now;

      const response = await client.checkEmail();
      setEmails(prevEmails => {
        // Merge new emails with existing ones, avoiding duplicates and welcome messages
        const emailMap = new Map(prevEmails.map(email => [email.mail_id, email]));
        response.list
          .filter(email => !email.mail_from.includes('no-reply@guerrillamail.com'))
          .forEach(email => emailMap.set(email.mail_id, email));
        return Array.from(emailMap.values()).sort((a, b) => 
          Number(b.mail_timestamp) - Number(a.mail_timestamp)
        );
      });
    } catch (error) {
      console.error('Failed to check emails:', error);
      setError('Failed to check emails. Please try again.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [client]);

  // Set up auto-refresh
  useEffect(() => {
    refreshTimerRef.current = window.setInterval(() => {
      checkEmails(false);
    }, REFRESH_INTERVAL);

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [checkEmails]);

  const initializeEmail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await client.getEmailAddress();
      setEmailAddress(response.email_addr);
      setNewEmailUser(response.email_addr.split('@')[0]);
      await checkEmails(false);
    } catch (error) {
      console.error('Failed to initialize email:', error);
      setError('Failed to initialize email. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeEmail();
  }, []);

  const handleEmailClick = async (email: Email) => {
    try {
      setError(null);
      const fullEmail = await client.fetchEmail(email.mail_id);
      setSelectedEmail({ ...email, mail_body: fullEmail.mail_body });
    } catch (error) {
      console.error('Failed to fetch email:', error);
      setError('Failed to fetch email content. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
  };

  const handleRefresh = () => {
    checkEmails(true);
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const emailWithDomain = `${newEmailUser}${selectedDomain}`;
      const response = await client.setEmailUser(newEmailUser);
      setEmailAddress(response.email_addr);
      setIsEditing(false);
      checkEmails(false);
    } catch (error) {
      console.error('Failed to change email:', error);
      setError('Failed to change email address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const themeClass = isDarkMode ? 'dark' : '';

  return (
    <div className={`${themeClass} transition-colors duration-200`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">Your temporary email address:</div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                title="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleRefresh} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" 
                title="Refresh"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={handleCopy} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" 
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsEditing(true)} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" 
                title="Change Email"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleEmailChange} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newEmailUser}
                  onChange={(e) => setNewEmailUser(e.target.value)}
                  className="flex-1 px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter new email username"
                />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {EMAIL_DOMAINS.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="font-mono text-lg dark:text-white">{emailAddress}</div>
          )}
          
          {error && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
          <div className="border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            {emails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <Mail className="w-12 h-12 mb-2" />
                <p>No emails yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Checking for new emails automatically...
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {emails.map((email) => (
                  <button
                    key={email.mail_id}
                    onClick={() => handleEmailClick(email)}
                    className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedEmail?.mail_id === email.mail_id ? 'bg-blue-50 dark:bg-blue-900' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium truncate flex-1 dark:text-white">
                        {email.mail_from}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        {email.mail_date}
                      </div>
                    </div>
                    <div className="text-sm font-medium truncate mb-1 dark:text-gray-200">
                      {email.mail_subject}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {email.mail_excerpt}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-y-auto bg-white dark:bg-gray-800">
            {selectedEmail ? (
              <div className="p-4">
                <div className="mb-4">
                  <div className="font-medium mb-2 dark:text-white">
                    {selectedEmail.mail_subject}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    From: {selectedEmail.mail_from}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Date: {selectedEmail.mail_date}
                  </div>
                </div>
                <iframe
                  srcDoc={selectedEmail.mail_body}
                  className="w-full min-h-[400px] border-0 dark:bg-white"
                  title="Email Content"
                  sandbox="allow-same-origin"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <Mail className="w-12 h-12 mb-2" />
                <p>Select an email to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}