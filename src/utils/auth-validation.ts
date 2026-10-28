import { PasswordStrength, SignUpFormData, LoginFormData, ResetPasswordFormData } from '../types/auth';

/**
 * Validates email format according to standard RFC specifications
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Evaluates password strength and returns score, label, color, and actionable tips
 */
export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: 'Very Weak',
      color: '#ef4444',
      progressPercent: 0,
      feedback: ['Enter a password to check strength']
    };
  }

  let score = 0;
  const feedback: string[] = [];

  // Length checks
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Use at least 8 characters');
  }

  if (password.length >= 12) {
    score += 1;
  }

  // Complexity checks
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (hasLower && hasUpper) {
    score += 1;
  } else {
    feedback.push('Include both uppercase and lowercase letters');
  }

  if (hasNumber) {
    score += 0.5;
  } else {
    feedback.push('Include at least one number');
  }

  if (hasSpecial) {
    score += 0.5;
  } else {
    feedback.push('Include at least one special character (e.g. !@#$%)');
  }

  // Normalize score between 0 and 4
  const finalScore = Math.min(4, Math.floor(score));

  switch (finalScore) {
    case 0:
    case 1:
      return {
        score: finalScore,
        label: 'Weak',
        color: '#ef4444', // red-500
        progressPercent: Math.max(15, (finalScore + 1) * 20),
        feedback: feedback.length ? feedback : ['Consider adding varied characters']
      };
    case 2:
      return {
        score: 2,
        label: 'Fair',
        color: '#f59e0b', // amber-500
        progressPercent: 55,
        feedback: feedback.length ? feedback : ['Add more characters or symbols']
      };
    case 3:
      return {
        score: 3,
        label: 'Strong',
        color: '#3b82f6', // blue-500
        progressPercent: 80,
        feedback: feedback.length ? feedback : ['Great password!']
      };
    case 4:
    default:
      return {
        score: 4,
        label: 'Very Strong',
        color: '#10b981', // emerald-500
        progressPercent: 100,
        feedback: ['Excellent! Password meets top security standards.']
      };
  }
}

/**
 * Validates registration form inputs
 */
export function validateSignUpForm(data: SignUpFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!data.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates login form inputs
 */
export function validateLoginForm(data: LoginFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates reset password form inputs
 */
export function validateResetPasswordForm(data: ResetPasswordFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (data.newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters';
  }

  if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Generates a mock time-limited password reset token for client/offline demo flows
 * Token expires in 15 minutes
 */
export function generateMockResetToken(email: string): string {
  const expiresAt = Date.now() + 15 * 60 * 1000;
  const payload = JSON.stringify({ email: email.toLowerCase().trim(), exp: expiresAt, nonce: Math.random().toString(36).substring(2, 10) });
  return btoa(payload);
}

/**
 * Validates a mock reset token
 */
export function validateResetToken(token: string): { isValid: boolean; email?: string; error?: string } {
  try {
    const jsonStr = atob(token);
    const parsed = JSON.parse(jsonStr);
    if (!parsed.email || !parsed.exp) {
      return { isValid: false, error: 'Malformed reset token' };
    }
    if (Date.now() > parsed.exp) {
      return { isValid: false, error: 'Reset token has expired (valid for 15 minutes)' };
    }
    return { isValid: true, email: parsed.email };
  } catch {
    return { isValid: false, error: 'Invalid or corrupted reset token' };
  }
}
