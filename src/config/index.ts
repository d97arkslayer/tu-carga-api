// src/config/index.ts

import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret:
    process.env.JWT_SECRET || 'your-default-secret-key-for-development',
  // Add other configuration values as needed
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@tucarga.com.co',
    templates: {
      passwordRecovery:
        process.env.SENDGRID_PASSWORD_RECOVERY_TEMPLATE ||
        'd-799def9869d14b1ca155db7ec8d9b484',
      emailVerification:
        process.env.SENDGRID_EMAIL_VERIFICATION_TEMPLATE ||
        'd-3b0436e0f13140ab914d4387245c4181',
    },
    subjects: {
      passwordRecovery: 'Restablecimiento de Contraseña - TuCarga',
      emailVerification: 'Verificación de Correo Electrónico - TuCarga',
    },
  },
};
