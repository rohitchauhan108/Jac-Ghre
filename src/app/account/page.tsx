'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User, Mail, Phone, MapPin, ArrowLeft, Sparkles, Package, LogOut,
  Edit3, Save, Loader2, ShoppingBag, AlertCircle, CheckCircle2, ChevronDown,
  CreditCard, Calendar, Truck, MapPinned,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { PublicUser, Order } from '@/services/authAPI';

type Tab = 'overview' | 'orders' | 'profile';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, loadOrders, orders, isOrdersLoading, updateUserProfile, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Omit<PublicUser, 'id' | 'email' | 'joinedDate'>>>({});
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated, loadOrders]);

  useEffect(() => {
    if (user && isEditing) {
      setEditForm({
        name: user.name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
      });
    }
  }, [user, isEditing]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      logout();
      router.push('/');
    } finally {
      setLoggingOut(false);
    }
  };

  const startEdit = () => {
    if (!user) return;
    setEditError('');
    setEditSuccess('');
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditError('');
    setEditSuccess('');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
    if (editError) setEditError('');
    if (editSuccess) setEditSuccess('');
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name || editForm.name.trim().length < 2) {
      setEditError('Name must be at least 2 characters.');
      return;
    }
    if (editForm.phone && editForm.phone.replace(/\D/g, '').length < 10) {
      setEditError('Please enter a valid phone number.');
      return;
    }
    try {
      setIsSaving(true);
      setEditError('');
      await updateUserProfile({
        name: editForm.name?.trim(),
        phone: editForm.phone,
        address: editForm.address,
        city: editForm.city,
        state: editForm.state,
        pincode: editForm.pincode,
      });
      setEditSuccess('Profile updated successfully.');
      setIsEditing(false);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const statusBadge = useMemo(() => (status: string) => {
    const s = status.toLowerCase();
    let label = status;
    let color = 'bg-[#097B8A] text-[#F3E5AB] border-[#D4AF37]/30';
    if (s === 'paid' || s === 'cod_pending') {
      label = 'Confirmed';
      color = 'bg-[#103C26]/60 text-[#81E6A6] border-[#D4AF37]/30';
    } else if (s === 'pending') {
      label = 'Awaiting Payment';
      color = 'bg-[#3d2f09]/60 text-[#E8C86A] border-[#D4AF37]/30';
    } else if (s.includes('ship')) {
      label = 'Shipped';
      color = 'bg-[#0C8A9B]/40 text-[#AEE8F1] border-[#D4AF37]/30';
    } else if (s.includes('deliv')) {
      label = 'Delivered';
      color = 'bg-[#103C26]/60 text-[#81E6A6] border-[#D4AF37]/30';
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-cinzel tracking-widest uppercase ${color}`}>
        {label}
      </span>
    );
  }, []);

  const formatINR = (value: number) => `₹${(value || 0).toFixed(0)}`;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (authLoading) {
    return (
      <div className="bg-[#006e83] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="bg-[#006e83] min-h-screen text-[#FBF9F3] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0C8A9B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="w-full flex justify-start mb-6">
          <button
            onClick={() => router.push('/')}
            className="group inline-flex items-center gap-2 text-xs font-cinzel text-[#D4AF37] hover:text-[#F3E5AB] transition-all tracking-widest uppercase bg-[#097B8A]/40 px-4 py-2 rounded-full border border-[#D4AF37]/20 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Return to Atelier
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#097B8A]/60 via-[#0C8A9B] to-[#097B8A]/60 border border-[#D4AF37]/40 rounded-full shadow-2xl mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span className="text-[10px] font-cinzel font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
                Private Client Dashboard
              </span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-light tracking-[0.15em] text-[#FBF9F3] uppercase">
              Welcome, <span className="text-[#D4AF37] font-normal">{user.name.split(' ')[0]}</span>
            </h1>
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4" />
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#097B8A]/50 hover:bg-red-900/40 border border-[#D4AF37]/30 hover:border-red-400/40 rounded-xl text-xs font-cinzel tracking-[0.2em] uppercase text-[#D4AF37] hover:text-red-300 transition-all disabled:opacity-50"
          >
            {loggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-[#D4AF37]/20 pb-1">
          {([
            { id: 'overview', label: 'Overview', icon: Sparkles },
            { id: 'orders', label: 'My Orders', icon: ShoppingBag },
            { id: 'profile', label: 'Profile', icon: User },
          ] as const).map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative inline-flex items-center gap-2 px-5 py-3 text-xs font-cinzel tracking-[0.25em] uppercase transition-all rounded-t-xl ${
                  isActive
                    ? 'text-[#006073] bg-white border-t border-l border-r border-[#D4AF37]/40'
                    : 'text-[#8EAAB0] hover:text-[#C4D8DC]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {t.id === 'orders' && orders.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[10px] text-[#D4AF37] border border-[#D4AF37]/30">
                    {orders.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-gradient-to-b from-[#097B8A]/70 to-[#06242B]/50 border border-[#D4AF37]/30 rounded-2xl shadow-xl">
                  <ShoppingBag className="w-6 h-6 text-[#D4AF37] mb-3" />
                  <div className="font-cinzel text-3xl font-bold text-[#FBF9F3]">{orders.length}</div>
                  <div className="font-outfit text-xs text-[#8EAAB0] uppercase tracking-widest mt-1">Total Orders</div>
                </div>
                <div className="p-5 bg-gradient-to-b from-[#097B8A]/70 to-[#06242B]/50 border border-[#D4AF37]/30 rounded-2xl shadow-xl">
                  <Package className="w-6 h-6 text-[#D4AF37] mb-3" />
                  <div className="font-cinzel text-3xl font-bold text-[#FBF9F3]">
                    {orders.filter((o) => o.paymentStatus.toLowerCase().includes('paid') || o.paymentStatus.toLowerCase().includes('cod')).length}
                  </div>
                  <div className="font-outfit text-xs text-[#8EAAB0] uppercase tracking-widest mt-1">Confirmed</div>
                </div>
                <div className="p-5 bg-gradient-to-b from-[#097B8A]/70 to-[#06242B]/50 border border-[#D4AF37]/30 rounded-2xl shadow-xl col-span-2 sm:col-span-1">
                  <Calendar className="w-6 h-6 text-[#D4AF37] mb-3" />
                  <div className="font-cinzel text-sm font-bold text-[#FBF9F3] uppercase mt-4">{user.joinedDate || 'New Member'}</div>
                  <div className="font-outfit text-xs text-[#8EAAB0] uppercase tracking-widest mt-1">Member Since</div>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-gradient-to-b from-[#097B8A]/50 to-[#06242B]/60 border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-cinzel text-xl font-bold tracking-wider text-[#FBF9F3] uppercase flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                    Recent Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="font-outfit text-xs text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
                  >
                    View all →
                  </button>
                </div>
                {isOrdersLoading ? (
                  <div className="py-10 text-center">
                    <Loader2 className="w-7 h-7 text-[#D4AF37] mx-auto animate-spin mb-2" />
                    <p className="font-outfit text-xs text-[#8EAAB0]">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-10 text-center space-y-3">
                    <div className="w-16 h-16 bg-[#06242B]/50 border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-7 h-7 text-[#D4AF37]/60" />
                    </div>
                    <h4 className="font-cinzel text-lg font-light tracking-wide text-[#FBF9F3] uppercase">No Orders Yet</h4>
                    <p className="font-outfit text-xs text-[#8EAAB0] max-w-sm mx-auto">
                      Begin curating your ritual bag. Every order includes complimentary discovery samples.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 border border-white/50 text-white hover:bg-white hover:text-[#006073] font-cinzel text-xs tracking-[0.2em] uppercase transition-all rounded-lg"
                    >
                      Explore Collection
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order._id}
                        className="p-4 bg-[#06242B]/40 border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37]/40 transition-all cursor-pointer"
                        onClick={() => { setExpandedOrderId(order.orderId); setActiveTab('orders'); }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="font-cinzel text-sm font-bold tracking-wider text-[#D4AF37] uppercase">#{order.orderId}</div>
                            <div className="font-outfit text-xs text-[#8EAAB0] mt-0.5">{formatDate(order.createdAt)}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="font-cinzel text-lg font-bold text-[#FBF9F3]">{formatINR(order.total)}</div>
                              <div className="font-outfit text-[10px] text-[#8EAAB0] uppercase tracking-widest">{order.items.length} items</div>
                            </div>
                            {statusBadge(order.paymentStatus)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Side: Profile Card */}
            <div className="space-y-6">
              <div className="bg-gradient-to-b from-[#097B8A] to-[#06242B] border-2 border-[#D4AF37]/40 rounded-2xl p-6 shadow-2xl">
                <div className="text-center mb-5">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl border-2 border-[#F3E5AB]/50">
                    <span className="font-cinzel text-3xl font-bold text-[#006073]">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-[#FBF9F3] uppercase tracking-wide">{user.name}</h3>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                    <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                    <span className="font-outfit text-[10px] tracking-widest uppercase text-[#D4AF37]">Verified Patron</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#D4AF37]/20 pt-5">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-outfit text-[10px] uppercase tracking-widest text-[#8EAAB0]">Email</div>
                      <div className="font-outfit text-xs text-[#F7F4EB] break-all">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-outfit text-[10px] uppercase tracking-widest text-[#8EAAB0]">Phone</div>
                      <div className="font-outfit text-xs text-[#F7F4EB]">{user.phone}</div>
                    </div>
                  </div>
                  {user.city || user.address ? (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-outfit text-[10px] uppercase tracking-widest text-[#8EAAB0]">Address</div>
                        <div className="font-outfit text-xs text-[#F7F4EB] leading-relaxed">
                          {[user.address, user.city, user.state, user.pincode].filter(Boolean).join(', ') || '—'}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <button
                  onClick={() => setActiveTab('profile')}
                  className="w-full mt-5 py-2.5 border border-white text-white hover:bg-white hover:text-[#006073] font-cinzel text-xs tracking-[0.2em] uppercase transition-all rounded-lg flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-gradient-to-b from-[#097B8A]/50 to-[#06242B]/60 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-cinzel text-2xl font-bold tracking-wider text-[#FBF9F3] uppercase flex items-center gap-3">
                <Package className="w-6 h-6 text-white" />
                Order History
              </h3>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-white/50 text-white hover:bg-[#D4AF37]/10 font-cinzel text-[10px] tracking-[0.2em] uppercase rounded-lg transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>

            {isOrdersLoading ? (
              <div className="py-16 text-center">
                <Loader2 className="w-8 h-8 text-[#D4AF37] mx-auto animate-spin mb-3" />
                <p className="font-outfit text-sm text-[#8EAAB0]">Retrieving your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-24 h-24 bg-[#06242B]/50 border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h4 className="font-cinzel text-2xl font-light tracking-wide text-[#FBF9F3] uppercase mb-2">Your Order Archive</h4>
                  <p className="font-outfit text-sm text-[#8EAAB0] max-w-md mx-auto">
                    No orders yet. Explore the Ghré atelier and discover luxury hair rituals crafted by Jac Ghré.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 mt-2 px-6 py-3.5 bg-white text-[#006073] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-xl rounded-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Discover the Collection</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order: Order) => {
                  const isExpanded = expandedOrderId === order.orderId;
                  return (
                    <div
                      key={order._id}
                      className="bg-[#06242B]/50 border border-[#D4AF37]/30 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all"
                    >
                      <button
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.orderId)}
                        className="w-full p-5 flex flex-wrap items-center justify-between gap-4 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#097B8A] border border-[#D4AF37]/40 rounded-xl flex items-center justify-center shrink-0">
                            <Package className="w-5 h-5 text-[#D4AF37]" />
                          </div>
                          <div>
                            <div className="font-cinzel text-base font-bold tracking-wider text-[#D4AF37] uppercase">#{order.orderId}</div>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="font-outfit text-[10px] text-[#8EAAB0] flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(order.createdAt)}
                              </span>
                              <span className="font-outfit text-[10px] text-[#8EAAB0] flex items-center gap-1">
                                <ShoppingBag className="w-3 h-3" />
                                {order.items.length} items
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-cinzel text-xl font-bold text-[#FBF9F3]">{formatINR(order.total)}</div>
                            <div className="flex items-center gap-1 justify-end font-outfit text-[10px] text-[#8EAAB0] uppercase tracking-widest mt-0.5">
                              <CreditCard className="w-3 h-3" />
                              {order.paymentMethod}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {statusBadge(order.paymentStatus)}
                            <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-[#D4AF37]/20 p-5 sm:p-6 space-y-6 bg-[#06242B]/60">
                          {/* Delivery Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="p-4 bg-[#097B8A]/40 border border-[#D4AF37]/20 rounded-xl">
                              <h4 className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-3 flex items-center gap-2">
                                <MapPinned className="w-4 h-4" /> Delivery Details
                              </h4>
                              <div className="space-y-1.5 font-outfit text-xs text-[#C4D8DC]">
                                <div className="text-[#FBF9F3] font-semibold">{order.customer.customerName}</div>
                                <div>{order.customer.phone}</div>
                                <div>{order.customer.email}</div>
                                <div className="pt-1.5 border-t border-[#D4AF37]/10 mt-1.5">
                                  {order.customer.address},<br />
                                  {order.customer.city}, {order.customer.state} — {order.customer.pincode}
                                </div>
                              </div>
                            </div>
                            <div className="p-4 bg-[#097B8A]/40 border border-[#D4AF37]/20 rounded-xl">
                              <h4 className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-3 flex items-center gap-2">
                                <Truck className="w-4 h-4" /> Shipment Summary
                              </h4>
                              <div className="space-y-2 font-outfit text-xs text-[#C4D8DC]">
                                <div className="flex justify-between">
                                  <span>Estimated Delivery</span>
                                  <span className="text-[#FBF9F3] font-semibold">{formatDate(order.estimatedDelivery)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Payment</span>
                                  <span className="uppercase">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Status</span>
                                  {statusBadge(order.paymentStatus)}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Items */}
                          <div>
                            <h4 className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-3 flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4" /> Order Items
                            </h4>
                            <div className="divide-y divide-[#D4AF37]/15 border border-[#D4AF37]/20 rounded-xl overflow-hidden">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="p-4 flex items-center justify-between gap-4 bg-[#097B8A]/20 hover:bg-[#097B8A]/40 transition-all">
                                  <div>
                                    <div className="font-cinzel text-sm font-semibold text-[#FBF9F3]">{item.name}</div>
                                    <div className="font-outfit text-[10px] text-[#8EAAB0] uppercase tracking-widest mt-0.5">
                                      Variant: {item.weight} • Qty: {item.quantity}
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <div className="font-cinzel text-base font-bold text-[#D4AF37]">
                                      {formatINR(item.unitPrice * item.quantity)}
                                    </div>
                                    <div className="font-outfit text-[10px] text-[#8EAAB0]">
                                      {formatINR(item.unitPrice)} each
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Total */}
                          <div className="flex justify-end">
                            <div className="w-full sm:w-80 space-y-2 border border-[#D4AF37]/30 rounded-xl p-4 bg-[#097B8A]/40 font-outfit text-xs text-[#C4D8DC]">
                              <div className="flex justify-between">
                                <span className="uppercase tracking-wider">Subtotal</span>
                                <span className="text-[#FBF9F3] font-cinzel">{formatINR(order.subtotal)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="uppercase tracking-wider">Shipping</span>
                                <span className="text-[#FBF9F3] font-cinzel">
                                  {order.shipping === 0 ? 'Complimentary' : formatINR(order.shipping)}
                                </span>
                              </div>
                              {order.discount > 0 && (
                                <div className="flex justify-between text-[#E8C86A]">
                                  <span className="uppercase tracking-wider">Discount</span>
                                  <span>-{formatINR(order.discount)}</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-2 border-t border-[#D4AF37]/20 font-cinzel">
                                <span className="text-sm font-bold uppercase tracking-wider text-[#FBF9F3]">Total</span>
                                <span className="text-xl font-bold text-[#D4AF37]">{formatINR(order.total)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-gradient-to-b from-[#097B8A]/50 to-[#06242B]/60 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h3 className="font-cinzel text-2xl font-bold tracking-wider text-[#FBF9F3] uppercase flex items-center gap-3">
                <User className="w-6 h-6 text-[#D4AF37]" />
                Account Profile
              </h3>
              {!isEditing && (
                <button
                  onClick={startEdit}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-cinzel text-xs tracking-[0.2em] uppercase rounded-lg transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {editError && (
              <div className="mb-5 flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/40 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="font-outfit text-xs text-red-200">{editError}</p>
              </div>
            )}
            {editSuccess && (
              <div className="mb-5 flex items-start gap-3 p-4 bg-[#103C26]/40 border border-[#D4AF37]/40 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="font-outfit text-xs text-[#F3E5AB]">{editSuccess}</p>
              </div>
            )}

            <form onSubmit={saveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { key: 'name', label: 'Full Name', icon: User, type: 'text', required: true },
                { key: 'email', label: 'Email Address', icon: Mail, type: 'email', readonly: true },
                { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', required: true },
                { key: 'city', label: 'City', icon: MapPin, type: 'text' },
                { key: 'state', label: 'State', icon: MapPin, type: 'text' },
                { key: 'pincode', label: 'Pincode', icon: MapPinned, type: 'text' },
              ].map((field) => {
                const Icon = field.icon;
                const value = isEditing
                  ? (editForm as any)[field.key] ?? ''
                  : (user as any)[field.key] ?? '';
                const readOnly = field.readonly || !isEditing;
                return (
                  <div key={field.key}>
                    <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {field.label}
                        {field.readonly && <span className="text-[10px] text-[#D4AF37]/70">(verified)</span>}
                      </div>
                    </label>
                    <input
                      type={field.type}
                      name={field.key}
                      value={value}
                      onChange={handleEditChange}
                      readOnly={readOnly}
                      required={field.required && isEditing}
                      className={`w-full px-4 py-3.5 rounded-xl font-outfit text-sm transition-all ${
                        readOnly
                          ? 'bg-[#06242B]/30 border border-[#D4AF37]/15 text-[#C4D8DC] cursor-not-allowed'
                          : 'bg-[#06242B]/70 border border-[#D4AF37]/30 text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                      }`}
                      placeholder={isEditing ? `Enter your ${field.label.toLowerCase()}` : '—'}
                    />
                  </div>
                );
              })}

              <div className="md:col-span-2">
                <label className="block font-outfit text-[11px] uppercase tracking-widest text-[#C4D8DC] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Delivery Address
                  </div>
                </label>
                <textarea
                  name="address"
                  value={isEditing ? editForm.address ?? '' : user.address ?? ''}
                  onChange={handleEditChange}
                  readOnly={!isEditing}
                  rows={3}
                  placeholder={isEditing ? 'Street address, apartment, suite...' : '—'}
                  className={`w-full px-4 py-3.5 rounded-xl font-outfit text-sm transition-all resize-none ${
                    !isEditing
                      ? 'bg-[#06242B]/30 border border-[#D4AF37]/15 text-[#C4D8DC] cursor-not-allowed'
                      : 'bg-[#06242B]/70 border border-[#D4AF37]/30 text-[#FBF9F3] placeholder-[#8EAAB0]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                  }`}
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#D4AF37]/20">
                <div className="text-xs font-outfit text-[#8EAAB0] sm:mr-auto flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  Patron since <span className="text-[#D4AF37] font-semibold">{user.joinedDate || 'Now'}</span>
                </div>
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-6 py-3 border border-[#D4AF37]/30 text-[#8EAAB0] hover:text-[#FBF9F3] hover:border-[#D4AF37]/50 font-cinzel text-xs tracking-[0.2em] uppercase rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E6C65C] to-[#D4AF37] text-[#06242B] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-xl rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </>
                ) : null}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
