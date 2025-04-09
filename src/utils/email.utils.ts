// src/utils/email.utils.ts
import sgMail from '@sendgrid/mail';
import { config } from '@config/index';

// Initialize SendGrid with API key
sgMail.setApiKey(config.sendgrid.apiKey);

interface EmailData {
  to: string;
  subject: string;
  templateId: string;
  dynamicTemplateData: Record<string, any>;
}

/**
 * Send an email using SendGrid with dynamic template
 */
export const sendTemplateEmail = async (
  emailData: EmailData,
): Promise<boolean> => {
  try {
    const msg = {
      to: emailData.to,
      from: config.sendgrid.fromEmail,
      subject: emailData.subject,
      templateId: emailData.templateId,
      dynamicTemplateData: emailData.dynamicTemplateData,
    };
    console.log('Sending email', msg);
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', JSON.stringify(error));
    return false;
  }
};

/**
 * Send password recovery email
 */
export const sendPasswordRecoveryEmail = async (
  email: string,
  resetToken: string,
  userName: string,
): Promise<boolean> => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  return sendTemplateEmail({
    to: email,
    subject: config.sendgrid.subjects.passwordRecovery,
    templateId: config.sendgrid.templates.passwordRecovery,
    dynamicTemplateData: {
      name: userName,
      reset_link: resetLink,
      expiry_hours: 24, // Token validity in hours
    },
  });
};

export const sendEmailVerificationCode = async (
  email: string,
  verificationCode: string,
  userName: string,
): Promise<boolean> => {
  return sendTemplateEmail({
    to: email,
    subject: config.sendgrid.subjects.emailVerification,
    templateId: config.sendgrid.templates.emailVerification, // Add this to your config
    dynamicTemplateData: {
      name: userName,
      verification_code: verificationCode,
      expiry_hours: 24, // Code validity in hours
    },
  });
};
