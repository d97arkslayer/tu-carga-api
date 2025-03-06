// src/utils/verification.utils.ts
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const isVerificationCodeExpired = (expiryDate: Date | null): boolean => {
  if (!expiryDate) return true;
  return new Date() > expiryDate;
};
