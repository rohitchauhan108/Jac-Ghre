'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowLeft, Sparkles, User, LogIn, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/account';
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, authLoading, router, redirectTo]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;
    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }
    try {
      setIsSubmitting(true);
      setError('');
      await login(formData.email, formData.password);
      router.replace(redirectTo);
    } catch (err: any) {
      const msg = err?.message || 'Invalid email or password. Please try again.';
      setError(msg);
      if (err?.status === 429) {
        const retryAfter = Number(err?.retryAfter);
        const seconds = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60;
        setCooldown(seconds);
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
              Private Client Access
            </span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-light tracking-[0.15em] text-[#FBF9F3] uppercase">
            Sign In to <span className="text-[#D4AF37] font-normal">Ghré</span>
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-5 mx-auto" />
          <p className="mt-4 font-outfit text-sm text-[#C4D8DC]">
            Welcome back. Access your curated rituals and order tracking.
          </p>
        </div>

        <div className="bg-gradient-to-b from-[#097B8A]/60 to-[#06242B]/70 border-2 border-[#D4AF37]/40 rounded-2xl shadow-2xl p-8 backdrop-blur-xl space-y-6">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/40 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="font-outfit text-xs text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                required
                autoComplete="email"
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
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
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

            <div className="flex items-center justify-between text-xs font-outfit">
              <div className="flex items-center gap-2 text-[#8EAAB0]">
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>New patron?</span>
              </div>
              <Link
                href="/signup"
                className="text-[#D4AF37] hover:text-[#F3E5AB] font-semibold tracking-wide transition-colors"
              >
                Create Account →
              </Link>
            </div>

            <div className="text-right">
              <Link
                href="/reset-password"
                className="font-outfit text-xs text-[#8EAAB0] hover:text-[#D4AF37] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cooldown > 0}
              className="w-full py-4 bg-white text-[#006073] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-2xl rounded-xl cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : cooldown > 0 ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Try again in {cooldown}s</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#006e83] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
