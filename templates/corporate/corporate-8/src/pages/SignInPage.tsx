import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Eye, EyeOff, CheckCircle2, Shield } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const userName = email.split('@')[0];
    localStorage.setItem('corporate_user', JSON.stringify({ email, name: userName }));
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleSocial = (provider: string) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      alert(`[Demo Mode] Connected via ${provider}. Redirecting to Vertexa Portal...`);
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121316] pt-28 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center bg-tech-grid">
      {/* Return back link */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#5E636E] hover:text-[#0A2E23] transition-colors"
        >
          <span>← Back to Vertexa</span>
        </Link>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-white border border-[#E6E2D8] rounded-xl p-8 sm:p-10 shadow-sm">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0A2E23]/5 border border-[#0A2E23]/10 text-[#0A2E23] text-[11px] font-mono-tech uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5 text-[#0A2E23]" />
            <span>EXECUTIVE ACCESS</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#121316] font-normal leading-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-[#5E636E] mt-2 font-light">
            Sign in to access your enterprise advisory terminal.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0A2E23]/10 text-[#0A2E23] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-editorial text-2xl text-[#121316] mb-2">
              Identity Confirmed
            </h3>
            <p className="text-xs text-[#5E636E]">
              Establishing verified session for <strong>{email || 'Executive Member'}</strong>...
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="vertexa-email"
                  className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#121316] font-semibold mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5E636E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="vertexa-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@enterprise.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E6E2D8] rounded-lg text-sm text-[#121316] focus:outline-none focus:border-[#0A2E23] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="vertexa-password"
                    className="text-[11px] font-mono-tech uppercase tracking-wider text-[#121316] font-semibold"
                  >
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password reset instructions forwarded to verified email.');
                    }}
                    className="text-[11px] font-mono-tech text-[#5E636E] hover:text-[#0A2E23] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5E636E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="vertexa-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E6E2D8] rounded-lg text-sm text-[#121316] focus:outline-none focus:border-[#0A2E23] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E636E] hover:text-[#121316] cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 text-xs text-[#5E636E]">
                <input
                  type="checkbox"
                  id="vertexa-remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E6E2D8] text-[#0A2E23] focus:ring-[#0A2E23]"
                />
                <label htmlFor="vertexa-remember" className="cursor-pointer select-none">
                  Remember device for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0A2E23] hover:bg-[#124234] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow mt-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CCF34A]" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6 text-[10px] font-mono-tech text-[#5E636E]/60">
              <div className="flex-1 h-px bg-[#E6E2D8]" />
              <span>OR CONNECT WITH</span>
              <div className="flex-1 h-px bg-[#E6E2D8]" />
            </div>

            {/* Social Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSocial('Google')}
                disabled={socialLoading !== null}
                className="w-full py-2.5 px-4 bg-white border border-[#E6E2D8] hover:bg-[#FAF8F5] rounded-lg text-xs font-medium text-[#121316] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocial('GitHub')}
                disabled={socialLoading !== null}
                className="w-full py-2.5 px-4 bg-white border border-[#E6E2D8] hover:bg-[#FAF8F5] rounded-lg text-xs font-medium text-[#121316] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Create Account Link */}
            <div className="text-center mt-6 text-xs text-[#5E636E]">
              Don't have an account?{' '}
              <a
                href="#request"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Enterprise access is granted per master services agreement. Please contact leadership.');
                }}
                className="text-[#0A2E23] font-semibold hover:underline"
              >
                Create Account
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
