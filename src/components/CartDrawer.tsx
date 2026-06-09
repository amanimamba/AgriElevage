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
      <div className="min-h-screen bg-gradient-to-b from-[#012520] via-[#011915] to-[#000e0c] text-stone-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-[#012d26] border border-[#00f2c3]/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* Glassmorphism check */}
          <div className="w-16 h-16 rounded-full bg-[#02443a] border border-[#00f2c3] flex items-center justify-center text-[#00f2c3] mx-auto animate-bounce shadow-[0_0_15px_rgba(0,242,195,0.3)]">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-display font-extrabold text-white">Commande Enregistrée !</h2>
            <p className="text-xs text-stone-300">
              Merci pour votre confiance. Les éleveurs préparent déjà vos articles.
            </p>
          </div>

          {/* Orders summary */}
          <div className="bg-[#001714] border border-[#03332a] p-4 rounded-2xl text-left space-y-3 font-mono text-[11px] text-stone-300">
            <span className="text-[10px] text-[#00f2c3] uppercase font-bold tracking-wider block border-b border-[#03332a] pb-1.5">RÉSUMÉ D'EXPÉDITION</span>
            {orderSuccess.map((order) => (
              <div key={order.id} className="flex justify-between items-center border-b border-[#01241f] pb-1">
                <div>
                  <p className="font-bold text-white uppercase">{order.id}</p>
                  <p className="text-[10px] text-stone-400">Boutique: {order.shopName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#00f7a6] font-bold">{order.total.toLocaleString()} F</p>
                  <p className="text-[9px] text-stone-400">Paiement: {order.paymentMethod}</p>
                </div>
              </div>
            ))}
            <div className="pt-2 text-stone-400 text-[10px] uppercase block">
              💡 <strong>Suivi de livraison :</strong> Vous pouvez suivre l'expédition de vos commandes en basculant sur le tableau de bord ou l'onglet de facturation !
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-[0_0_15px_rgba(0,242,195,0.4)] transition-all cursor-pointer"
          >
            Retourner au Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012520] via-[#011915] to-[#000e0c] text-stone-100 pb-20">
      
      {/* Title */}
      <section className="bg-[#001714] border-b border-[#033a30] py-10 text-center">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Mon Panier Multi-Boutiques</h1>
        <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
          Validez vos achats d'aliments et d'équipements agricoles chez vos différents fournisseurs préférés.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#012a23]/60 border border-[#034438] rounded-3xl p-8 max-w-md mx-auto space-y-4">
            <span className="text-5xl">🛒</span>
            <p className="text-stone-300 text-sm">Votre panier est encore vide.</p>
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#00f2c3] text-[#001714] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
            >
              Parcourir les produits
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="flex-1 bg-[#012d26]/40 border border-[#034438] rounded-3xl p-6 space-y-4 w-full">
              <h3 className="font-extrabold text-sm uppercase font-mono tracking-wider text-[#00b59c] border-b border-[#033c32] pb-3">Produits Sélectionnés</h3>
              
              <div className="space-y-4">
                {cart.map((item) => {
                  return (
                    <div 
                      key={item.product.id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl bg-[#001714] border border-[#033028] gap-4"
                    >
                      <div className="flex items-center space-x-3.5">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-14 h-14 rounded-xl object-cover bg-stone-900"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm text-stone-100 max-w-[250px] sm:max-w-[320px] truncate">{item.product.name}</h4>
                          <span className="text-[10px] text-stone-400 font-mono">Boutique : {item.product.id.startsWith('p') ? 'Ferme du Sahel' : 'VetoPlus'}</span>
                        </div>
                      </div>

                      {/* Quantity & Actions row */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center space-x-2.5 bg-[#012520] border border-[#033d32] p-1 rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-[#033128] font-bold text-xs text-[#00f2c3]"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-6 h-6 rounded bg-[#033128] font-bold text-xs text-[#00f2c3] disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-mono text-stone-400">Total :</p>
                          <p className="text-sm font-mono font-extrabold text-[#00f2c3]">{(item.product.price * item.quantity).toLocaleString()} F</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-stone-400 hover:text-[#ff4a5a] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total checkout calculation banner */}
              <div className="p-4 bg-[#011411] rounded-2xl border border-[#024035] flex justify-between items-center text-xs mt-6">
                <div>
                  <p className="text-stone-400 text-[10px] uppercase font-mono leading-none">MONTANT TOTAL DU PANIER</p>
                  <p className="text-stone-500 text-[9px] mt-1 leading-snug">Inclut le transport par partenaire logistique agréé.</p>
                </div>
                <p className="text-2xl font-mono font-extrabold text-[#00f7a6]">{totalAmount.toLocaleString()} FCFA</p>
              </div>

            </div>

            {/* Right Information & Payment selection Column */}
            <div className="w-full lg:w-96 bg-[#012d26]/40 border border-[#034438] rounded-3xl p-6 space-y-6 text-left">
              
              <div className="border-b border-[#033c32] pb-3">
                <h3 className="font-extrabold text-sm uppercase font-mono tracking-wider text-[#00b59c]">Règlement & Logistique</h3>
                <p className="text-[11px] text-stone-400">Indiquez vos coordonnées de livraison au Sénégal.</p>
              </div>

              {/* If user is visitor, show login reminder banner */}
              {!currentUser && (
                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 space-y-3">
                  <div className="flex items-start space-x-2 text-orange-300 font-bold text-xs leading-normal">
                    <Lock className="w-5 h-5 flex-shrink-0" />
                    <span>Identification obligatoire pour commander :</span>
                  </div>
                  <p className="text-[10px] text-stone-300 leading-relaxed">
                    « AgriElevage Connect » est accessible librement. Toutefois, pour passer commande, sécuriser les livraisons et valider les certificats, la connexion est requise.
                  </p>
                  <button
                    onClick={onOpenAuth}
                    className="w-full py-2 bg-orange-500 text-stone-950 text-xs font-extrabold uppercase tracking-widest rounded-xl hover:bg-orange-400"
                  >
                    M'authentifier rapidement &rarr;
                  </button>
                </div>
              )}

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1">
                      Nom complet du Destinataire :
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Babacar Ndiaye"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-[#001714] border border-[#033a30] text-xs text-white placeholder-stone-600 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1">
                      Téléphone de Livraison :
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: +221 77 123 45 67"
                      value={customPhone}
                      onChange={(e) => setCustomPhone(e.target.value)}
                      className="w-full bg-[#001714] border border-[#033a30] text-xs text-white placeholder-stone-600 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1">
                      Adresse précise de Livraison :
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Villa 45, Quartier Mermoz, Dakar"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      className="w-full bg-[#001714] border border-[#033a30] text-xs text-white placeholder-stone-600 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                    />
                  </div>
                </div>

                {/* Mobile Money choice */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1">
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
                            ? 'bg-[#01221b] text-[#00f2c3] border-[#00f2c3] shadow-md'
                            : 'bg-[#001714] text-stone-400 border-[#033a30] hover:border-[#00f2c3]/30'
                        }`}
                      >
                        {providerOption.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-stone-900/60 rounded-xl text-[10px] text-stone-400 flex items-center space-x-1.5 leading-normal">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Traitement crypté TLS 256 bits via agrégateur Mobile Money Sénégal.</span>
                </div>

                <button
                  type="submit"
                  disabled={isOrdering || cart.length === 0}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(0,242,195,0.4)] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:from-stone-800 disabled:to-stone-800 disabled:text-stone-500"
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
