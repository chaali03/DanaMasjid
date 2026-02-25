import fs from 'fs';
import path from 'path';

interface EmailTemplate {
  subject: string;
  html: string;
}

interface MasjidRegistrationData {
  masjidName?: string;
  email: string;
  registrationUrl: string;
  helpUrl?: string;
  privacyUrl?: string;
  termsUrl?: string;
}

export class EmailService {
  private static loadTemplate(templateName: string): string {
    const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
    return fs.readFileSync(templatePath, 'utf-8');
  }

  private static replaceVariables(template: string, variables: Record<string, string>): string {
    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    });
    return result;
  }

  static getMasjidRegistrationWelcomeEmail(data: MasjidRegistrationData): EmailTemplate {
    const template = this.loadTemplate('masjid-registration-welcome');
    
    const variables = {
      registration_url: data.registrationUrl,
      help_url: data.helpUrl || 'https://danamasjid.com/bantuan',
      privacy_url: data.privacyUrl || 'https://danamasjid.com/privacy',
      terms_url: data.termsUrl || 'https://danamasjid.com/terms',
    };

    const html = this.replaceVariables(template, variables);

    return {
      subject: '🕌 Selamat Datang di DanaMasjid - GRATIS 3 Bulan Pertama!',
      html,
    };
  }

  // Method untuk mengirim email (implementasi tergantung email provider yang digunakan)
  static async sendEmail(to: string, template: EmailTemplate): Promise<void> {
    // TODO: Implementasi dengan email provider (Nodemailer, SendGrid, AWS SES, dll)
    console.log('Sending email to:', to);
    console.log('Subject:', template.subject);
    console.log('HTML length:', template.html.length);
    
    // Contoh dengan Nodemailer (uncomment jika sudah install nodemailer):
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"DanaMasjid" <noreply@danamasjid.com>',
      to,
      subject: template.subject,
      html: template.html,
    });
    */
  }
}
