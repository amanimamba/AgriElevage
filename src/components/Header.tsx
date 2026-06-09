import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Store, 
  GraduationCap, 
  User as UserIcon, 
  LayoutDashboard, 
  ChevronRight,
  LogOut,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

export const Header: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const { cart, currentUser, activeRole, switchRole, logout } = useApp();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const stepCapsules = [
    { num: '01', label: 'Boutiques', path: '/' },
    { num: '02', label: 'Panier', path: '/panier' },
    { num: '03', label: 'Formations', path: '/formation' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm text-[#2D2926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#4F7942] flex items-center justify-center text-white font-bold text-xl shadow-lg hover:scale-105 transition-all">
              🌽
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-stone-900 group-hover:text-[#4F7942] transition-colors">
                AgriElevage <span className="text-[#4F7942]">Connect</span>
              </span>
              <span className="text-[10px] font-mono text-[#D2691E] uppercase tracking-wider font-bold">
                Sénégal Multi-Vendeurs
              </span>
            </div>
          </Link>

          {/* Stepper Capsules inspired by OmniSave design */}
          <div className="hidden lg:flex items-center space-x-3 bg-stone-50 p-1.5 rounded-full border border-stone-200">
            {stepCapsules.map((step) => {
              const active = isActive(step.path);
              return (
                <Link
                  key={step.path}
                  to={step.path}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-full transition-all text-xs font-medium tracking-wide ${
                    active 
                      ? 'bg-gradient-to-r from-[#4F7942] to-[#6B8E23] text-white font-semibold shadow-sm' 
                      : 'text-stone-600 hover:text-[#4F7942] hover:bg-stone-100/60'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md ${
                    active ? 'bg-white/30 text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {step.num}
                  </span>
                  <span>{step.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Center Navigation Menu for mobile/tablets */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-[#4F7942] bg-stone-150 font-semibold' 
                  : 'text-stone-600 hover:text-[#4F7942] hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Store className="w-4.5 h-4.5" />
                <span>Marketplace</span>
              </div>
            </Link>

            <Link 
              to="/formation" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/formation') 
                  ? 'text-[#4F7942] bg-stone-150 font-semibold' 
                  : 'text-stone-600 hover:text-[#4F7942] hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4.5 h-4.5" />
                <span>Certifications</span>
              </div>
            </Link>

            {/* Dashboard available for all to simulate or explore as seller */}
            <Link 
              to="/tableau-de-bord" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/tableau-de-bord') 
                  ? 'text-[#4F7942] bg-stone-150 font-bold' 
                  : 'text-stone-600 hover:text-[#4F7942] hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="w-4.5 h-4.5 text-[#4F7942]" />
                <span className="font-semibold text-[#4F7942]">Espace Vendeur</span>
                <span className="text-[9px] bg-[#4F7942]/15 text-[#4F7942] px-1.5 py-0.5 rounded-full uppercase border border-stone-200">
                  Vendre
                </span>
              </div>
            </Link>
          </nav>

          {/* Quick Actions & Role Switcher */}
          <div className="flex items-center space-x-4">
            
            {/* Simulation Role Switcher Badge */}
            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-full border border-stone-200 text-xs font-medium">
              <button 
                onClick={() => switchRole('client')}
                className={`py-1 px-3 rounded-full transition-all ${
                  activeRole === 'client' 
                    ? 'bg-[#4F7942] text-white font-semibold shadow-sm' 
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                🌾 Client
              </button>
              <button 
                onClick={() => {
                  switchRole('vendeur');
                }}
                className={`py-1 px-3 rounded-full transition-all ${
                  activeRole === 'vendeur' 
                    ? 'bg-[#D2691E] text-white font-semibold' 
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                🏪 Vendeur
              </button>
            </div>

            {/* Cart Button */}
            <Link 
              to="/panier" 
              className="relative p-2 rounded-full border border-stone-200 bg-stone-50 text-stone-700 hover:text-[#4F7942] hover:border-[#4F7942] transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff4a5a] text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* User Session Profile / Connection Required Action trigger */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-semibold text-stone-800 truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {currentUser.role === 'vendeur' ? 'Éleveur Pro' : 'Acheteur'}
                  </span>
                </div>
                <div className="relative group">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full ring-2 ring-[#4F7942] bg-[#EFECE1] p-0.5 pointer-events-auto"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-2xl p-2 hidden group-hover:block hover:block z-50">
                    <div className="px-3 py-2 border-b border-stone-100 mb-1">
                      <p className="text-xs font-bold text-stone-800 truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-stone-500 truncate">{currentUser.email}</p>
                    </div>
                    {currentUser.role === 'vendeur' && (
                      <Link 
                        to="/tableau-de-bord"
                        className="flex items-center space-x-2 w-full px-3 py-1.5 text-xs text-stone-700 rounded-lg hover:bg-stone-50 hover:text-[#4F7942]"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Boutique Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 w-full px-3 py-1.5 text-xs text-red-500 rounded-lg hover:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Se Déconnecter</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-[#4F7942] hover:bg-[#3D5E32] transition-all cursor-pointer"
              >
                Se connecter
              </button>
            )}

            {/* Mobile menu lever */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L12 12M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#001714] border-t border-[#03332a] px-4 py-4 space-y-3">
          <div className="flex justify-around bg-[#012520] p-1.5 rounded-full border border-[#034438] text-xs mb-3">
            <button 
              onClick={() => { switchRole('client'); setMenuOpen(false); }}
              className={`py-1 px-4 rounded-full w-1/2 transition-all ${
                activeRole === 'client' ? 'bg-[#024438] text-[#00f2c3] font-semibold' : 'text-stone-400'
              }`}
            >
              🌾 Mode Client
            </button>
            <button 
              onClick={() => { switchRole('vendeur'); setMenuOpen(false); }}
              className={`py-1 px-4 rounded-full w-1/2 transition-all ${
                activeRole === 'vendeur' ? 'bg-[#00b59c] text-[#001714] font-semibold' : 'text-stone-400'
              }`}
            >
              🏪 Mode Vendeur
            </button>
          </div>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-stone-300 hover:text-[#00f2c3] hover:bg-[#02211c]"
          >
            🌽 Marketplace (Acheter)
          </Link>
          <Link
            to="/formation"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-stone-300 hover:text-[#00f2c3] hover:bg-[#02211c]"
          >
            🎓 Centre d'apprentissage (Formations)
          </Link>
          <Link
            to="/tableau-de-bord"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-stone-300 hover:text-[#00f2c3] hover:bg-[#02211c]"
          >
            📊 Espace Vendeur (Gestion de Boutique)
          </Link>
          <Link
            to="/panier"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-stone-300 hover:text-[#00f2c3] hover:bg-[#02211c]"
          >
            🛒 Panier d'achat ({totalCartItems} articles)
          </Link>
        </div>
      )}
    </header>
  );
};
