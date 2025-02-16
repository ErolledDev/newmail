// Guerrilla Mail API client
const API_BASE = 'https://api.guerrillamail.com/ajax.php';

interface EmailAddress {
  email_addr: string;
  email_timestamp: number;
  sid_token: string;
  alias: string;
}

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

interface EmailList {
  list: Email[];
  count: string;
  email: string;
  alias: string;
  ts: number;
  sid_token: string;
}

interface EmailContent extends Email {
  mail_body: string;
  mail_recipient: string;
  content_type: string;
}

export class GuerrillaClient {
  private sidToken: string | null = null;

  private async request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const searchParams = new URLSearchParams({
      f: endpoint,
      ...params,
      ip: '127.0.0.1',
      agent: navigator.userAgent.substring(0, 160),
      ...(this.sidToken ? { sid_token: this.sidToken } : {})
    });

    const response = await fetch(`${API_BASE}?${searchParams}`);
    const data = await response.json();
    
    if (data.sid_token) {
      this.sidToken = data.sid_token;
    }

    return data;
  }

  async getEmailAddress(lang = 'en'): Promise<EmailAddress> {
    return this.request<EmailAddress>('get_email_address', { lang });
  }

  async setEmailUser(emailUser: string, lang = 'en'): Promise<EmailAddress> {
    return this.request<EmailAddress>('set_email_user', { email_user: emailUser, lang });
  }

  async checkEmail(seq = '0'): Promise<EmailList> {
    const response = await this.request<EmailList>('check_email', { seq });
    // Filter out welcome message
    if (response.list) {
      response.list = response.list.filter(email => 
        !(email.mail_from === 'no-reply@guerrillamail.com' && 
          email.mail_subject.includes('Welcome to Guerrilla Mail'))
      );
    }
    return response;
  }

  async getEmailList(offset = '0', seq = '0'): Promise<EmailList> {
    const response = await this.request<EmailList>('get_email_list', { offset, seq });
    // Filter out welcome message
    if (response.list) {
      response.list = response.list.filter(email => 
        !(email.mail_from === 'no-reply@guerrillamail.com' && 
          email.mail_subject.includes('Welcome to Guerrilla Mail'))
      );
    }
    return response;
  }

  async fetchEmail(emailId: string): Promise<EmailContent> {
    return this.request<EmailContent>('fetch_email', { email_id: emailId });
  }

  async forgetMe(emailAddr: string): Promise<boolean> {
    return this.request<boolean>('forget_me', { email_addr });
  }

  async deleteEmail(emailIds: string[]): Promise<{ deleted_ids: string[] }> {
    const params: Record<string, string> = {};
    emailIds.forEach((id, index) => {
      params[`email_ids[${index}]`] = id;
    });
    return this.request('del_email', params);
  }
}