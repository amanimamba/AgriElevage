import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle, 
  Lock, 
  ShieldCheck, 
  MapPin, 
  Phone,
  User as UserIcon,
  HelpCircle,
  Smartphone
} from 'lucide-react';

interface CartProps {
  onOpenAuth: () => void;
}

export const CartPage: React.FC<CartProps> = ({ onOpenAuth }) => {
  const { 
    cart, 
    currentUser, 
    updateCartQuantity, 
    removeFromCart, 
    placeOrder, 
    clearCart 
  } = useApp();

  const navigate = useNavigate();

  // Selected Mobile operator inside Senegal
  const [paymentProvider, setPaymentProvider] = useState('Wave');
  const [customPhone, setCustomPhone] = useState(currentUser?.phone || '');
  const [customAddress, setCustomAddress] = useState(currentUser?.address || '');
  const [customName, setCustomName] = useState(currentUser?.name || '');

  // Booking process states
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any[] | null>(null);

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // MANDATORY AUTH CHECK:
    // "fais que le cleitn pouri avoir acess a lapp sans problier mais sil il veux achter que on lui oblige de ce connecter"
    if (!currentUser) {
      alert("🔒 Authentification requise :\nPour valider votre commande et bénéficier du suivi de livraison en temps réel, veuillez vous connecter ou créer votre compte.");
      onOpenAuth();
      return;
    }

    if (!customAddress || !customPhone || !customName) {
      alert("Veuillez remplir vos coordonnées complètes pour la livraison.");
      return;
    }

    setIsOrdering(true);

    setTimeout(() => {
      const createdOrders = placeOrder(customName, customPhone, customAddress, paymentProvider);
      setOrderSuccess(createdOrders);
      setIsOrdering(false);
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] text-[#2D2926] flex items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* Natural style check circle */}
          <div className="w-16 h-16 rounded-full bg-stone-50 border-2 border-[#4F7942] flex items-center justify-center text-[#4F7942] mx-auto animate-bounce shadow-md">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-display font-extrabold text-stone-900">Commande Enregistrée !</h2>
            <p className="text-xs text-stone-500">
              Merci pour votre confiance. Les éleveurs préparent déjà vos articles.
            </p>
          </div>

          {/* Orders summary */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-left space-y-3 font-mono text-[11px] text-stone-700">
            <span className="text-[10px] text-[#4F7942] uppercase font-extrabold tracking-wider block border-b border-stone-200 pb-1.5">RÉSUMÉ D'EXPÉDITION</span>
            {orderSuccess.map((order) => (
              <div key={order.id} className="flex justify-between items-center border-b border-stone-200 pb-1">
                <div>
                  <p className="font-bold text-stone-900 uppercase">{order.id}</p>
                  <p className="text-[10px] text-stone-500">Boutique: {order.shopName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D2691E] font-bold">${order.total.toLocaleString()}</p>
                  <p className="text-[9px] text-stone-500">Paiement: {order.paymentMethod}</p>
                </div>
              </div>
            ))}
            <div className="pt-2 text-stone-500 text-[10px] uppercase block">
              💡 <strong>Suivi de livraison :</strong> Vous pouvez suivre l'expédition de vos commandes en basculant sur le tableau de bord ou l'onglet de facturation !
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-[#4F7942] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#3D5E32] transition-all cursor-pointer shadow-md"
          >
            Retourner au Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D2926] pb-20">
      
      {/* Title */}
      <section className="bg-white border-b border-stone-200 py-10 text-center shadow-sm">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">Mon Panier Multi-Boutiques</h1>
        <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
          Validez vos achats d'aliments et d'équipements agricoles chez vos différents fournisseurs préférés.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 animate-fade-in">
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-3xl p-8 max-w-md mx-auto space-y-4 shadow-sm">
            <span className="text-5xl">🛒</span>
            <p className="text-stone-500 text-sm">Votre panier est encore vide.</p>
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#4F7942] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3D5E32] transition-all"
            >
              Parcourir les produits
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="flex-1 bg-white border border-stone-200 rounded-3xl p-6 space-y-4 w-full shadow-sm">
              <h3 className="font-extrabold text-sm uppercase font-mono tracking-wider text-[#D2691E] border-b border-stone-100 pb-3">Produits Sélectionnés</h3>
              
              <div className="space-y-4">
                {cart.map((item) => {
                  return (
                    <div 
                      key={item.product.id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl bg-stone-50/60 border border-stone-200 gap-4"
                    >
                      <div className="flex items-center space-x-3.5">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-14 h-14 rounded-xl object-cover bg-stone-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm text-stone-900 max-w-[250px] sm:max-w-[320px] truncate">{item.product.name}</h4>
                          <span className="text-[10px] text-stone-500 font-mono">Boutique : {item.product.id.startsWith('p') ? 'Ferme du Sahel' : 'VetoPlus'}</span>
                        </div>
                      </div>

                      {/* Quantity & Actions row */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center space-x-2.5 bg-stone-100 border border-stone-200 p-1 rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-stone-200 font-bold text-xs text-stone-700 hover:text-[#4F7942]"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-6 h-6 rounded bg-stone-200 font-bold text-xs text-stone-700 hover:text-[#4F7942] disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-mono text-stone-500">Total :</p>
                          <p className="text-sm font-mono font-extrabold text-[#D2691E]">${(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total checkout calculation banner */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center text-xs mt-6">
                <div>
                  <p className="text-stone-500 text-[10px] uppercase font-mono font-bold leading-none">MONTANT TOTAL DU PANIER</p>
                  <p className="text-stone-500 text-[9px] mt-1 leading-snug">Inclut le transport par partenaire logistique agréé.</p>
                </div>
                <p className="text-2xl font-mono font-extrabold text-[#D2691E]">${totalAmount.toLocaleString()}</p>
              </div>

            </div>

            {/* Right Information & Payment selection Column */}
            <div className="w-full lg:w-96 bg-white border border-stone-200 rounded-3xl p-6 space-y-6 text-left shadow-sm">
              
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-extrabold text-sm uppercase font-mono tracking-wider text-[#D2691E]">Règlement & Logistique</h3>
                <p className="text-[11px] text-stone-500 font-medium">Indiquez vos coordonnées de livraison au Sénégal.</p>
              </div>

              {/* If user is visitor, show login reminder banner */}
              {!currentUser && (
                <div className="p-4 rounded-2xl bg-[#D2691E]/10 border border-[#D2691E]/25 space-y-3">
                  <div className="flex items-start space-x-2 text-[#D2691E] font-extrabold text-xs leading-normal">
                    <Lock className="w-4.5 h-4.5 flex-shrink-0" />
                    <span>Identification obligatoire pour commander :</span>
                  </div>
                  <p className="text-[10px] text-stone-700 leading-relaxed font-normal">
                    « AgriElevage Connect » est accessible librement. Toutefois, pour passer commande, sécuriser les livraisons et valider les certificats, la connexion est requise.
                  </p>
                  <button
                    onClick={onOpenAuth}
                    className="w-full py-2 bg-[#D2691E] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl hover:bg-[#B55A1A]"
                  >
                    M'authentifier rapidement &rarr;
                  </button>
                </div>
              )}

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-500 font-bold mb-1">
                      Nom complet du Destinataire :
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Babacar Ndiaye"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 rounded-xl p-3 focus:outline-none focus:border-[#4F7942] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-500 font-bold mb-1">
                      Téléphone de Livraison :
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: +221 77 123 45 67"
                      value={customPhone}
                      onChange={(e) => setCustomPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 rounded-xl p-3 focus:outline-none focus:border-[#4F7942] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-500 font-bold mb-1">
                      Adresse précise de Livraison :
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Villa 45, Quartier Mermoz, Dakar"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 rounded-xl p-3 focus:outline-none focus:border-[#4F7942] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Mobile Money choice */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-500 font-bold mb-1">
                    Mode de Règlement Sécurisé :
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Wave', label: 'Wave 🌊' },
                      { id: 'Orange Money', label: 'Orange Money 🍊' },
                      { id: 'MTN Mobile Money', label: 'MTN MoMo 🟡' },
                      { id: 'Livraison Cash', label: 'À la Livraison 💵' }
                    ].map((providerOption) => (
                      <button
                        key={providerOption.id}
                        type="button"
                        onClick={() => setPaymentProvider(providerOption.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                          paymentProvider === providerOption.id
                            ? 'bg-stone-100 text-[#4F7942] border-[#4F7942] shadow-sm'
                            : 'bg-stone-55 text-stone-600 border-stone-200 hover:border-[#4F7942]/30'
                        }`}
                      >
                        {providerOption.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[10px] text-stone-500 flex items-center space-x-1.5 leading-normal">
                  <ShieldCheck className="w-5 h-5 text-[#4F7942] flex-shrink-0" />
                  <span>Traitement crypté TLS 256 bits via agrégateur Mobile Money Sénégal.</span>
                </div>

                <button
                  type="submit"
                  disabled={isOrdering || cart.length === 0}
                  className="w-full py-4 rounded-xl bg-[#4F7942] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-[#3D5E32] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:bg-stone-200 disabled:text-stone-400"
                >
                  <span>{isOrdering ? 'Traitement de la commande...' : 'Placer ma Commande'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>
        )}
      </main>

    </div>
  );
};
