import { create } from 'zustand';

interface Email {
  mail_id: string;
  mail_from: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_timestamp: string;
  mail_read: string;
  mail_date: string;
  att: string;
}

interface EmailState {
  emailAddress: string;
  emailTimestamp: number;
  sidToken: string;
  emails: Email[];
  setEmailData: (data: any) => void;
  setEmails: (emails: Email[]) => void;
  addEmails: (emails: Email[]) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
  emailAddress: '',
  emailTimestamp: 0,
  sidToken: '',
  emails: [],
  setEmailData: (data) => set({
    emailAddress: data.email_addr,
    emailTimestamp: data.email_timestamp,
    sidToken: data.sid_token
  }),
  setEmails: (emails) => set({ 
    emails: emails.filter(email => !email.mail_subject.includes('Welcome to Guerrilla Mail')) 
  }),
  addEmails: (emails) => set((state) => ({ 
    emails: [...state.emails, ...emails.filter(email => !email.mail_subject.includes('Welcome to Guerrilla Mail'))]
  }))
}));

const API_BASE = 'https://api.guerrillamail.com/ajax.php';

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  if (error instanceof Error) {
    throw new Error(`API request failed: ${error.message}`);
  }
  throw new Error('API request failed');
};

export async function getEmailAddress() {
  try {
    const response = await fetch(`${API_BASE}?f=get_email_address&lang=en&ip=127.0.0.1&agent=Mozilla/5.0`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.email_addr) {
      throw new Error('Invalid response from server');
    }
    return data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function checkEmails(sidToken: string, seq: number = 0) {
  try {
    const response = await fetch(
      `${API_BASE}?f=check_email&seq=${seq}&sid_token=${sidToken}&ip=127.0.0.1&agent=Mozilla/5.0`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchEmail(sidToken: string, emailId: string) {
  try {
    const response = await fetch(
      `${API_BASE}?f=fetch_email&email_id=${emailId}&sid_token=${sidToken}&ip=127.0.0.1&agent=Mozilla/5.0`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function setEmailUser(sidToken: string, emailUser: string) {
  try {
    const response = await fetch(
      `${API_BASE}?f=set_email_user&email_user=${emailUser}&sid_token=${sidToken}&lang=en&ip=127.0.0.1&agent=Mozilla/5.0`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function forgetMe(sidToken: string, emailAddr: string) {
  try {
    const response = await fetch(
      `${API_BASE}?f=forget_me&sid_token=${sidToken}&email_addr=${emailAddr}&ip=127.0.0.1&agent=Mozilla/5.0`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteEmails(sidToken: string, emailIds: string[]) {
  try {
    const queryString = emailIds.map(id => `email_ids[]=${id}`).join('&');
    const response = await fetch(
      `${API_BASE}?f=del_email&${queryString}&sid_token=${sidToken}&ip=127.0.0.1&agent=Mozilla/5.0`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
}