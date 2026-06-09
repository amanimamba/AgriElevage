import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Sparkles, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  message?: string;
  defaultRole?: 'client' | 'vendeur';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  message = "Accédez aux fonctionnalités professionnelles d'AgriElevage Connect",
  defaultRole = 'client'
}) => {
  const { login } = useApp();
  const [role, setRole] = useState<'client' | 'vendeur'>(defaultRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'success'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Veuillez remplir le nom et l\'adresse email.');
      return;
    }
    setError('');
    
    // Simulate Login/Registration
    login(email, name, role, phone, address);
    setStep('success');

    setTimeout(() => {
      onClose();
      setStep('form');
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      if (onSuccess) onSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md bg-gradient-to-b from-[#012520] to-[#001411] border border-[#034d3f] rounded-3xl p-6 shadow-[0_0_50px_rgba(0,242,195,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-[#00f2c3]/10 to-transparent blur-2xl rounded-full" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-[#034d3f] bg-[#001714] text-stone-400 hover:text-[#00f2c3] hover:border-[#00f2c3]/30 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6 mt-2 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-[#023c32] border border-[#045c4d] text-[#00f2c3] mb-3">
                <Lock className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-display font-extrabold text-white tracking-tight">
                Rejoignez <span className="text-[#00f2c3]">AgriElevage Connect</span>
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                {message}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {/* Role Picker */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-[#00f2c3] font-bold mb-2">
                  Type de Compte
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#001714] p-1 rounded-2xl border border-[#033a30]">
                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`py-2 px-3 text-xs rounded-xl font-medium transition-all cursor-pointer ${
                      role === 'client' 
                        ? 'bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] font-bold' 
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    🌾 Acheteur
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('vendeur')}
                    className={`py-2 px-3 text-xs rounded-xl font-medium transition-all cursor-pointer ${
                      role === 'vendeur' 
                        ? 'bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] font-bold' 
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    🏪 Fournisseur / Éleveur
                  </button>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00b59c]" />
                  <input
                    type="text"
                    required
                    placeholder="Nom complet / Nom d'entreprise"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#00f2c3] transition-all"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00b59c]" />
                  <input
                    type="email"
                    required
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#00f2c3] transition-all"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00b59c]" />
                  <input
                    type="tel"
                    placeholder="Téléphone (ex: +221 77 123 45 67)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#00f2c3] transition-all"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00b59c]" />
                  <input
                    type="text"
                    placeholder="Ville, Région (ex: Dakar, Rufisque, Thiès)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#00f2c3] transition-all"
                  />
                </div>
              </div>

              {/* KYC notice if role is vendor */}
              {role === 'vendeur' && (
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/25">
                  <p className="text-[10px] text-orange-300 leading-normal">
                    💡 <strong>KYC non obligatoire :</strong> Vous pouvez créer votre catalogue et configurer votre boutique immédiatement sans vérification stricte initiale.
                  </p>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-400 font-medium text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(0,242,195,0.4)] transition-all cursor-pointer"
              >
                Créer mon compte
              </button>

              <div className="text-center pt-2">
                <span className="text-[10px] text-[#00b59c] hover:underline cursor-pointer">
                  Utiliser un compte de démonstration instantané ⚡
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center relative z-10 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#033c32] border border-[#00f2c3] flex items-center justify-center text-[#00f2c3] mb-4 shadow-[0_0_20px_rgba(0,242,195,0.3)] animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Connexion Réussie !</h3>
            <p className="text-xs text-[#00f2c3] font-mono">
              Bienvenue sur la plateforme, {name || 'Éleveur'}
            </p>
            <p className="text-[10px] text-[#00b59c] mt-4">Redirection immédiate...</p>
          </div>
        )}
      </div>
    </div>
  );
};
