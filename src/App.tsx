import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Marketplace } from './components/Marketplace';
import { ShopDetails } from './components/ShopDetails';
import { EducationHub } from './components/EducationHub';
import { VendorDashboard } from './components/VendorDashboard';
import { CartPage } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { Product } from './types';
import { Sparkles, Award } from 'lucide-react';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-[#F9F7F2] text-[#2D2926] font-sans flex flex-col justify-between selection:bg-[#4F7942] selection:text-white">
          
          {/* Header layout */}
          <Header onOpenAuth={() => setIsAuthOpen(true)} />

          {/* Subheader design accent inspired by step indicators of OmniSave */}
          <div className="bg-white border-b border-stone-200 py-2.5 text-center text-[11px] font-mono tracking-widest text-[#4F7942] hidden sm:block shadow-sm">
            <span>📞 SUPPORT SÉNÉGAL PRO : <strong>33 800 12 34</strong></span>
            <span className="mx-4 text-stone-300">|</span>
            <span>📍 PAIEMENT WAVE & MOBILE MONEY AUTORISÉS</span>
            <span className="mx-4 text-stone-300">|</span>
            <span className="text-[#D2691E] font-bold">✓ 3 BOUTIQUES AGRÉÉES</span>
          </div>

          <div className="flex-grow">
            <Routes>
              {/* Marketplace Browse */}
              <Route 
                path="/" 
                element={
                  <Marketplace 
                    onOpenAuth={() => setIsAuthOpen(true)}
                    onOpenProductDetail={(product) => setSelectedProduct(product)}
                  />
                } 
              />

              {/* Shop Detailed Subview */}
              <Route 
                path="/boutique/:id" 
                element={
                  <ShopDetails 
                    onOpenProductDetail={(product) => setSelectedProduct(product)}
                  />
                } 
              />

              {/* Educational certified platform */}
              <Route 
                path="/formation" 
                element={
                  <EducationHub 
                    onOpenAuth={() => setIsAuthOpen(true)}
                  />
                } 
              />

              {/* Multi-Vendor Management panel */}
              <Route 
                path="/tableau-de-bord" 
                element={
                  <VendorDashboard 
                    onOpenAuth={() => setIsAuthOpen(true)}
                  />
                } 
              />

              {/* Cart page */}
              <Route 
                path="/panier" 
                element={
                  <CartPage 
                    onOpenAuth={() => setIsAuthOpen(true)}
                  />
                } 
              />
            </Routes>
          </div>

          {/* Persistent global footer styled elegantly */}
          <footer className="bg-[#00120f]/95 border-t border-[#022e26] py-12 text-center text-xs text-stone-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#032e26]">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🌾</span>
                  <span className="font-bold text-stone-300">AgriElevage Connect</span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[10px] text-stone-400 font-mono">PLATEFORME AGRI-ÉLEVAGE CONNECTÉE DU SÉNÉGAL</p>
                  <p className="text-[9px] text-stone-500 leading-none mt-1">Conçu pour l'intégration rurale & raccordement de la filière porcine, bovine, ovine et avicole.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
                <p>&copy; 2026 AgriElevage Connect. Tous droits réservés.</p>
                <div className="flex space-x-4">
                  <span className="hover:text-white cursor-pointer">Conditions d'utilisation</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer">Confidentialité</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer">FAQ Éleveurs</span>
                </div>
              </div>

            </div>
          </footer>

          {/* Product Detail Card Modal Dialog */}
          {selectedProduct && (
            <ProductDetailModal 
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}

          {/* Dynamic Registration Credentials Dialog */}
          <AuthModal 
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />

        </div>
      </Router>
    </AppProvider>
  );
}
