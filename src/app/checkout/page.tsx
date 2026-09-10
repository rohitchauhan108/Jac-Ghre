'use client'
import React, { useState } from 'react';
import { ShieldCheck, Lock, ShoppingBag, CheckCircle, ArrowLeft, Sparkles, CreditCard, Truck, MapPin } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartTotal,
    currencySymbol,
    currencyRate,
  } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotalUSD = cartTotal;
  const freeShippingThreshold = 150;
  const shippingFeeUSD = subtotalUSD >= freeShippingThreshold || subtotalUSD === 0 ? 0 : 15.00;
  const totalUSD = subtotalUSD + shippingFeeUSD;

  const subtotalFormatted = `${currencySymbol}${(subtotalUSD * currencyRate).toFixed(2)}`;
  const shippingFormatted = shippingFeeUSD === 0 ? 'Complimentary' : `${currencySymbol}${(shippingFeeUSD * currencyRate).toFixed(2)}`;
  const totalFormatted = `${currencySymbol}${(totalUSD * currencyRate).toFixed(2)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      alert('Please fill in all the details for your delivery.');
      return;
    }

    const orderData = {
      customer: formData,
      items: cart,
      currency: currencySymbol,
      total: totalUSD * currencyRate,
    };

    console.log('Order Submitted:', orderData);
    setOrderPlaced(true);
  };

  return (
    <div className="bg-[#006e83] min-h-screen text-[#FBF9F3] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0C8A9B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-full flex justify-start mb-6">
            <button 
              onClick={() => router.push('/')}
              className="group inline-flex items-center gap-2 text-xs font-cinzel text-[#D4AF37] hover:text-[#F3E5AB] transition-all tracking-widest uppercase bg-[#097B8A]/40 px-4 py-2 rounded-full border border-[#D4AF37]/20 backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Return to Atelier
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#097B8A]/60 via-[#0C8A9B] to-[#097B8A]/60 border border-[#D4AF37]/40 rounded-full shadow-2xl mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-cinzel font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
              Bespoke Encrypted Checkout
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.15em] text-[#FBF9F3] uppercase text-center">
            Finalize Your <span className="text-[#D4AF37] font-normal">Ritual</span>
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-5" />
        </div>

        {orderPlaced ? (
          /* SUCCESS STATE */
          <div className="max-w-lg mx-auto bg-gradient-to-b from-[#097B8A] to-[#06242B] border-2 border-[#D4AF37] rounded-2xl shadow-2xl p-10 text-center space-y-6 backdrop-blur-xl">
            <div className="w-20 h-20 bg-[#06242B] border border-[#D4AF37]/50 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">Acquisition Confirmed</span>
              <h3 className="font-cinzel text-3xl font-light text-[#FBF9F3]">Atelier Dispatch</h3>
            </div>
            <p className="font-outfit text-sm text-[#C4D8DC] leading-relaxed">
              Esteemed <span className="text-[#D4AF37] font-medium">{formData.name}</span>, your private order has been securely registered. Confirmation correspondence and curation updates have been transmitted to <span className="text-[#D4AF37]">{formData.email}</span>.
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full py-4 bg-[#D4AF37] text-[#06242B] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#E2C358] transition-all shadow-xl rounded-lg"
            >
              Return to Gallery
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART STATE */
          <div className="max-w-md mx-auto bg-[#097B8A]/60 border border-[#D4AF37]/30 rounded-2xl shadow-2xl p-10 text-center space-y-5 backdrop-blur-md">
            <div className="w-16 h-16 bg-[#06242B]/50 border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7 text-[#D4AF37]/60" />
            </div>
            <h3 className="font-cinzel text-2xl font-light text-[#FBF9F3]">Your Bag is Empty</h3>
            <p className="font-outfit text-xs text-[#C4D8DC] leading-relaxed">No creations have been selected for your ritual bag. Explore the atelier to curate your collection.</p>
            <button
              onClick={() => router.push('/')}
              className="w-full py-3.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#06242B] font-cinzel text-xs tracking-[0.2em] uppercase transition-all rounded-lg"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          /* MAIN CHECKOUT GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Form & Cart items */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Details Form */}
              <div className="bg-[#097B8A]/40 border border-[#D4AF37]/25 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6 border-b border-[#D4AF37]/15 pb-4">
                  <div className="p-2 bg-[#006e83] border border-[#D4AF37]/30 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-medium text-[#FBF9F3] tracking-wide uppercase">
                      Destination Details
                    </h3>
                    <p className="font-outfit text-xs text-[#8EAAB0]">Where shall we dispatch your curated items?</p>
                  </div>
                </div>
                
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Victoria Windsor"
                      required
                      className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 019-2834"
                        required
                        className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="victoria@luxury.com"
                        required
                        className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">Delivery Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, apartment, suite, city, postal code"
                      rows={3}
                      required
                      className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-sm transition-all resize-none"
                    ></textarea>
                  </div>
                </form>
              </div>

              {/* Express Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#097B8A]/25 border border-[#D4AF37]/15 rounded-xl flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div className="text-xs font-outfit text-[#C4D8DC]">
                    <span className="font-semibold text-[#FBF9F3] block">White-Glove Transit</span>
                    Insured discrete packaging
                  </div>
                </div>
                <div className="p-4 bg-[#097B8A]/25 border border-[#D4AF37]/15 rounded-xl flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div className="text-xs font-outfit text-[#C4D8DC]">
                    <span className="font-semibold text-[#FBF9F3] block">Flexible Clearance</span>
                    Encrypted gateway processing
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Summary & Order Items */}
            <div className="lg:col-span-5 space-y-6 sticky top-6">
              
              <div className="bg-gradient-to-b from-[#097B8A]/80 to-[#06242B] border-2 border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-cinzel text-base font-bold text-[#FBF9F3] tracking-wide uppercase">
                      Curated Bag
                    </h3>
                  </div>
                  <span className="text-xs font-outfit bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 rounded-full">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
                  </span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#D4AF37]/10 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {cart.map((item) => {
                    const itemTotal = item.product.price * currencyRate * item.quantity;
                    return (
                      <div key={item.product.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 bg-[#06242B] border border-[#D4AF37]/30 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-inner">
                            <img src={item.product.image} alt={item.product.name} className="max-h-full object-contain filter drop-shadow" />
                          </div>
                          <div>
                            <p className="font-cinzel text-sm font-medium text-[#FBF9F3] line-clamp-1">{item.product.name}</p>
                            <p className="font-outfit text-xs text-[#8EAAB0]">Qty: {item.quantity} {item.product.size ? `• ${item.product.size}` : ''}</p>
                          </div>
                        </div>
                        <span className="font-cinzel font-semibold text-[#D4AF37] shrink-0 text-sm">
                          {currencySymbol}{itemTotal.toFixed(0)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Financial Summary */}
                <div className="space-y-3 font-outfit text-sm text-[#C4D8DC] border-t border-b border-[#D4AF37]/20 py-4">
                  <div className="flex justify-between">
                    <span className="text-xs tracking-wider uppercase">Subtotal</span>
                    <span className="font-cinzel text-[#FBF9F3]">{subtotalFormatted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs tracking-wider uppercase block">Courier Transit</span>
                      {shippingFeeUSD > 0 && (
                        <span className="text-[10px] text-[#8EAAB0]">Complimentary over ${freeShippingThreshold}</span>
                      )}
                    </div>
                    <span className="font-cinzel text-[#D4AF37]">{shippingFormatted}</span>
                  </div>
                </div>

                {/* Total Balance */}
                <div className="flex justify-between items-center py-1">
                  <span className="font-cinzel text-sm font-bold text-[#FBF9F3] uppercase tracking-wider">Total Investment</span>
                  <span className="font-cinzel text-2xl font-bold text-[#D4AF37]">{totalFormatted}</span>
                </div>

                {/* Security Tag */}
                <div className="flex items-center gap-2.5 text-xs text-[#8EAAB0] bg-[#06242B]/60 p-3 rounded-xl border border-[#D4AF37]/20">
                  <Lock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-[11px] font-outfit tracking-wide">256-Bit Encrypted Atelier Protocol</span>
                </div>

                {/* Pay Action Button */}
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#E6C65C] to-[#D4AF37] text-[#06242B] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-2xl rounded-xl cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <ShieldCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Authorize & Pay ({totalFormatted})</span>
                </button>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}