import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, CheckCircle2, Shield, Phone, Mail, Clock, Send, Sparkles } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';

export const FisherIslandConcierge: React.FC = () => {
  const [location, setLocation] = useState('Fisher Island Club, Miami, Florida');
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

  const ateliers = [
    {
      name: 'Fisher Island Club, Miami, Florida',
      tag: 'FLAGSHIP ATELIER',
    },
    {
      name: 'Paris — Place Vendôme',
      tag: 'HAUTE COIFFURE',
    },
    {
      name: 'Saint-Tropez — Ramatuelle',
      tag: 'COASTAL RIVIERA',
    },
  ];

  return (
    <section className="relative py-24 bg-[#006073] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <GoldEmblem size={28} withGlow className="mx-auto mb-3" />
          <span className="text-[11px] font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">
            PRIVATE VIP APPOINTMENTS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase text-[#FBF9F3]">
            Fisher Island Club & Global Concierge
          </h2>
          <p className="font-outfit text-sm sm:text-base text-[#B3CBD1] font-light mt-3 max-w-2xl mx-auto">
            Today, JAC Ghré works as a luxury beauty artist on Fisher Island, Miami, serving an exclusive international clientele while bringing his global fashion expertise to private clients and elite events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Atelier Locations */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
              Select Private Atelier Location
            </h3>

            {ateliers.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setLocation(item.name)}
                className={`w-full p-5 text-left border transition-all cursor-pointer flex items-start gap-4 ${
                  location === item.name
                    ? 'bg-[#007288] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-[#006073]/70 border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    location === item.name
                      ? 'bg-[#D4AF37] text-[#062B35]'
                      : 'bg-[#006073] text-[#D4AF37] border border-[#D4AF37]/40'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-cinzel text-sm font-bold text-[#FBF9F3]">
                      {item.name}
                    </h4>
                    <span className="text-[9px] font-cinzel font-bold tracking-wider px-2 py-0.5 bg-[#006073] border border-[#D4AF37]/40 text-[#D4AF37]">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            {/* Official Web Badge */}
            <div className="p-4 bg-[#006073] border border-[#D4AF37]/30 text-center">
              <span className="text-xs font-cinzel text-[#8EAAB0] tracking-widest uppercase block">
                Official Web Portal
              </span>
              <a
                href="https://jacghre.com"
                target="_blank"
                rel="noreferrer"
                className="font-cinzel text-base font-bold text-[#D4AF37] hover:text-[#FFF3C4] transition-colors inline-block mt-0.5"
              >
                JACGHRE.COM
              </a>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#007288] to-[#006073] border-2 border-[#D4AF37]/70 p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#D4AF37] mx-auto animate-bounce" />
                <h3 className="font-cinzel text-2xl font-bold text-[#FBF9F3] uppercase">
                  Appointment Request Confirmed
                </h3>
                <p className="font-outfit text-sm text-[#C4D8DC] max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Our Private Client Director for <strong>{location}</strong> will contact you via {email} within 12 hours to finalize your private session.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold tracking-widest uppercase cursor-pointer"
                >
                  Book Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3 mb-2">
                  <span className="font-cinzel text-xs font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
                    CONFIDENTIAL VIP CONSULTATION
                  </span>
                  <span className="text-[10px] font-cinzel text-[#8EAAB0]">
                    {location.split(',')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#D4AF37] uppercase mb-1.5 font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Madame / Monsieur..."
                      className="w-full px-4 py-3 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#FBF9F3] placeholder-[#6C8A92] font-outfit outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#D4AF37] uppercase mb-1.5 font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@luxury.com"
                      className="w-full px-4 py-3 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#FBF9F3] placeholder-[#6C8A92] font-outfit outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#D4AF37] uppercase mb-1.5 font-bold">
                      Phone Number (WhatsApp / Mobile)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (305) 000-0000"
                      className="w-full px-4 py-3 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#FBF9F3] placeholder-[#6C8A92] font-outfit outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#D4AF37] uppercase mb-1.5 font-bold">
                      Curated Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#FBF9F3] font-outfit outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="Prickly Pear Cellular Trichology Ritual">
                        Prickly Pear Cellular Trichology Ritual
                      </option>
                      <option value="Haute Couture Runway Balayage & Gloss">
                        Haute Couture Runway Balayage & Gloss
                      </option>
                      <option value="Fisher Island Private Yacht Styling Session">
                        Fisher Island Private Yacht Styling Session
                      </option>
                      <option value="Bridal & Red Carpet Architectural Coiffure">
                        Bridal & Red Carpet Architectural Coiffure
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B89028] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Fisher Island Private Atelier</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
