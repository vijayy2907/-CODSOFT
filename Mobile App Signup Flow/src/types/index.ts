export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export interface StoredCredentials {
  email: string;
  rememberMe: boolean;
}

export type SocialProvider = 'facebook' | 'twitter' | 'google';
