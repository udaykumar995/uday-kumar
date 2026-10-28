import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Flame,
  ShieldCheck,
  Key,
  ExternalLink,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  evaluatePasswordStrength,
  validateSignUpForm,
  validateLoginForm,
  validateResetPasswordForm
} from '../utils/auth-validation';

export type AuthView = 'login' | 'signup' | 'forgot' | 'reset-password' | 'verify-email' | 'firebase-config';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthView;
  onAuthSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = 'login',
  onAuthSuccess
}) => {
  const {
    user,
    loading,
    error,
    authMode,
    isFirebaseConfigured,
    signUp,
    login,
    sendPasswordReset,
    resetPasswordWithToken,
    sendVerificationEmail,
    verifyCurrentEmail,
    demoLogin,
    clearError,
    saveFirebaseKeys,
    resetFirebaseConfig
  } = useAuth();

  const [view, setView] = useState<AuthView>(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Password reset specific states
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Firebase manual config fields
  const [fbApiKey, setFbApiKey] = useState('');
  const [fbAuthDomain, setFbAuthDomain] = useState('');
  const [fbProjectId, setFbProjectId] = useState('');
  const [fbAppId, setFbAppId] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  useEffect(() => {
    setView(initialView);
    clearError();
    setSuccessMessage(null);
    setLocalErrors({});
  }, [initialView, isOpen]);

  // Real-time password strength calculation
  const currentPasswordForStrength = view === 'reset-password' ? newPassword : password;
  const passwordStrength = evaluatePasswordStrength(currentPasswordForStrength);

  if (!isOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    const validation = validateLoginForm({ email, password });
    if (!validation.isValid) {
      setLocalErrors(validation.errors);
      return;
    }
    setLocalErrors({});

    const result = await login({ email, password, rememberMe });
    if (result.success) {
      if (onAuthSuccess) onAuthSuccess();
      onClose();
    }
  };

  // Handle Sign Up Submit
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    const validation = validateSignUpForm({
      name,
      email,
      password,
      confirmPassword,
      agreeToTerms
    });

    if (!validation.isValid) {
      setLocalErrors(validation.errors);
      return;
    }
    setLocalErrors({});

    const result = await signUp({
      name,
      email,
      password,
      confirmPassword,
      agreeToTerms
    });

    if (result.success) {
      setSuccessMessage(result.message || 'Account created successfully!');
      setView('verify-email');
      if (onAuthSuccess) onAuthSuccess();
    }
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setLocalErrors({ email: 'Please enter a valid email address' });
      return;
    }
    setLocalErrors({});

    const result = await sendPasswordReset(email);
    setSuccessMessage(result.message);
    if (result.mockResetToken) {
      setResetToken(result.mockResetToken);
    }
  };

  // Handle Reset Password Submit
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    const validation = validateResetPasswordForm({
      newPassword,
      confirmPassword: confirmNewPassword
    });

    if (!validation.isValid) {
      setLocalErrors(validation.errors);
      return;
    }
    setLocalErrors({});

    const result = await resetPasswordWithToken(resetToken, {
      newPassword,
      confirmPassword: confirmNewPassword
    });

    if (result.success) {
      setSuccessMessage(result.message);
      // Clean inputs
      setPassword('');
      setConfirmPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => {
        setView('login');
      }, 2000);
    }
  };

  // Handle Demo Login
  const handleDemoLogin = async () => {
    await demoLogin();
    if (onAuthSuccess) onAuthSuccess();
    onClose();
  };

  // Handle save Firebase keys
  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbApiKey || !fbProjectId) {
      setLocalErrors({ fb: 'API Key and Project ID are required to link Firebase' });
      return;
    }
    saveFirebaseKeys({
      apiKey: fbApiKey.trim(),
      authDomain: fbAuthDomain.trim() || `${fbProjectId.trim()}.firebaseapp.com`,
      projectId: fbProjectId.trim(),
      appId: fbAppId.trim()
    });
  };

  const copyResetToken = () => {
    navigator.clipboard.writeText(resetToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0e101f] border border-purple-900/50 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isFirebaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span className="text-xs font-mono text-slate-300">
              {isFirebaseConfigured ? 'Firebase Auth Mode' : 'Local Secure Session Mode'}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Authentication Modal"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto">
          {/* Top Brand & View Title */}
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {view === 'login' && 'Welcome Back'}
              {view === 'signup' && 'Create Your Creator Account'}
              {view === 'forgot' && 'Reset Your Password'}
              {view === 'reset-password' && 'Enter New Password'}
              {view === 'verify-email' && 'Verify Your Email'}
              {view === 'firebase-config' && 'Firebase & Android Setup'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {view === 'login' && 'Log in to access your projects and generated clips'}
              {view === 'signup' && 'Turn long videos into viral 9:16 reels in minutes'}
              {view === 'forgot' && 'Enter your email to receive a secure time-limited reset link'}
              {view === 'reset-password' && 'Choose a strong, secure password for your account'}
              {view === 'verify-email' && 'Check your inbox to verify and secure your account'}
              {view === 'firebase-config' && 'Configure custom Firebase keys or deploy to GitHub/Android'}
            </p>
          </div>

          {/* Global Alert / Error Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Quick Demo Switcher on Login/Signup */}
          {(view === 'login' || view === 'signup') && (
            <div className="mb-5 p-3 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200">Testing on Mobile / Android?</div>
                  <div className="text-[10px] text-slate-400">Skip typing with 1-click Pro Creator account</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                1-Click Demo
              </button>
            </div>
          )}

          {/* --- VIEW: LOGIN --- */}
          {view === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@example.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      localErrors.email ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                </div>
                {localErrors.email && <p className="text-[11px] text-rose-400 mt-1">{localErrors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      clearError();
                      setSuccessMessage(null);
                      setView('forgot');
                    }}
                    className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      localErrors.password ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {localErrors.password && <p className="text-[11px] text-rose-400 mt-1">{localErrors.password}</p>}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-purple-600 focus:ring-purple-500"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-xs text-slate-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    clearError();
                    setSuccessMessage(null);
                    setView('signup');
                  }}
                  className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4"
                >
                  Sign Up Free
                </button>
              </div>
            </form>
          )}

          {/* --- VIEW: SIGN UP --- */}
          {view === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    autoComplete="name"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      localErrors.name ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                </div>
                {localErrors.name && <p className="text-[11px] text-rose-400 mt-1">{localErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@example.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      localErrors.email ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                </div>
                {localErrors.email && <p className="text-[11px] text-rose-400 mt-1">{localErrors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      localErrors.password ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {localErrors.password && <p className="text-[11px] text-rose-400 mt-1">{localErrors.password}</p>}

                {/* Password Strength Meter */}
                {password && (
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Password Strength:</span>
                      <span className="font-bold" style={{ color: passwordStrength.color }}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${passwordStrength.progressPercent}%`,
                          backgroundColor: passwordStrength.color
                        }}
                      />
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">
                        {passwordStrength.feedback[0]}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      localErrors.confirmPassword ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {localErrors.confirmPassword && (
                  <p className="text-[11px] text-rose-400 mt-1">{localErrors.confirmPassword}</p>
                )}
              </div>

              {/* Terms and Privacy Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-0.5 rounded bg-slate-900 border-slate-700 text-purple-600 focus:ring-purple-500"
                  />
                  <span>
                    I confirm I own or have permission to edit uploaded videos, and agree to the{' '}
                    <span className="text-purple-400 underline">Terms of Service</span> and{' '}
                    <span className="text-purple-400 underline">Privacy Policy</span>.
                  </span>
                </label>
                {localErrors.agreeToTerms && (
                  <p className="text-[11px] text-rose-400 mt-1">{localErrors.agreeToTerms}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Creator Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-xs text-slate-400">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    clearError();
                    setSuccessMessage(null);
                    setView('login');
                  }}
                  className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4"
                >
                  Log In Here
                </button>
              </div>
            </form>
          )}

          {/* --- VIEW: FORGOT PASSWORD --- */}
          {view === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@example.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      localErrors.email ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                </div>
                {localErrors.email && <p className="text-[11px] text-rose-400 mt-1">{localErrors.email}</p>}
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                Security notice: For privacy, we dispatch a time-limited reset link without revealing whether this email is currently registered.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Send Password Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* If in local mode, show simulated token box to open Reset Screen directly */}
              {resetToken && (
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60 mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                    <span>Generated Secure Token (15m validity):</span>
                    <button
                      type="button"
                      onClick={copyResetToken}
                      className="flex items-center gap-1 text-[11px] text-purple-300 hover:text-white"
                    >
                      {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedToken ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-[10px] text-slate-300 bg-slate-950 p-2 rounded-lg truncate border border-slate-800">
                    {resetToken}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      clearError();
                      setSuccessMessage(null);
                      setView('reset-password');
                    }}
                    className="w-full mt-2 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Proceed to Reset Password Page</span>
                  </button>
                </div>
              )}

              <div className="text-center pt-2 text-xs text-slate-400">
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4"
                >
                  Return to Log In
                </button>
              </div>
            </form>
          )}

          {/* --- VIEW: RESET PASSWORD (CONFIRM NEW PASSWORD) --- */}
          {view === 'reset-password' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reset Verification Token</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Paste your 15-minute reset token"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      localErrors.newPassword ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {localErrors.newPassword && (
                  <p className="text-[11px] text-rose-400 mt-1">{localErrors.newPassword}</p>
                )}

                {/* Password Strength Meter */}
                {newPassword && (
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Password Strength:</span>
                      <span className="font-bold" style={{ color: passwordStrength.color }}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${passwordStrength.progressPercent}%`,
                          backgroundColor: passwordStrength.color
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      localErrors.confirmPassword ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {localErrors.confirmPassword && (
                  <p className="text-[11px] text-rose-400 mt-1">{localErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Save New Password & Log In</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4"
                >
                  Return to Log In
                </button>
              </div>
            </form>
          )}

          {/* --- VIEW: EMAIL VERIFICATION --- */}
          {view === 'verify-email' && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 rounded-3xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
                <Mail className="w-8 h-8" />
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                We sent an email verification link to{' '}
                <strong className="text-white font-semibold">{user?.email || email || 'your email'}</strong>. Please
                click the link to confirm your account.
              </p>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                Email verification guarantees account recovery and unlocks priority FFmpeg queueing.
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    const res = await sendVerificationEmail();
                    setSuccessMessage(res.message);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                >
                  Resend Verification Email
                </button>

                <button
                  type="button"
                  onClick={() => {
                    verifyCurrentEmail();
                    setSuccessMessage('Email verified successfully! Welcome to ViralReels Studio.');
                    setTimeout(() => {
                      if (onAuthSuccess) onAuthSuccess();
                      onClose();
                    }, 1200);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Simulate "Email Verified"</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onAuthSuccess) onAuthSuccess();
                  onClose();
                }}
                className="text-xs text-slate-400 hover:text-slate-200 mt-2 inline-block"
              >
                Skip for now and continue to Dashboard
              </button>
            </div>
          )}

          {/* --- VIEW: FIREBASE & ANDROID CONFIGURATION --- */}
          {view === 'firebase-config' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Current Auth Engine Status</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isFirebaseConfigured
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isFirebaseConfigured ? 'Live Firebase Active' : 'Local Secure Session Mode'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isFirebaseConfigured
                    ? 'Connected to Firebase Authentication and Google Cloud Firestore backend.'
                    : 'Running in zero-friction Local Secure Mode. Passwords and sessions are cryptographically tokenized and stored per browser session.'}
                </p>
              </div>

              {/* Instructions for Android and GitHub */}
              <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-xs space-y-2 text-slate-300">
                <div className="font-bold text-purple-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>How to connect your own Firebase project (from Android / GitHub)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-400 leading-relaxed">
                  <li>Visit <strong>console.firebase.google.com</strong> in Chrome or mobile browser.</li>
                  <li>Click <em>Create a project</em> (e.g. <code>viralreels-app</code>).</li>
                  <li>In <strong>Build ➔ Authentication</strong>, enable <em>Email/Password</em> provider.</li>
                  <li>In <strong>Project Settings</strong>, click <em>Add Web App (&lt;/&gt;)</em>.</li>
                  <li>Paste the config keys below or into your <code>.env</code> file.</li>
                </ol>
              </div>

              <form onSubmit={handleSaveFirebaseConfig} className="space-y-3">
                {localErrors.fb && <p className="text-[11px] text-rose-400">{localErrors.fb}</p>}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Firebase API Key</label>
                  <input
                    type="text"
                    value={fbApiKey}
                    onChange={(e) => setFbApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project ID</label>
                    <input
                      type="text"
                      value={fbProjectId}
                      onChange={(e) => setFbProjectId(e.target.value)}
                      placeholder="viralreels-prod"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Auth Domain (optional)</label>
                    <input
                      type="text"
                      value={fbAuthDomain}
                      onChange={(e) => setFbAuthDomain(e.target.value)}
                      placeholder="myapp.firebaseapp.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                  >
                    Save & Activate Firebase
                  </button>
                  {isFirebaseConfigured && (
                    <button
                      type="button"
                      onClick={resetFirebaseConfig}
                      className="px-3 py-2.5 rounded-xl bg-rose-950/60 text-rose-300 border border-rose-800/40 text-xs font-semibold"
                    >
                      Reset to Local
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
