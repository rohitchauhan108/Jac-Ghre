import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-20 sm:py-28 bg-[#006073] border-t border-b border-[#D4AF37]/25 overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06)_0%,transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <GoldEmblem size={32} className="mb-3" />

        <span className="text-[11px] font-cinzel font-semibold tracking-[0.35em] text-[#D4AF37] uppercase block mb-2">
          Le Cercle Privé GHRÉ
        </span>

        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-[0.14em] text-[#F7F4EB] uppercase">
          Stay Beautifully Informed
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-[#B5C7CA] font-sans font-light max-w-xl mx-auto leading-relaxed">
          Receive private invitations to seasonal formulation launches, Jac Ghré’s backstage hair masterclasses, and complimentary luxury gifts with your orders.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-4 bg-[#06333e] border border-[#D4AF37] max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-cinzel tracking-wider text-[#F3E5AB]"
          >
            <Check className="w-4 h-4 text-[#D4AF37]" />
            <span>Bienvenue au Cercle Privé. An invitation confirmation has been dispatched.</span>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-[#03151b] border border-[#D4AF37]/40 text-xs text-[#F7F4EB] placeholder-[#8EAAB0]/70 font-sans outline-none focus:border-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B89028] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.2em] uppercase hover:brightness-110 shadow-lg shrink-0 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Join Circle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#8EAAB0]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>We strictly respect your privacy. No unsolicited correspondence.</span>
        </div>
      </div>
    </section>
  );
};
