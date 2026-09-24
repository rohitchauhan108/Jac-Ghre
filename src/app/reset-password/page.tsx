'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowLeft, Sparkles, AlertCircle, Loader2, ShieldCheck, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Step = 'request' | 'otp' | 'done';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { requestPasswordReset, resetPassword, isAuthenticated, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const [showNewPassword, setShowNewPassword] = useState(false);
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

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    try {
      setIsSubmitting(true);
      setError('');
      await requestPasswordReset(email);
      setStep('otp');
      setResendCooldown(60);
      setSuccessMsg('If an account exists, a reset code has been sent to your email.');
    } catch (err: any) {
      const msg = err?.message || 'Failed to request password reset.';
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
      await requestPasswordReset(email);
      setResendCooldown(60);
      setSuccessMsg('A new reset code has been sent.');
    } catch (err: any) {
      const msg = err?.message || 'Failed to resend code.';
      setError(msg);
      if (err?.status === 429) {
        const retryAfter = Number(err?.retryAfter);
        setResendCooldown(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60);
      }
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the 6-digit reset code.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }
    try {
      setIsSubmitting(true);
      setError('');
      await resetPassword(email, otp, newPassword);
      setStep('done');
    } catch (err: any) {
      const msg = err?.message || 'Invalid or expired reset code.';
      setError(msg);
      if (err?.status === 429) {
        const retryAfter = Number(err?.retryAfter);
        setResendCooldown(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60);
      }
    } finally {
      setIsSubmitting(false);
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
              Secure Account Recovery
            </span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-light tracking-[0.15em] text-[#FBF9F3] uppercase">
            Reset Your <span className="text-[#D4AF37] font-normal">Password</span>
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-5 mx-auto" />
          <p className="mt-4 font-outfit text-sm text-[#C4D8DC]">
            {step === 'request' && 'Enter your email to receive a secure reset code.'}
            {step === 'otp' && 'Enter the code sent to your email and choose a new password.'}
            {step === 'done' && 'Your password has been updated successfully.'}
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-cinzel tracking-widest uppercase ${step === 'request' ? 'bg-[#D4AF37] text-[#06242B]' : step === 'otp' || step === 'done' ? 'bg-[#103C26]/60 border border-[#D4AF37]/40 text-[#D4AF37]' : 'bg-[#097B8A]/50 text-[#8EAAB0] border border-[#D4AF37]/20'}`}>
            <Mail className="w-3 h-3" /> Step 1
          </div>
          <div className="w-8 h-[1px] bg-[#D4AF37]/30" />
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-cinzel tracking-widest uppercase ${step === 'otp' ? 'bg-[#D4AF37] text-[#06242B]' : step === 'done' ? 'bg-[#103C26]/60 border border-[#D4AF37]/40 text-[#D4AF37]' : 'bg-[#097B8A]/50 text-[#8EAAB0] border border-[#D4AF37]/20'}`}>
            <ShieldCheck className="w-3 h-3" /> Step 2
          </div>
          <div className="w-8 h-[1px] bg-[#D4AF37]/30" />
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-cinzel tracking-widest uppercase ${step === 'done' ? 'bg-[#D4AF37] text-[#06242B]' : 'bg-[#097B8A]/50 text-[#8EAAB0] border border-[#D4AF37]/20'}`}>
            <CheckCircle2 className="w-3 h-3" /> Done
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#097B8A]/60 to-[#06242B]/70 border-2 border-[#D4AF37]/40 rounded-2xl shadow-2xl p-8 backdrop-blur-xl space-y-6">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/40 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="font-outfit text-xs text-red-200">{error}</p>
            </div>
          )}
          {successMsg && step !== 'done' && (
            <div className="flex items-start gap-3 p-4 bg-[#103C26]/40 border border-[#D4AF37]/40 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="font-outfit text-xs text-[#F3E5AB]">{successMsg}</p>
            </div>
          )}

          {step === 'request' && (
            <form onSubmit={handleRequest} className="space-y-5">
              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                  placeholder="you@jac-ghre.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                />
              </div>

              <div className="text-right">
                <Link href="/login" className="font-outfit text-xs text-[#8EAAB0] hover:text-[#D4AF37] transition-colors">
                  Remember your password? Sign In →
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
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span>Send Reset Code</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="font-outfit text-sm text-[#C4D8DC]">
                  Reset code sent to <span className="text-[#D4AF37] font-semibold">{email}</span>
                </p>
              </div>

              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium text-center">
                  6-Digit Reset Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); if (error) setError(''); }}
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
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend reset code'}
                </button>
              </div>

              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    New Password
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); if (error) setError(''); }}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    className="w-full px-4 py-3.5 pr-11 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Confirm New Password
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); if (error) setError(''); }}
                    placeholder="Re-enter new password"
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
                <button
                  type="button"
                  onClick={() => setStep('request')}
                  className="text-[#8EAAB0] hover:text-[#C4D8DC] transition-colors"
                >
                  ← Change email
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
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'done' && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-[#06242B] border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-cinzel text-2xl font-light tracking-wider text-[#FBF9F3] uppercase mb-2">
                  Password Updated
                </h3>
                <p className="font-outfit text-sm text-[#C4D8DC] leading-relaxed max-w-sm mx-auto">
                  Your Jac Ghré account password has been securely changed. You may now sign in with your new credentials.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#E6C65C] to-[#D4AF37] text-[#06242B] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-2xl rounded-xl group"
              >
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <span>Continue to Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
