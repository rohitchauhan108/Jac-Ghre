'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowLeft, Sparkles, User, Phone, UserPlus, AlertCircle, Loader2, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { register, verifyRegistration, resendRegistrationCode, isAuthenticated, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [pendingEmail, setPendingEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/account');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (successMsg) setSuccessMsg('');
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(val);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (name.trim().length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number (at least 10 digits).');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const res = await register({ name: name.trim(), email, phone, password });
      setPendingEmail(res.email);
      setStep('otp');
      setResendCooldown(60);
      setSuccessMsg('A verification code has been sent to your email.');
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong. Please try again.';
      setError(msg);
      if (err?.status === 429) {
        const retryAfter = Number(err?.retryAfter);
        setResendCooldown(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    try {
      setIsSubmitting(true);
      setError('');
      await verifyRegistration(pendingEmail, otp);
      router.push('/account');
    } catch (err: any) {
      const msg = err?.message || 'Invalid or expired verification code.';
      setError(msg);
      if (err?.status === 429) {
        const retryAfter = Number(err?.retryAfter);
        setResendCooldown(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      setError('');
      await resendRegistrationCode(pendingEmail);
      setResendCooldown(60);
      setSuccessMsg('A new verification code has been sent.');
    } catch (err: any) {
      const msg = err?.message || 'Failed to resend code.';
      setError(msg);
      if (err?.status === 429) {
        const retryAfter = Number(err?.retryAfter);
        setResendCooldown(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="bg-[#006e83] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#006e83] min-h-screen text-[#FBF9F3] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0C8A9B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">
        <div className="w-full flex justify-start mb-6">
          <button
            onClick={() => router.push('/')}
            className="group inline-flex items-center gap-2 text-xs font-cinzel text-[#D4AF37] hover:text-[#F3E5AB] transition-all tracking-widest uppercase bg-[#097B8A]/40 px-4 py-2 rounded-full border border-[#D4AF37]/20 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Return to Atelier
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#097B8A]/60 via-[#0C8A9B] to-[#097B8A]/60 border border-[#D4AF37]/40 rounded-full shadow-2xl mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-cinzel font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
              Join the Ghré Circle
            </span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-light tracking-[0.15em] text-[#FBF9F3] uppercase">
            Create Your <span className="text-[#D4AF37] font-normal">Account</span>
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-5 mx-auto" />
          <p className="mt-4 font-outfit text-sm text-[#C4D8DC]">
            {step === 'form'
              ? 'Begin your journey with luxury botanical hair rituals and haute parfumerie.'
              : 'Verify your email to complete the registration.'}
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-cinzel tracking-widest uppercase ${step === 'form' ? 'bg-[#D4AF37] text-[#06242B]' : 'bg-[#097B8A]/50 text-[#8EAAB0] border border-[#D4AF37]/20'}`}>
            <User className="w-3 h-3" /> Step 1
          </div>
          <div className="w-8 h-[1px] bg-[#D4AF37]/30" />
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-cinzel tracking-widest uppercase ${step === 'otp' ? 'bg-[#D4AF37] text-[#06242B]' : 'bg-[#097B8A]/50 text-[#8EAAB0] border border-[#D4AF37]/20'}`}>
            <ShieldCheck className="w-3 h-3" /> Step 2
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#097B8A]/60 to-[#06242B]/70 border-2 border-[#D4AF37]/40 rounded-2xl shadow-2xl p-8 backdrop-blur-xl space-y-6">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/40 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="font-outfit text-xs text-red-200">{error}</p>
            </div>
          )}
          {successMsg && (
            <div className="flex items-start gap-3 p-4 bg-[#103C26]/40 border border-[#D4AF37]/40 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="font-outfit text-xs text-[#F3E5AB]">{successMsg}</p>
            </div>
          )}

          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Full Name
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Victoria Windsor"
                  autoComplete="name"
                  className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                />
              </div>

              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@jac-ghre.com"
                  autoComplete="email"
                  className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                />
              </div>

              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Phone Number
                  </div>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 019-2834"
                  autoComplete="tel"
                  className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                />
              </div>

              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Password
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    className="w-full px-4 py-3.5 pr-11 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Confirm Password
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className="w-full px-4 py-3.5 pr-11 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-outfit pt-2">
                <div className="flex items-center gap-2 text-[#8EAAB0]">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Already a patron?</span>
                </div>
                <Link
                  href="/login"
                  className="text-[#D4AF37] hover:text-[#F3E5AB] font-semibold tracking-wide transition-colors"
                >
                  Sign In →
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#E6C65C] to-[#D4AF37] text-[#06242B] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-2xl rounded-xl cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Continue & Verify</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-[#06242B] border border-[#D4AF37]/40 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <p className="font-outfit text-sm text-[#C4D8DC]">
                  Verification code sent to <span className="text-[#D4AF37] font-semibold">{pendingEmail}</span>
                </p>
              </div>

              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium text-center">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="• • • • • •"
                  maxLength={6}
                  className="w-full px-6 py-5 bg-[#06242B]/70 border-2 border-[#D4AF37]/40 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 font-cinzel text-3xl text-center tracking-[0.6em] transition-all"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || isSubmitting}
                  className="font-outfit text-xs text-[#8EAAB0] hover:text-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend verification code'}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-outfit pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-[#8EAAB0] hover:text-[#C4D8DC] transition-colors"
                >
                  ← Back to form
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#E6C65C] to-[#D4AF37] text-[#06242B] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-2xl rounded-xl cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify & Create Account</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
