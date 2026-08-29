import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, Sparkles, Send, ChevronRight, MessageSquare } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BrandLogo } from './BrandLogo';

export const FloatingConcierge: React.FC = () => {
  const { theme } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'call'>('whatsapp');
  const [inquiryText, setInquiryText] = useState('');

  const isDark = theme === 'dark';

  const defaultWhatsappMessage = encodeURIComponent(
    'Bonjour JAC GHRÉ Miami. I am looking for an ambassador for excellence, beauty expert consultation, luxury hair care guidance, and an international hair designer appointment.'
  );

  const handleOpenDirectWhatsapp = (customMsg?: string) => {
    const text = customMsg ? encodeURIComponent(customMsg) : defaultWhatsappMessage;
    window.open(`https://wa.me/17862383631?text=${text}`, '_blank');
  };

  const quickQuestions = [
    'Which luxury hair care formula is best for damaged bleached hair?',
    'How do I book an ambassador for excellence consultation in Miami?',
    'Can I book a private consultation with Jac Ghré for international hair design?',
    'What is the status of worldwide courier delivery?',
  ];

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-3.5 font-poppins">
      {/* Expanded Concierge Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`w-[330px] sm:w-[380px] border-2 shadow-[0_25px_60px_rgba(0,0,0,0.75)] overflow-hidden ${
              isDark
                ? 'bg-[#006073] border-[#D4AF37]/60 text-[#F7F4EB]'
                : 'bg-[#FFFFFF] border-[#D4AF37] text-[#062B35]'
            }`}
          >
            {/* Header */}
            <div
              className={`p-4 border-b flex items-center justify-between ${
                isDark
                  ? 'bg-gradient-to-r from-[#006073] via-[#007288] to-[#006073] border-[#D4AF37]/30'
                  : 'bg-gradient-to-r from-[#FAF7F2] via-[#F3EDE2] to-[#FAF7F2] border-[#D4AF37]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#021820] text-[#D4AF37] font-cinzel font-bold text-xs">
                  JG
                </div>
                <div>
                  <h4
                    className={`font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase ${
                      isDark ? 'text-[#F3E5AB]' : 'text-[#062B35]'
                    }`}
                  >
                    GHRÉ Atelier Concierge
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#25D366] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span>Live Stylists Online (Paris • Miami)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 border transition-colors ${
                  isDark
                    ? 'border-[#D4AF37]/30 text-[#D4AF37] hover:text-white'
                    : 'border-[#D4AF37]/40 text-[#062B35] hover:text-[#B8860B]'
                }`}
                aria-label="Close concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Selector */}
            <div className="grid grid-cols-2 border-b border-[#D4AF37]/20 text-xs font-cinzel">
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`py-2.5 flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'whatsapp'
                    ? 'bg-[#25D366]/15 text-[#25D366] border-b-2 border-[#25D366] font-bold'
                    : isDark
                    ? 'text-[#8EAAB0] hover:text-white'
                    : 'text-[#556E77] hover:text-[#062B35]'
                }`}
              >
                {/* Authentic mini whatsapp icon */}
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.073-1.892-.447-1.503-.621-2.472-2.148-2.548-2.247-.075-.099-.607-.808-.607-1.543s.385-1.096.522-1.246c.137-.15.299-.187.399-.187.1 0 .199 0 .287.005.093.004.218-.035.341.262.129.312.441 1.074.48 1.153.039.078.065.17.013.272-.052.102-.078.166-.155.257-.078.092-.163.205-.233.276-.078.079-.16.164-.069.32.091.156.404.667.867 1.08 1.066.95 1.547 1.06 1.766 1.152.218.092.348.078.479-.065.13-.143.559-.65.708-.874.149-.224.298-.187.5-.112.203.075 1.288.607 1.509.718.222.112.37.166.425.26.055.093.055.539-.089.944z" />
                </svg>
                <span>WhatsApp Live</span>
              </button>
              <button
                onClick={() => setActiveTab('call')}
                className={`py-2.5 flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'call'
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-b-2 border-[#D4AF37] font-bold'
                    : isDark
                    ? 'text-[#8EAAB0] hover:text-white'
                    : 'text-[#556E77] hover:text-[#062B35]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Phone</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
              {activeTab === 'whatsapp' ? (
                <>
                  <div
                    className={`p-3 text-xs leading-relaxed border ${
                      isDark
                        ? 'bg-[#006073] border-[#D4AF37]/25 text-[#B5CAD0]'
                        : 'bg-[#FAF7F2] border-[#D4AF37]/30 text-[#4A6B74]'
                    }`}
                  >
                    <p className="font-editorial text-sm italic text-[#D4AF37] mb-1">
                      “Direct VIP connection to Jac Ghré master stylists and client advisors.”
                    </p>
                    <p>Response time: Immediate / Under 2 minutes.</p>
                  </div>

                  {/* Quick Topics */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-wider block font-semibold">
                      Instant Quick Inquiries:
                    </span>
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOpenDirectWhatsapp(q)}
                        className={`w-full text-left p-2 text-xs transition-all border flex items-center justify-between group ${
                          isDark
                            ? 'bg-[#006073] border-[#D4AF37]/20 text-[#E8DCC4] hover:border-[#25D366] hover:text-[#25D366]'
                            : 'bg-[#F9F6F0] border-[#D4AF37]/30 text-[#062B35] hover:border-[#25D366] hover:text-[#25D366]'
                        }`}
                      >
                        <span className="line-clamp-1">{q}</span>
                        <ChevronRight className="w-3 h-3 text-[#D4AF37] group-hover:text-[#25D366] shrink-0" />
                      </button>
                    ))}
                  </div>

                  {/* Custom Message Input */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type question for stylist..."
                        value={inquiryText}
                        onChange={(e) => setInquiryText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && inquiryText.trim()) {
                            handleOpenDirectWhatsapp(inquiryText);
                          }
                        }}
                        className={`w-full px-3 py-2 text-xs border outline-none ${
                          isDark
                            ? 'bg-[#006073] border-[#D4AF37]/30 text-[#F7F4EB] placeholder-[#8EAAB0] focus:border-[#25D366]'
                            : 'bg-[#FFFFFF] border-[#D4AF37]/40 text-[#062B35] placeholder-[#7A98A1] focus:border-[#25D366]'
                        }`}
                      />
                      <button
                        onClick={() => handleOpenDirectWhatsapp(inquiryText || undefined)}
                        className="px-3.5 py-2 bg-[#25D366] text-white font-cinzel text-xs font-bold uppercase hover:brightness-110 flex items-center gap-1 shadow-[0_4px_12px_rgba(37,211,102,0.4)] shrink-0 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`p-3 text-xs leading-relaxed border ${
                      isDark
                        ? 'bg-[#006073] border-[#D4AF37]/25 text-[#B5CAD0]'
                        : 'bg-[#FAF7F2] border-[#D4AF37]/30 text-[#4A6B74]'
                    }`}
                  >
                    <p className="font-editorial text-sm italic text-[#D4AF37] mb-1">
                      “Private telephone consultations with our Parisian maison specialists.”
                    </p>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="tel:+17862383631"
                      className={`block p-3 border transition-all ${
                        isDark
                          ? 'bg-[#006073] border-[#D4AF37]/30 text-[#F7F4EB] hover:border-[#D4AF37]'
                          : 'bg-[#FAF7F2] border-[#D4AF37]/40 text-[#062B35] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-[11px] font-cinzel text-[#D4AF37] block">
                            CELL USA
                          </strong>
                          <span className="text-xs font-mono font-bold">(1) 786 238 3631</span>
                          <span className="text-[10px] text-[#8EAAB0] block">Mon–Sat 9AM–8PM EST</span>
                        </div>
                        <Phone className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                    </a>

                    <a
                      href="tel:+33142685500"
                      className={`block p-3 border transition-all ${
                        isDark
                          ? 'bg-[#006073] border-[#D4AF37]/30 text-[#F7F4EB] hover:border-[#D4AF37]'
                          : 'bg-[#FAF7F2] border-[#D4AF37]/40 text-[#062B35] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-[11px] font-cinzel text-[#D4AF37] block">
                            PARIS PLACE VENDÔME FLAGSHIP
                          </strong>
                          <span className="text-xs font-mono font-bold">+33 (0) 1 42 68 55 00</span>
                          <span className="text-[10px] text-[#8EAAB0] block">Tue–Sat 10AM–7PM CET</span>
                        </div>
                        <Phone className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                    </a>
                  </div>

                  <div className="pt-2">
                    <a
                      href="tel:+17862383631"
                      className="w-full py-2.5 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-2 shadow"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>One-Touch Direct Call</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertically Aligned Floating Realistic 3D Action Buttons */}
      <div className="flex flex-col items-center gap-3.5">
        {/* Realistic 3D Atelier Phone Hotline Button */}
        <div className="relative group flex items-center justify-center">
          {/* Tooltip Label */}
          <div className="absolute right-full mr-3.5 px-3 py-1.5 bg-[#006073]/95 text-[#F3E5AB] border border-[#D4AF37]/70 text-[11px] font-cinzel tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-[0_8px_20px_rgba(0,96,115,0.6)] pointer-events-none z-50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>Call JAC GHRÉ (+1 786 238 3631)</span>
          </div>

          <a
            href="tel:+17862383631"
            aria-label="Call JAC GHRÉ"
            className="relative w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer select-none"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #FFF5D0 0%, #E6C875 35%, #D4AF37 65%, #9E7919 90%, #5E4608 100%)',
              boxShadow:
                '0 12px 28px rgba(0,0,0,0.5), 0 4px 10px rgba(212,175,55,0.4), inset 0 2px 3px rgba(255,255,255,0.85), inset 0 -3px 5px rgba(0,0,0,0.4)',
              border: '2px solid rgba(255,248,220,0.8)',
            }}
          >
            {/* Glossy Top Glass Arc Highlight */}
            <div
              className="absolute top-1 inset-x-2.5 h-4 rounded-t-full pointer-events-none opacity-70"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0))',
              }}
            />

            <Phone className="w-5 h-5 text-[#041D24] filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]" />
          </a>
        </div>

        {/* Realistic 3D Authentic WhatsApp Button */}
        <div className="relative group flex items-center justify-center">
          {/* Tooltip Label */}
          <div className="absolute right-full mr-3.5 px-3 py-1.5 bg-[#006073]/95 text-[#25D366] border border-[#25D366]/70 text-[11px] font-cinzel tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-[0_8px_20px_rgba(0,96,115,0.6)] pointer-events-none z-50 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>Chat on WhatsApp (Live)</span>
          </div>

          <button
            onClick={() => {
              if (isOpen && activeTab === 'whatsapp') {
                setIsOpen(false);
              } else {
                setActiveTab('whatsapp');
                setIsOpen(true);
              }
            }}
            aria-label="WhatsApp Concierge"
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer select-none"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #4EFA8B 0%, #2BE06E 30%, #25D366 60%, #128C7E 88%, #075E54 100%)',
              boxShadow:
                '0 14px 32px rgba(18,140,126,0.55), 0 4px 12px rgba(0,0,0,0.45), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(0,0,0,0.45)',
              border: '2.5px solid rgba(255,255,255,0.9)',
            }}
          >
            {/* Glossy Top Reflection Arc */}
            <div
              className="absolute top-1.5 inset-x-3 h-4 rounded-t-full pointer-events-none opacity-85"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0))',
              }}
            />

            {/* Official Authentic WhatsApp Vector Icon */}
            <svg
              className="w-7 h-7 fill-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] relative z-10"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>

            {/* Live Online Ping Beacon Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37] border-2 border-[#006073]" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
