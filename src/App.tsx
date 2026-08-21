/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { CartDrawer, WishlistDrawer } from './components/ui/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { WelcomeModal } from './components/ui/WelcomeModal';
import { FloatingConcierge } from './components/ui/FloatingConcierge';
import { SmoothScroll } from './components/common/SmoothScroll';
import { CustomCursor } from './components/common/CustomCursor';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { HairCarePage } from './pages/HairCarePage';
import { SunBodyPage } from './pages/SunBodyPage';
import { FragrancePage } from './pages/FragrancePage';
import { JacGhrePage } from './pages/JacGhrePage';
import { AboutCompanyPage } from './pages/AboutCompanyPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage />;
      case 'about-founder':
      case 'jac-ghre':
        return <JacGhrePage />;
      case 'about-company':
        return <AboutCompanyPage />;
      case 'contact':
        return <ContactPage />;
      case 'hair-care':
        return <HairCarePage />;
      case 'sun-body':
        return <SunBodyPage />;
      case 'fragrance':
        return <FragrancePage />;
      case 'journal':
        return <JournalPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className="min-h-screen font-poppins selection:bg-[#D4AF37] selection:text-[#006073] relative transition-colors duration-300 bg-[#007288] text-[#F7F4EB]"
    >
      {/* Top Announcement Bar with "Website is Coming Soon" */}
      <AnnouncementBar />

      {/* Floating / Sticky Navigation Header with Dark/Light Toggle */}
      <Header />

      {/* Dynamic Page Content */}
      <main className="min-h-[70vh]">
        {renderCurrentPage()}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Global Drawers, Modals & Floating Tools */}
      <QuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      
      {/* First-Time Coming Soon & VIP Privilege Popup */}
      <WelcomeModal />

      {/* Floating WhatsApp and Call Concierge Widgets */}
      <FloatingConcierge />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <SmoothScroll>
        <CustomCursor />
        <AppContent />
      </SmoothScroll>
    </ShopProvider>
  );
}
