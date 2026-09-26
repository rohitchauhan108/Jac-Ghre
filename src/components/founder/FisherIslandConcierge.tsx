import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';

export const FisherIslandConcierge: React.FC = () => {
  const [service, setService] = useState('Prickly Pear Cellular Trichology Ritual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 bg-[#006073] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <GoldEmblem size={28} withGlow className="mx-auto mb-3" />
          <span className="text-[11px]  font-bold tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">
            PRIVATE VIP APPOINTMENTS
          </span>
          <h2 className=" text-3xl sm:text-5xl font-bold uppercase text-[#FBF9F3]">
            Private Client Concierge
          </h2>
          <p className="font-outfit text-xl sm:text-base text-[#B3CBD1] font-light mt-3 max-w-2xl mx-auto">
            JAC Ghré brings global fashion expertise to private clients and elite events through an exclusive concierge experience.
          </p>
        </div>

        <div className="flex justify-center items-center">
         

          {/* Right: Booking Form */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#007288] to-[#006073] border-2 border-[#D4AF37]/70 p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#D4AF37] mx-auto animate-bounce" />
                <h3 className=" text-2xl font-bold text-[#FBF9F3] uppercase">
                  Appointment Request Confirmed
                </h3>
                <p className="font-outfit text-xl text-[#C4D8DC] max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Our Private Client Director will contact you via {email} within 12 hours to finalize your private session.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-[#D4AF37] text-[#062B35]  text-xs font-bold tracking-widest uppercase cursor-pointer"
                >
                  Book Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3 mb-2">
                  <span className=" text-xs font-bold text-white tracking-[0.2em] uppercase">
                    CONFIDENTIAL VIP CONSULTATION
                  </span>
                  <span className="text-[10px]  text-[#8EAAB0]">
                    PRIVATE CLIENT
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px]  tracking-wider text-white uppercase mb-1.5 font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Madame / Monsieur..."
                      className="w-full px-4 py-3 bg-[#006073] border border-white/40 text-xs text-[#FBF9F3] placeholder-[#6C8A92] font-outfit outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px]  tracking-wider text-white uppercase mb-1.5 font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@luxury.com"
                      className="w-full px-4 py-3 bg-[#006073] border border-white/40 text-xs text-[#FBF9F3] placeholder-[#6C8A92] font-outfit outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px]  tracking-wider text-white uppercase mb-1.5 font-bold">
                      Phone Number (WhatsApp / Mobile)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (305) 000-0000"
                      className="w-full px-4 py-3 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#FBF9F3] placeholder-[#6C8A92] font-outfit outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px]  tracking-wider text-white uppercase mb-1.5 font-bold">
                      Curated Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#FBF9F3] font-outfit outline-none focus:border-white cursor-pointer"
                    >
                      <option value="Prickly Pear Cellular Trichology Ritual">
                        Prickly Pear Cellular Trichology Ritual
                      </option>
                      <option value="Haute Couture Runway Balayage & Gloss">
                        Haute Couture Runway Balayage & Gloss
                      </option>
                      <option value="Private Yacht Styling Session">
                        Private Yacht Styling Session
                      </option>
                      <option value="Bridal & Red Carpet Architectural Coiffure">
                        Bridal & Red Carpet Architectural Coiffure
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-[#006073]  text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Private Atelier</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
