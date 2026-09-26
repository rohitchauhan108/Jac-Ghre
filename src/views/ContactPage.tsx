import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, HelpCircle, ChevronDown, AlertCircle, Loader2 } from 'lucide-react';
import { GoldEmblem } from '../components/ui/GoldEmblem';
import { BRAND_INFO } from '../data/products';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
};

const initialForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  inquiryType: 'Product & Hair Care Consultation',
  message: '',
};

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialForm);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      setError('Please fill in your name, phone number, and a brief message.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number (minimum 10 digits).');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || '',
          phone: formData.phone,
          inquiryType: formData.inquiryType,
          message: formData.message,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Failed to send message (${res.status}). Please try again.`);
      }
      setFormData(initialForm);
      setFormSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How fast is international shipping for GHRÉ creations?',
      a: 'We offer complimentary express courier shipping on all orders over $150. Domestic US and EU orders typically arrive within 2-3 business days in our signature luxury gold coffret.',
    },
    {
      q: 'Are GHRÉ products suitable for keratin-treated or color-processed hair?',
      a: 'Yes, absolutely. Every formulation is 100% free from harsh sulfates, parabens, and stripping salts. Our bamboo marrow and hydrolyzed silk proteins actively extend the lifespan of salon color and keratin smoothing treatments.',
    },
    {
      q: 'Do you offer fragrance and hair care samples?',
      a: 'Every couture order includes 3 complimentary deluxe discovery samples. You may also purchase our 4-piece Fragrance Discovery Coffret which includes a $45 voucher towards a full-size flacon.',
    },
    {
      q: 'How do I book a private consultation with Jac Ghré?',
      a: 'You can submit an inquiry through our Atelier Concierge form on the Jac Ghré page, or contact our private client styling desk at Ghrebeauty@gmail.com.',
    },
  ];

  return (
    <div className="pb-28 bg-[#0C8A9B] min-h-screen">
      {/* Hero Header Banner */}
      <section className="relative py-20 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#097B8A] via-[#0C8A9B] to-[#097B8A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#097B8A] border border-[#D4AF37]/50 mb-4 shadow-md">
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs  font-semibold tracking-[0.3em] text-[#F3E5AB] uppercase">
              CLIENT SERVICES & ATELIER CONCIERGE
            </span>
          </div>

          <h1 className=" text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
            Contact & Client Care
          </h1>

          <p className="mt-4 max-w-2xl mx-auto font-editorial text-2xl sm:text-3xl italic text-[#D4AF37]">
            “Our dedicated team of trichology advisors and fragrance concierges is at your disposal.”
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Contact Information & Flagships */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#097B8A] border border-[#D4AF37]/35 p-6 sm:p-8 shadow-xl">
              <h3 className=" text-xl font-bold text-[#F7F4EB] uppercase mb-6 flex items-center gap-2">
                <GoldEmblem size={20} withGlow />
                <span>MIÀMI SPA & BEAUTY SALON</span>
              </h3>

              <div className="space-y-4 mb-6 border-b border-[#D4AF37]/20 pb-6">
                <div className="text-[#F7F4EB] space-y-2">
                  <div className=" text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                    JAC GHRÉ
                  </div>
                  <div className=" text-base font-bold text-[#F3E5AB] uppercase">
                    AMBASSADOR FOR EXCELLENCE
                  </div>
                  <div className=" text-base font-bold text-[#F3E5AB] uppercase">
                    BEAUTY EXPERT & CONSULTANT
                  </div>
                  <p className="font-poppins text-xs sm:text-xl text-[#C5D5D8]">
                    International Hair Designer
                  </p>
                  <p className="font-poppins text-xs sm:text-xl text-[#C5D5D8]">
                    Luxury Hair Care
                  </p>
                  <p className="font-poppins text-xs sm:text-xl text-[#C5D5D8]">
                    American Beauty Company. LLC
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className=" text-xl font-bold text-[#F3E5AB] uppercase">
                      Flagship Atelier
                    </h4>
                    <p className="font-poppins text-xs sm:text-xl text-[#8EAAB0] mt-0.5">
                      Global Service
                    </p>
                  </div>
                </div> */}

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className=" text-xl font-bold text-[#F3E5AB] uppercase">
                      PRIVATE SPA & BEAUTY SALON
                    </h4>
                    <p className="font-poppins text-xs sm:text-xl text-[#8EAAB0] mt-0.5">
                      GLOBAL PRIVATE CLIENT SERVICE
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className=" text-xl font-bold text-[#F3E5AB] uppercase">
                      Private Studio
                    </h4>
                    <p className="font-poppins text-xs sm:text-xl text-[#8EAAB0] mt-0.5">
                      Route des Plages, 83350 Ramatuelle, France
                    </p>
                  </div>
                </div> */}
              </div>

              <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-xl text-[#B5CAD0] font-poppins">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>Ghrebeauty@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-xl text-[#B5CAD0] font-poppins">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Cell USA: (1) 786 238 3631</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-xl text-[#B5CAD0] font-poppins">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Concierge desk available 24/7 for VIP clients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-[#097B8A] border-2 border-[#D4AF37]/50 p-6 sm:p-10 shadow-2xl">
            <h3 className=" text-2xl font-bold text-[#F7F4EB] uppercase mb-2">
              Send a Message
            </h3>
            <p className="font-poppins text-xl text-[#8EAAB0] mb-8">
              Whether you need personalized hair care recommendations, order assistance, or wholesale inquiries, our team is here for you.
            </p>

            {formSubmitted ? (
              <div className="p-8 bg-[#097B8A] border border-[#D4AF37] text-center">
                <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
                <h4 className=" text-xl font-bold text-[#F7F4EB] uppercase">
                  Message Sent Successfully
                </h4>
                <p className="font-poppins text-xl text-[#B5CAD0] mt-2">
                  Thank you for contacting GHRÉ. A dedicated beauty advisor will reply to your inquiry within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/40 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="font-poppins text-sm text-red-200">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-[#097B8A] border border-[#D4AF37]/40 text-xl text-[#F7F4EB] placeholder-[#8EAAB0] font-poppins outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-[#097B8A] border border-[#D4AF37]/40 text-xl text-[#F7F4EB] placeholder-[#8EAAB0] font-poppins outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#097B8A] border border-[#D4AF37]/40 text-xl text-[#F7F4EB] placeholder-[#8EAAB0] font-poppins outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                      Inquiry Topic
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#097B8A] border border-[#D4AF37]/40 text-xl text-[#F7F4EB] font-poppins outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option>Product & Hair Care Consultation</option>
                      <option>Order Tracking & Shipping</option>
                      <option>Wholesale & Luxury Salon Inquiries</option>
                      <option>Press & Editorial Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="How may our concierges assist you today?"
                    className="w-full px-4 py-3 bg-[#097B8A] border border-[#D4AF37]/40 text-xl text-[#F7F4EB] placeholder-[#8EAAB0] font-poppins outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-[#006073]  text-xs sm:text-xl font-semibold tracking-[0.2em] uppercase hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-8 sm:p-12 bg-[#097B8A] border border-[#D4AF37]/35 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <HelpCircle className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
            <h3 className=" text-2xl font-bold text-[#F7F4EB] uppercase">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="border border-[#D4AF37]/30 bg-[#097B8A] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between  text-xl sm:text-base font-bold text-[#F7F4EB] hover:text-[#D4AF37]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D4AF37] transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 font-poppins text-xl text-[#B5CAD0] leading-relaxed border-t border-[#D4AF37]/15 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
