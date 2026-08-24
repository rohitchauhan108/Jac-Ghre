'use client';

import React from 'react';
import { ShopProvider } from '@/context/ShopContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { CartDrawer, WishlistDrawer } from '@/components/ui/CartDrawer';
import { SearchModal } from '@/components/ui/SearchModal';
import { WelcomeModal } from '@/components/ui/WelcomeModal';
import { FloatingConcierge } from '@/components/ui/FloatingConcierge';
import { SmoothScroll } from '@/components/common/SmoothScroll';
import { CustomCursor } from '@/components/common/CustomCursor';

export default function AppShell({ children }: { children?: React.ReactNode }) {
  return (
    <ShopProvider>
      <SmoothScroll>
        <CustomCursor />
        <div
          className="min-h-screen font-poppins selection:bg-[#D4AF37] selection:text-[#097B8A] relative transition-colors duration-300 bg-[#0C8A9B] text-[#F7F4EB]"
        >
          <AnnouncementBar />
          <Header />
          <main className="min-h-[70vh]">
            {children}
          </main>
          <Footer />
          <QuickViewModal />
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <WelcomeModal />
          <FloatingConcierge />
        </div>
      </SmoothScroll>
    </ShopProvider>
  );
}
