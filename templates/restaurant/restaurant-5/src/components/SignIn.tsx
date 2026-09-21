import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, ShieldCheck, CheckCircle2, ArrowLeft, KeyRound } from 'lucide-react';

interface SignInProps {
  onNavigateBack?: (target?: string) => void;
  redirectTarget?: string;
  authReason?: string;
}

export const SignIn: React.FC<SignInProps> = ({
  onNavigateBack,
  redirectTarget = 'hero',
  authReason
}) => {
  const { login, register, isAuthenticated, user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Please provide both your registered email and password.');
      return;
    }

    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);

    if (result.success) {
      if (onNavigateBack) {
        onNavigateBack(redirectTarget || 'hero');
      }
    } else {
      setLoginError(result.error || 'Authentication failed.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName.trim()) {
      setRegError('Please provide your full legal or patron name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must contain at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please verify your entry.');
      return;
    }

    setRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setRegLoading(false);

    if (result.success) {
      setRegSuccess('NOIRÉ Black Card membership activated successfully! Redirecting...');
      setTimeout(() => {
        if (onNavigateBack) {
          onNavigateBack(redirectTarget || 'hero');
        }
      }, 900);
    } else {
      setRegError(result.error || 'Registration failed.');
    }
  };

  // If already authenticated, show patron membership profile card
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-24 px-6 bg-[#171512] text-[#F3EBDD]">
        <div className="max-w-xl w-full bg-[#211D18] border border-[#B87552] p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
          {/* Top Status Header */}
          <div className="flex items-center justify-between border-b border-[rgba(243,235,221,0.14)] pb-6 mb-8">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B87552] animate-ping"></span>
              <span className="font-mono text-xs text-[#B87552] tracking-widest uppercase font-bold">
                [ ACTIVE PATRON SESSION ]
              </span>
            </div>
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'hero')}
              className="flex items-center space-x-1 font-mono text-xs text-[#B8AA98] hover:text-[#F3EBDD] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>[ RETURN ]</span>
            </button>
          </div>

          {/* Member Card Body */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#171512] border border-[#B87552] text-[#B87552] flex items-center justify-center mx-auto mb-4 font-display font-black text-2xl">
              N
            </div>
            <span className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase block mb-1">
              {user.role}
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-[#F3EBDD] uppercase tracking-tight mb-2">
              {user.name}
            </h2>
            <p className="font-mono text-xs text-[#B8AA98]">
              MEMBER ID: <span className="text-[#F3EBDD]">{user.email}</span>
            </p>
          </div>

          {/* Member Privileges Panel */}
          <div className="bg-[#171512] border border-[rgba(243,235,221,0.14)] p-6 mb-8 text-left font-mono text-xs text-[#B8AA98] space-y-3">
            <div className="flex items-center space-x-2 text-[#F3EBDD]">
              <ShieldCheck className="w-4 h-4 text-[#B87552]" />
              <span className="font-bold">AUTHENTICATED NOIRÉ PRIVILEGES</span>
            </div>
            <p className="pl-6 text-[11px] leading-relaxed">
              • Guaranteed Table Reservations at Nocturnal Supper Hours<br />
              • Priority RSVP for Chef Arjun Rao's Tasting Sessions<br />
              • Direct Sommelier Pairing & Private Conservatory Access
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'hero')}
              className="btn-copper w-full sm:w-auto px-8 py-3 text-xs uppercase font-bold tracking-widest"
            >
              CONTINUE DINING →
            </button>
            <button
              onClick={logout}
              className="w-full sm:w-auto px-8 py-3 bg-transparent border border-[rgba(243,235,221,0.2)] text-[#B8AA98] hover:border-[#B87552] hover:text-[#F3EBDD] font-mono text-xs tracking-widest uppercase transition-all duration-300"
            >
              [ SIGN OUT ]
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-20 px-6 bg-[#171512] text-[#F3EBDD]">
      <div className="max-w-lg w-full bg-[#211D18] border border-[rgba(243,235,221,0.14)] rounded-sm p-8 md:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-[rgba(243,235,221,0.14)] pb-4 mb-6">
          <button
            onClick={() => onNavigateBack && onNavigateBack('hero')}
            className="flex items-center space-x-1.5 font-mono text-xs text-[#B87552] hover:text-[#F3EBDD] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[ RETURN TO NOIRÉ ]</span>
          </button>
          <span className="font-mono text-[11px] text-[#B8AA98] tracking-widest uppercase">
            CHENNAI &bull; 13.0827° N
          </span>
        </div>

        {/* Title Branding */}
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-[#B87552] tracking-widest uppercase block mb-1 font-bold">
            00 // PATRON ACCESS
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-[#F3EBDD] uppercase tracking-tight">
            NOIRÉ®
          </h2>
          <p className="font-mono text-xs text-[#B8AA98] mt-1">
            AUTHENTICATION REQUIRED FOR RESERVATIONS &amp; SESSIONS
          </p>

          {/* Contextual Auth Reason Banner */}
          {authReason && (
            <div className="mt-4 p-3 bg-[#171512] border-l-2 border-[#B87552] text-left">
              <span className="font-mono text-[11px] text-[#B87552] uppercase font-bold block mb-0.5">
                [ PROTECTED ACTION ]
              </span>
              <p className="font-mono text-xs text-[#F3EBDD] leading-snug">{authReason}</p>
            </div>
          )}
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 border-b border-[rgba(243,235,221,0.14)] mb-6">
          <button
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`py-3 font-mono text-xs tracking-widest uppercase font-bold transition-colors ${
              activeTab === 'signin'
                ? 'text-[#B87552] border-b-2 border-[#B87552]'
                : 'text-[#B8AA98] hover:text-[#F3EBDD]'
            }`}
          >
            [ SIGN IN ]
          </button>
          <button
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`py-3 font-mono text-xs tracking-widest uppercase font-bold transition-colors ${
              activeTab === 'register'
                ? 'text-[#B87552] border-b-2 border-[#B87552]'
                : 'text-[#B8AA98] hover:text-[#F3EBDD]'
            }`}
          >
            [ JOIN PATRONS ]
          </button>
        </div>

        {/* Form Container */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-5">
            {loginError && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 font-mono text-xs">
                {loginError}
              </div>
            )}

            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-[#B87552]" />
                <span>MEMBER EMAIL</span>
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="arjun.rao@noire.example"
                className="bg-[#171512] border border-[rgba(243,235,221,0.14)] p-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B87552]" />
                <span>PASSWORD</span>
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#171512] border border-[rgba(243,235,221,0.14)] p-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-copper py-3.5 text-xs uppercase font-bold tracking-widest mt-2"
            >
              {loginLoading ? 'AUTHENTICATING...' : 'ENTER NOIRÉ →'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="flex flex-col space-y-4">
            {regError && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 font-mono text-xs">
                {regError}
              </div>
            )}
            {regSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{regSuccess}</span>
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#B87552]" />
                <span>FULL NAME</span>
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="VIKRAM RAJ"
                className="bg-[#171512] border border-[rgba(243,235,221,0.14)] p-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-[#B87552]" />
                <span>EMAIL ADDRESS</span>
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="vikram@example.com"
                className="bg-[#171512] border border-[rgba(243,235,221,0.14)] p-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#B87552]" />
                <span>CREATE PASSWORD (MIN. 6 CHARS)</span>
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#171512] border border-[rgba(243,235,221,0.14)] p-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B87552]" />
                <span>CONFIRM PASSWORD</span>
              </label>
              <input
                type="password"
                required
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#171512] border border-[rgba(243,235,221,0.14)] p-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={regLoading}
              className="btn-copper py-3.5 text-xs uppercase font-bold tracking-widest mt-2"
            >
              {regLoading ? 'ACTIVATING MEMBERSHIP...' : 'ACTIVATE BLACK CARD →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
