export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
  provider: 'firebase' | 'local';
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  color: string;
  progressPercent: number;
  feedback: string[];
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export interface AuthError {
  code: string;
  message: string;
}
