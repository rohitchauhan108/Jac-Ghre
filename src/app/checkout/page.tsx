'use client'
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ShoppingBag, CheckCircle, ArrowLeft, Sparkles, CreditCard, Truck, MapPin, Loader2, AlertCircle, Banknote, QrCode, LogIn } from 'lucide-react';
import { useShop, CartItem } from '../../context/ShopContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { createOrder, PaymentMethod } from '@/services/orderAPI';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartTotal,
    currencySymbol,
    currencyRate,
  } = useShop();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login?redirect=/checkout');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
        address: user.address || prev.address,
        city: user.city || prev.city,
        state: user.state || prev.state,
        pincode: user.pincode || prev.pincode,
      }));
    }
  }, [user]);

  const subtotalUSD = cartTotal;
  const freeShippingThresholdINR = 499;
  const subtotalINR = subtotalUSD * currencyRate;
  const shippingFeeINR = subtotalINR >= freeShippingThresholdINR || subtotalINR === 0 ? 0 : 49;
  const totalINR = subtotalINR + shippingFeeINR;

  const subtotalFormatted = `${currencySymbol}${subtotalINR.toFixed(0)}`;
  const shippingFormatted = shippingFeeINR === 0 ? 'Complimentary' : `${currencySymbol}${shippingFeeINR.toFixed(0)}`;
  const totalFormatted = `${currencySymbol}${totalINR.toFixed(0)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const mapCartToOrderItems = (items: CartItem[]) => {
    return items.map((item) => {
      const productId = item.ProductId || item.product.id;
      const weight = item.selectedSize || item.product.size || 'standard';
      return {
        productId,
        weight,
        quantity: item.quantity,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.replace('/login?redirect=/checkout');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    const { name, phone, email, address, city, state, pincode } = formData;
    if (!name || !phone || !email || !address || !city || !state || !pincode) {
      setError('Please fill in all delivery details, including city, state and pincode.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number (minimum 10 digits).');
      return;
    }
    if (!/^\d{6}$/.test(pincode.replace(/\D/g, ''))) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const items = mapCartToOrderItems(cart);
      const response = await createOrder({
        items,
        customer: {
          customerName: name.trim(),
          email: email.trim(),
          phone: phone.replace(/\D/g, ''),
          address: address.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.replace(/\D/g, ''),
        },
        paymentMethod,
      });

      setPlacedOrderId(response.order?.orderId || '');
      setOrderPlaced(true);

      if (response.payment && response.payment.redirectUrl) {
        window.location.href = response.payment.redirectUrl;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
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

  if (!isAuthenticated) {
    return null;
  }

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
              className="group inline-flex items-center gap-2 text-xs text-[#D4AF37] hover:text-[#F3E5AB] transition-all tracking-widest uppercase bg-[#097B8A]/40 px-4 py-2 rounded-full border border-[#D4AF37]/20 backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Return to Atelier
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#097B8A]/60 via-[#0C8A9B] to-[#097B8A]/60 border border-[#D4AF37]/40 rounded-full shadow-2xl mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
              Bespoke Encrypted Checkout
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.15em] text-[#FBF9F3] uppercase text-center">
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
              <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">Acquisition Confirmed</span>
              <h3 className="text-3xl font-light text-[#FBF9F3]">Atelier Dispatch</h3>
            </div>
            {placedOrderId && (
              <div className="py-3 px-4 bg-[#06242B]/60 border border-[#D4AF37]/30 rounded-xl">
                <span className="block font-outfit text-[10px] uppercase tracking-[0.25em] text-[#8EAAB0] mb-1">Private Order Reference</span>
                <span className="font-cinzel text-xl text-[#D4AF37] tracking-wider">#{placedOrderId}</span>
              </div>
            )}
            <p className="font-outfit text-xl text-[#C4D8DC] leading-relaxed">
              Esteemed <span className="text-[#D4AF37] font-medium">{formData.name}</span>, your private order has been securely registered. Confirmation correspondence and curation updates have been transmitted to <span className="text-[#D4AF37]">{formData.email}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/account')}
                className="flex-1 py-4 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#D4AF37]/10 transition-all shadow-xl rounded-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Track Orders
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 py-4 bg-[#D4AF37] text-[#06242B] text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#E2C358] transition-all shadow-xl rounded-xl"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART STATE */
          <div className="max-w-md mx-auto bg-[#097B8A]/60 border border-[#D4AF37]/30 rounded-2xl shadow-2xl p-10 text-center space-y-5 backdrop-blur-md">
            <div className="w-16 h-16 bg-[#06242B]/50 border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7 text-[#D4AF37]/60" />
            </div>
            <h3 className="text-2xl font-light text-[#FBF9F3]">Your Bag is Empty</h3>
            <p className="font-outfit text-xs text-[#C4D8DC] leading-relaxed">No creations have been selected for your ritual bag. Explore the atelier to curate your collection.</p>
            <button
              onClick={() => router.push('/shop')}
              className="w-full py-3.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#06242B] text-xs tracking-[0.2em] uppercase transition-all rounded-lg"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          /* MAIN CHECKOUT GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Form & Cart items */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Error Banner */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/40 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="font-outfit text-xs text-red-200">{error}</p>
                </div>
              )}

              {/* Delivery Details Form */}
              <div className="bg-[#097B8A]/40 border border-[#D4AF37]/25 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6 border-b border-[#D4AF37]/15 pb-4">
                  <div className="p-2 bg-[#006e83] border border-[#D4AF37]/30 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#FBF9F3] tracking-wide uppercase">
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
                      className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-xl transition-all"
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
                        placeholder="+91 98765 43210"
                        required
                        className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-xl transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@jac-ghre.com"
                        required
                        className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-xl transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">Delivery Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, apartment, suite, building"
                      rows={3}
                      required
                      className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-xl transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        required
                        className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-xl transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Maharashtra"
                        required
                        className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-xl transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="400001"
                        required
                        className="w-full px-4 py-3.5 bg-[#06242B]/70 border border-[#D4AF37]/30 rounded-xl text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-outfit text-xl transition-all"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#006e83] border border-[#D4AF37]/30 rounded-lg">
                        <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-[#FBF9F3] tracking-wide uppercase">
                          Payment Method
                        </h3>
                        <p className="font-outfit text-xs text-[#8EAAB0]">Choose your preferred settlement</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {([
                        { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
                        { id: 'upi', label: 'UPI', icon: QrCode },
                        { id: 'card', label: 'Card', icon: CreditCard },
                        { id: 'netbanking', label: 'Net Banking', icon: ShieldCheck },
                      ] as const).map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = paymentMethod === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setPaymentMethod(opt.id as PaymentMethod)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                              isSelected
                                ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                                : 'bg-[#06242B]/50 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-[#D4AF37]' : 'text-[#8EAAB0]'}`} />
                            <span className={`font-outfit text-[10px] tracking-widest uppercase ${isSelected ? 'text-[#FBF9F3] font-bold' : 'text-[#8EAAB0]'}`}>
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
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
                    <h3 className="text-base font-bold text-[#FBF9F3] tracking-wide uppercase">
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
                            <p className="text-xl font-medium text-[#FBF9F3] line-clamp-1">{item.product.name}</p>
                            <p className="font-outfit text-xs text-[#8EAAB0]">Qty: {item.quantity} {item.product.size ? `• ${item.product.size}` : ''}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-[#D4AF37] shrink-0 text-xl">
                          {currencySymbol}{itemTotal.toFixed(0)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Financial Summary */}
                <div className="space-y-3 font-outfit text-xl text-[#C4D8DC] border-t border-b border-[#D4AF37]/20 py-4">
                  <div className="flex justify-between">
                    <span className="text-xs tracking-wider uppercase">Subtotal</span>
                    <span className="text-[#FBF9F3]">{subtotalFormatted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs tracking-wider uppercase block">Courier Transit</span>
                      {shippingFeeINR > 0 && (
                        <span className="text-[10px] text-[#8EAAB0]">Complimentary over {currencySymbol}{freeShippingThresholdINR}</span>
                      )}
                    </div>
                    <span className="text-[#D4AF37]">{shippingFormatted}</span>
                  </div>
                </div>

                {/* Total Balance */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-xl font-bold text-[#FBF9F3] uppercase tracking-wider">Total Investment</span>
                  <span className="text-2xl font-bold text-[#D4AF37]">{totalFormatted}</span>
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
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#E6C65C] to-[#D4AF37] text-[#06242B] text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-2xl rounded-xl cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>Authorize & Pay ({totalFormatted})</span>
                    </>
                  )}
                </button>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}