import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Shop, Order } from '../types';
import { 
  LayoutDashboard, 
  Store, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  Award, 
  SlidersHorizontal, 
  MapPin, 
  Phone, 
  Mail, 
  DollarSign, 
  Clipboard, 
  Settings, 
  CheckCircle, 
  Clock, 
  FileText, 
  AlertCircle,
  PlusSquare,
  MessageSquare,
  Send,
  X,
  CreditCard,
  Share2
} from 'lucide-react';

interface VendorDashboardProps {
  onOpenAuth: () => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onOpenAuth }) => {
  const { 
    shops, 
    products, 
    orders, 
    currentUser, 
    activeRole,
    addOrUpdateProduct, 
    deleteProduct, 
    updateShopProfile, 
    updateOrderStatus,
    walletBalance,
    withdrawToMobileMoney,
    withdrawals
  } = useApp();

  // Selected vendor is 'vendor_sahel' for presentation
  const mockVendorId = 'vendor_sahel'; 
  const shop = shops.find(s => s.id === mockVendorId) || shops[0];
  const vendorProducts = products.filter(p => p.vendorId === shop.id);
  const vendorOrders = orders.filter(o => o.shopId === shop.id);

  // Active section inside dashboard
  const [activeSection, setActiveSection] = useState<'stats' | 'profile' | 'catalog' | 'orders' | 'wallet'>('stats');

  // Edit / Add product states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Add Product form states
  const [pId, setPId] = useState('');
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState<'Aliment' | 'Médicament' | 'Équipement' | 'Autre'>('Aliment');
  const [pDescription, setPDescription] = useState('');
  const [pPrice, setPPrice] = useState(0);
  const [pStock, setPStock] = useState(25);
  const [pAnimals, setPAnimals] = useState<any[]>(['Bovins']);
  const [pComposition, setPComposition] = useState('');
  const [pDosage, setPDosage] = useState('');
  const [pImage, setPImage] = useState('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&auto=format&fit=crop');

  // Edit Shop Profile forms
  const [shopName, setShopName] = useState(shop.name);
  const [shopDesc, setShopDesc] = useState(shop.description);
  const [shopLocation, setShopLocation] = useState(shop.location);
  const [shopPhone, setShopPhone] = useState(shop.contactPhone);
  const [shopHours, setShopHours] = useState(shop.hours);
  const [shopEmail, setShopEmail] = useState(shop.email);
  const [shopWhatsapp, setShopWhatsapp] = useState(shop.whatsapp);

  // Bill printing state
  const [viewingInvoiceOrder, setViewingInvoiceOrder] = useState<Order | null>(null);

  // Withdrawal form states
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [payoutPhone, setPayoutPhone] = useState('+221 77 555 12 34');
  const [payoutProvider, setPayoutProvider] = useState('Wave');
  const [walletFeedback, setWalletFeedback] = useState('');

  const animalOptions = ['Bovins', 'Volailles', 'Porcins', 'Ovins', 'Caprins', 'Équins', 'Aquaculture', 'Apiculture'];

  const handleOpenProductModal = (product: Product | null) => {
    if (product) {
      setEditingProduct(product);
      setPId(product.id);
      setPName(product.name);
      setPCategory(product.category);
      setPDescription(product.description);
      setPPrice(product.price);
      setPStock(product.stock);
      setPAnimals(product.animalTypes);
      setPComposition(product.composition || '');
      setPDosage(product.dosage || '');
      setPImage(product.image);
    } else {
      setEditingProduct(null);
      setPId('p_' + Math.floor(100+Math.random()*900).toString());
      setPName('');
      setPCategory('Aliment');
      setPDescription('');
      setPPrice(5000);
      setPStock(50);
      setPAnimals(['Bovins']);
      setPComposition('');
      setPDosage('');
      setPImage('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&auto=format&fit=crop');
    }
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: pId,
      vendorId: shop.id,
      name: pName,
      category: pCategory,
      description: pDescription,
      price: Number(pPrice),
      stock: Number(pStock),
      animalTypes: pAnimals,
      composition: pComposition,
      dosage: pDosage,
      image: pImage,
      rating: editingProduct ? editingProduct.rating : 4.5
    };
    addOrUpdateProduct(newProduct);
    setShowProductModal(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Shop = {
      ...shop,
      name: shopName,
      description: shopDesc,
      location: shopLocation,
      contactPhone: shopPhone,
      hours: shopHours,
      email: shopEmail,
      whatsapp: shopWhatsapp
    };
    updateShopProfile(updated);
    alert('✅ Votre profil de boutique "AgriElevage Connect" a été mis à jour avec succès.');
  };

  const handleToggleAnimal = (animal: string) => {
    if (pAnimals.includes(animal)) {
      setPAnimals(pAnimals.filter(a => a !== animal));
    } else {
      setPAnimals([...pAnimals, animal]);
    }
  };

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) {
      setWalletFeedback('Veuillez entrer un montant valide.');
      return;
    }
    if (withdrawAmount > walletBalance) {
      setWalletFeedback('Solde insuffisant pour ce transfert.');
      return;
    }
    const success = withdrawToMobileMoney(withdrawAmount, payoutProvider, payoutPhone);
    if (success) {
      setWalletFeedback('');
      alert(`💸 Transfert Réussi !\nUn montant de ${withdrawAmount.toLocaleString()} FCFA a été transféré instantanément vers votre compte ${payoutProvider} (${payoutPhone}).`);
      setWithdrawAmount(0);
    }
  };

  // Calculations for Stats
  const activeOrdersCount = vendorOrders.filter(o => o.status !== 'Livrée').length;
  const totalVendorRevenue = vendorOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012520] via-[#011915] to-[#000e0c] text-stone-100 pb-20">
      
      {/* Header Panel */}
      <section className="bg-[#001714] border-b border-[#033a30] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#012d26] border-2 border-[#00f2c3] flex items-center justify-center text-3xl">
              {shop.logo}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white">{shop.name}</h1>
                <span className="text-[9px] bg-emerald-500/10 text-[#00f7a6] border border-emerald-500/30 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Boutique Pro ⭐ {shop.rating}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium">Tableau de gestion multi-vendeur • {shop.location}</p>
            </div>
          </div>

          {/* Quick Sub Sections Navigation */}
          <div className="flex flex-wrap gap-1.5 bg-[#011e1a] p-1 rounded-xl border border-[#033c32]">
            <button
              onClick={() => setActiveSection('stats')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                activeSection === 'stats' ? 'bg-[#024d40] text-[#00f2c3] font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              📊 Stats
            </button>
            <button
              onClick={() => setActiveSection('profile')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                activeSection === 'profile' ? 'bg-[#024d40] text-[#00f2c3] font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              🏪 Profil Boutique
            </button>
            <button
              onClick={() => setActiveSection('catalog')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                activeSection === 'catalog' ? 'bg-[#024d40] text-[#00f2c3] font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              📦 Catalogue ({vendorProducts.length})
            </button>
            <button
              onClick={() => setActiveSection('orders')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold relative cursor-pointer ${
                activeSection === 'orders' ? 'bg-[#024d40] text-[#00f2c3] font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              📜 Commandes ({vendorOrders.length})
              {activeOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff4a5a] rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveSection('wallet')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                activeSection === 'wallet' ? 'bg-[#024d40] text-[#00f2c3] font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              💸 Portefeuille
            </button>
          </div>
        </div>
      </section>

      {/* Main Panel Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* 1. OVERALL STATS SECTION */}
        {activeSection === 'stats' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#012d26]/55 border border-[#034438] rounded-2xl p-5 hover:border-[#00f2c3]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-400 text-[10px] uppercase font-mono font-bold">Chiffre d'affaires brut</p>
                    <p className="text-xl sm:text-2xl font-mono font-extrabold text-[#00f7a6] mt-1">
                      {totalVendorRevenue.toLocaleString()} F CFA
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#023c32] text-[#00f2c3]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 text-[10px] text-stone-400 flex items-center space-x-1.5">
                  <span className="text-emerald-400 font-bold">↑ 18.5%</span>
                  <span>vs le mois dernier</span>
                </div>
              </div>

              <div className="bg-[#012d26]/55 border border-[#034438] rounded-2xl p-5 hover:border-[#00f2c3]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-400 text-[10px] uppercase font-mono font-bold">Solde Disponible (Retrait)</p>
                    <p className="text-xl sm:text-2xl font-mono font-extrabold text-[#00d8ff] mt-1">
                      {walletBalance.toLocaleString()} F
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#023c32] text-[#00d8ff]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <p className="mt-4 text-[9px] text-[#00b59c] leading-none">Paiements Wave / Orange Money instantanés</p>
              </div>

              <div className="bg-[#012d26]/55 border border-[#034438] rounded-2xl p-5 hover:border-[#00f2c3]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-400 text-[10px] uppercase font-mono font-bold">Commandes Reçues</p>
                    <p className="text-xl sm:text-2xl font-extrabold mt-1">
                      {vendorOrders.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#023c32] text-white">
                    <Clipboard className="w-5 h-5" />
                  </div>
                </div>
                <p className="mt-4 text-[10px] text-orange-400 font-semibold flex items-center space-x-1">
                  <span>● {activeOrdersCount} en cours de traitement</span>
                </p>
              </div>

              <div className="bg-[#012d26]/55 border border-[#034438] rounded-2xl p-5 hover:border-[#00f2c3]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-400 text-[10px] uppercase font-mono font-bold">Note de la Boutique</p>
                    <p className="text-[#ffb800] text-xl sm:text-2xl font-extrabold mt-1 flex items-center gap-1">
                      {shop.rating} <span className="text-stone-400 text-xs">/ 5</span>
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#023c32] text-[#ffb800]">
                    <Award className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <p className="mt-4 text-[10px] text-stone-400">{shop.reviewsCount} avis d'éleveurs ravis</p>
              </div>

            </div>

            {/* Performance charts mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Sales Progression Graph Mock */}
              <div className="lg:col-span-2 bg-[#012d26]/40 border border-[#034438] rounded-3xl p-6">
                <h3 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wide font-mono text-[#00f2c3]">
                  Progression Hebdomadaire des Ventes
                </h3>
                {/* Custom Visual graph bars */}
                <div className="h-56 flex items-end justify-between gap-2.5 pt-8 px-4">
                  {[
                    { day: 'Lun', sales: 45000, color: 'bg-emerald-600' },
                    { day: 'Mar', sales: 75000, color: 'bg-emerald-500' },
                    { day: 'Mer', sales: 120000, color: 'bg-[#00f2c3]' },
                    { day: 'Jeu', sales: 60000, color: 'bg-emerald-500' },
                    { day: 'Ven', sales: 95000, color: 'bg-emerald-400' },
                    { day: 'Sam', sales: 155000, color: 'bg-[#00f7a6] shadow-[0_0_15px_rgba(0,247,166,0.3)]' },
                    { day: 'Dim', sales: 80000, color: 'bg-emerald-500' }
                  ].map((bar, idx) => {
                    const heightPercent = Math.min(100, Math.floor((bar.sales / 160000) * 100));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                        {/* Tooltip on hover */}
                        <div className="absolute -top-8 bg-[#001714] text-[#00f2c3] text-[9px] font-mono p-1 rounded border border-[#03594c] opacity-0 group-hover:opacity-100 transition-opacity">
                          {bar.sales.toLocaleString()} F
                        </div>
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-500 ${bar.color}`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-[10px] text-stone-400 font-mono mt-2">{bar.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Checklist or KYC guide box */}
              <div className="bg-[#012d26]/40 border border-[#034438] rounded-3xl p-6 space-y-4">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wide font-mono text-[#00b59c]">
                  Statut de Vérification (KYC)
                </h3>
                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-stone-300 space-y-2.5">
                  <div className="flex items-center space-x-2 text-[#00f2c3] font-bold">
                    <span className="text-base">ℹ️</span>
                    <span>KYC non obligatoire pour démarrer</span>
                  </div>
                  <p className="leading-relaxed">
                    Chez <strong>AgriElevage Connect</strong>, vous pouvez publier vos produits et récolter des fonds instantanément. 
                    Tant que vos retraits cumulés ne dépassent pas <strong>1 500 000 FCFA</strong>, aucune pièce d'identité officielle n'est demandée !
                  </p>
                  <button 
                    onClick={() => alert("Formulaire KYC ouvert :\nVous pouvez charger votre CNI ou Ninea si vous désirez acquérir le badge 'Fournisseur Certifié d'État'.")}
                    className="w-full py-2 bg-[#024035] border border-[#00f2c3]/20 hover:border-[#00f2c3] text-[#00f2c3] text-[10px] uppercase font-bold rounded-xl transition-all"
                  >
                    Vérifier mon identité (Optionnel) &rarr;
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. PROFILE EDIT SECTION */}
        {activeSection === 'profile' && (
          <div className="bg-[#012d26]/40 border border-[#034438] rounded-3xl p-6 max-w-3xl mx-auto">
            <h3 className="font-extrabold text-base text-white mb-6 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-[#00f2c3]" />
              <span>Personnaliser ma Boutique en Ligne</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Nom de la Boutique
                  </label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Localisation / Adresse
                  </label>
                  <input
                    type="text"
                    required
                    value={shopLocation}
                    onChange={(e) => setShopLocation(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                  Description d'activité & Spécialités
                </label>
                <textarea
                  required
                  rows={3}
                  value={shopDesc}
                  onChange={(e) => setShopDesc(e.target.value)}
                  className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Téléphone Principal
                  </label>
                  <input
                    type="text"
                    required
                    value={shopPhone}
                    onChange={(e) => setShopPhone(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    WhatsApp (Format international, ex: 221775551234)
                  </label>
                  <input
                    type="text"
                    required
                    value={shopWhatsapp}
                    onChange={(e) => setShopWhatsapp(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Heures d'ouverture
                  </label>
                  <input
                    type="text"
                    required
                    value={shopHours}
                    onChange={(e) => setShopHours(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                  Email de contact
                </label>
                <input
                  type="email"
                  required
                  value={shopEmail}
                  onChange={(e) => setShopEmail(e.target.value)}
                  className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] font-bold text-xs uppercase tracking-wider hover:shadow-lg transition-all"
              >
                Mettre à jour ma boutique
              </button>
            </form>
          </div>
        )}

        {/* 3. CATALOGUE ITEMS MANAGEMENT */}
        {activeSection === 'catalog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-white">Catalogue Produits ({vendorProducts.length})</h3>
                <p className="text-xs text-stone-400">Gérez vos articles en vente directe, modifiez les stocks ou les instructions.</p>
              </div>

              <button
                onClick={() => handleOpenProductModal(null)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#00f2c3] text-[#001714] text-xs font-bold uppercase transition-all hover:bg-white"
              >
                <PlusSquare className="w-4 h-4" />
                <span>Ajouter un produit</span>
              </button>
            </div>

            {/* List and Grid with stock markers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorProducts.map((product) => {
                const isStockLow = product.stock <= 20;
                return (
                  <div 
                    key={product.id}
                    className="bg-[#012d26]/40 border border-[#034438] rounded-2xl overflow-hidden p-4 space-y-4 hover:border-[#00f2c3]/30 transition-all flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-stone-900 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1 text-left min-w-0 flex-1">
                        <span className="text-[9px] bg-[#023129] border border-[#044c3f] text-[#00f2c3] px-2 py-0.5 rounded font-mono uppercase">
                          {product.category}
                        </span>
                        
                        <h4 className="font-bold text-xs sm:text-sm text-stone-100 truncate">{product.name}</h4>
                        <p className="text-[11px] text-[#00f7a6] font-mono font-extrabold">{product.price.toLocaleString()} FCFA</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs border-y border-[#033a30] py-2">
                      <span className="text-stone-400">Stock disponible :</span>
                      {isStockLow ? (
                        <span className="text-red-400 font-bold uppercase font-mono animate-pulse bg-red-500/10 px-2.5 py-0.5 rounded border border-red-500/20">
                          ⚠️ ALERTE BAS ({product.stock})
                        </span>
                      ) : (
                        <span className="text-[#00f7a6] font-bold font-mono">
                          {product.stock} unités
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenProductModal(product)}
                        className="flex-1 py-2 bg-[#024035] text-[#00f2c3] border border-[#03594b] text-[11px] font-bold rounded-xl hover:bg-[#03594b] transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 inline mr-1" /> Modifier
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Voulez-vous vraiment ôter "${product.name}" du catalogue ?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. ORDERS LIST FOR VENDOR */}
        {activeSection === 'orders' && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#033a30]">
              <h3 className="font-extrabold text-base text-white">Gestion des Commandes Clients</h3>
              <p className="text-xs text-stone-400">Suivez l'état en temps réel. Mettez le statut à 'Livrée' pour créditer directement vos revenus.</p>
            </div>

            {vendorOrders.length === 0 ? (
              <div className="text-center py-12 bg-[#012d26]/40 border border-[#034438] rounded-3xl p-6">
                <p className="text-stone-400 text-sm">Aucune commande n'a encore été passée chez vous.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {vendorOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="bg-[#012d26]/45 border border-[#034438] rounded-2xl p-5 hover:border-[#00f2c3]/20 transition-all flex flex-col md:flex-row justify-between gap-6"
                  >
                    
                    {/* General Order Specs */}
                    <div className="space-y-3 flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-xs font-mono font-extrabold text-[#00f2c3]">{order.id}</span>
                        <span className="text-[10px] text-stone-400 font-mono">Date: {order.date}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono uppercase ${
                          order.status === 'Livrée' ? 'bg-emerald-500/10 text-emerald-400' :
                          order.status === 'Expédiée' ? 'bg-cyan-500/10 text-cyan-400' :
                          order.status === 'En attente' ? 'bg-orange-500/10 text-orange-400 animate-pulse' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          ● {order.status}
                        </span>
                      </div>

                      {/* Items Row inside order */}
                      <div className="p-3 bg-[#001714] border border-[#033129] rounded-xl space-y-1 max-w-lg">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-stone-300">
                            <span>{item.name} <strong className="text-[#00f2c3]">x{item.quantity}</strong></span>
                            <span className="font-mono text-stone-400">{(item.price * item.quantity).toLocaleString()} F</span>
                          </div>
                        ))}
                        <div className="border-t border-[#02332a] pt-1 mt-1.5 flex justify-between text-xs font-extrabold text-white">
                          <span>Montant Total :</span>
                          <span className="text-[#00f7a6]">{order.total.toLocaleString()} FCFA</span>
                        </div>
                      </div>

                      {/* Client information summary */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-stone-400">
                        <div>
                          <strong>👩‍🌾 Client :</strong> {order.clientName}
                        </div>
                        <div>
                          <strong>📞 Téléphone :</strong> {order.clientPhone}
                        </div>
                        <div>
                          <strong>📍 Adresse :</strong> {order.clientAddress}
                        </div>
                      </div>
                    </div>

                    {/* Operational controls */}
                    <div className="flex flex-col justify-between items-stretch md:items-end gap-3 w-full md:w-56">
                      <div className="text-right text-[10px] text-stone-400">
                        <span className="font-bold">Moyen de paiement :</span> <br />
                        <span className="text-[#00f2c3] uppercase font-bold font-mono">{order.paymentMethod}</span>
                      </div>

                      {/* Print Slipping Invoice trigger */}
                      <button
                        onClick={() => setViewingInvoiceOrder(order)}
                        className="py-1.5 px-3 rounded-lg border border-[#034d3f] bg-[#001714] text-[10px] text-stone-300 font-bold uppercase tracking-wider hover:text-[#00f2c3] hover:border-[#00f2c3] transition-all flex items-center justify-center space-x-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#00b59c]" />
                        <span>Imprimer le Bon / Facture</span>
                      </button>

                      {/* Quick flow status trigger buttons */}
                      {order.status !== 'Livrée' && (
                        <div className="space-y-1.5 w-full">
                          <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest leading-none">Modifier le statut :</p>
                          <div className="grid grid-cols-2 gap-1 text-[10.5px]">
                            {order.status === 'En attente' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'Confirmée')}
                                className="col-span-2 py-1.5 rounded bg-amber-500 text-stone-900 font-bold"
                              >
                                Confirmer la CMD
                              </button>
                            )}
                            {order.status === 'Confirmée' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'Préparation')}
                                className="col-span-2 py-1.5 rounded bg-blue-500 text-white font-bold"
                              >
                                Passer en préparation
                              </button>
                            )}
                            {order.status === 'Préparation' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'Expédiée')}
                                className="col-span-2 py-1.5 rounded bg-cyan-500 text-stone-900 font-bold"
                              >
                                Expédier / Remettre livreur
                              </button>
                            )}
                            {order.status === 'Expédiée' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'Livrée')}
                                className="col-span-2 py-2 rounded bg-emerald-500 text-stone-900 font-extrabold uppercase animate-pulse"
                              >
                                Déclarer LIVRÉE (Créditer $)
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {order.status === 'Livrée' && (
                        <div className="text-right text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <span>✓ Transféré au portefeuille pro</span>
                        </div>
                      )}

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* 5. PORTFOLIO & WITHDRAWALS */}
        {activeSection === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Withdrawal form */}
            <div className="bg-[#012d26]/40 border border-[#034438] rounded-3xl p-6 space-y-6 text-left">
              <div>
                <h3 className="font-extrabold text-base text-white">Retrait de Fonds Instantané</h3>
                <p className="text-xs text-stone-400">Demandez le versement de vos fonds vers vos comptes Mobile Money favoris.</p>
              </div>

              <div className="p-4 bg-[#001714] border border-[#033129] rounded-2xl">
                <span className="text-[10px] font-mono text-stone-400 uppercase">SOLDE TOTAL DISPONIBLE</span>
                <p className="text-3xl font-mono font-extrabold text-[#00f7a6] mt-1">{walletBalance.toLocaleString()} F CFA</p>
                <span className="text-[9px] text-[#00b59c] leading-none mt-2 block">✓ Commission de plateforme déduite (10%). Aucun autre frais caché !</span>
              </div>

              <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Opérateur Partenaire (Mobile Money) :
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Wave', 'Orange Money', 'MTN MoMo'].map((prov) => (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => setPayoutProvider(prov)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          payoutProvider === prov 
                            ? 'bg-[#00f2c3] text-[#001714] border-[#00f2c3]' 
                            : 'bg-[#001714] text-stone-300 border-[#033a30] hover:border-[#00f2c3]/30'
                        }`}
                      >
                        {prov}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                      Numéro de téléphone cible :
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutPhone}
                      onChange={(e) => setPayoutPhone(e.target.value)}
                      className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                      Montant à transférer (F CFA) :
                    </label>
                    <input
                      type="number"
                      required
                      min="1000"
                      value={withdrawAmount === 0 ? '' : withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      placeholder="Ex: 50000"
                      className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                    />
                  </div>
                </div>

                {walletFeedback && <p className="text-xs text-red-400 font-bold">{walletFeedback}</p>}

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Confirmer le virement de fonds &rarr;
                </button>
              </form>
            </div>

            {/* Withdrawals History of Shop */}
            <div className="bg-[#012d26]/40 border border-[#034438] rounded-3xl p-6 text-left">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wide font-mono text-[#00b59c] mb-4">
                Historique des Retraits
              </h3>
              {withdrawals.length === 0 ? (
                <div className="text-center py-12 bg-[#001714] border border-[#032e26] rounded-2xl p-4 text-stone-400 text-xs">
                  Aucun retrait effectué sur ce compte.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                  {withdrawals.map((w) => (
                    <div key={w.id} className="p-3.5 rounded-xl bg-[#001714] border border-[#03332a] flex justify-between items-center text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[10px] text-stone-500">{w.id}</span>
                          <span className="bg-[#02382f] text-[#00f2c3] font-bold text-[9px] px-1.5 py-0.5 rounded font-mono uppercase">{w.provider}</span>
                        </div>
                        <p className="text-stone-300 font-mono text-[11px]">Téléphone : {w.phone}</p>
                        <p className="text-[10px] text-stone-500">{w.date}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-mono text-[#ff4a5a] font-extrabold">- {w.amount.toLocaleString()} F</p>
                        <span className="text-[9px] text-emerald-400 font-bold uppercase">{w.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* 1. MOCK BILLS / INVOICE PREVIEW MODAL */}
      {viewingInvoiceOrder && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white text-stone-900 rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setViewingInvoiceOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Letterhead Design */}
            <div className="flex justify-between items-start border-b border-stone-200 pb-4">
              <div className="text-left">
                <span className="text-base font-extrabold text-[#00b59c] tracking-tight">AgriElevage Connect</span>
                <p className="text-[9px] font-mono text-stone-500 uppercase">Facturation & Bordereau de Livraison</p>
                <p className="text-[9px] text-stone-400 font-mono mt-1">Sénégal AgriTech Hub</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-stone-100 text-stone-700 py-1 px-3 rounded font-mono font-bold uppercase">{viewingInvoiceOrder.status}</span>
                <p className="text-[10px] font-mono text-stone-500 mt-1">{viewingInvoiceOrder.id}</p>
              </div>
            </div>

            {/* Client and Vendor Specific Blocks */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-left space-y-0.5">
                <strong className="text-stone-500 uppercase tracking-wider text-[9px] block">Fournisseur :</strong>
                <p className="font-extrabold text-stone-800">{shop.name}</p>
                <p className="text-stone-500 leading-normal">{shop.location}</p>
                <p className="text-stone-500">{shop.contactPhone}</p>
              </div>
              
              <div className="text-left space-y-0.5 border-l border-stone-100 pl-4">
                <strong className="text-stone-500 uppercase tracking-wider text-[9px] block">Destinataire (Acheteur) :</strong>
                <p className="font-extrabold text-stone-800">{viewingInvoiceOrder.clientName}</p>
                <p className="text-stone-500 leading-normal">{viewingInvoiceOrder.clientAddress}</p>
                <p className="text-stone-500">{viewingInvoiceOrder.clientPhone}</p>
              </div>
            </div>

            {/* Core tabular list of products */}
            <div className="space-y-2">
              <div className="border-b border-stone-200 pb-1 flex justify-between text-[10px] text-stone-400 font-mono uppercase tracking-wider font-bold">
                <span>Désignation Article</span>
                <div className="flex space-x-6 min-w-[120px] justify-between">
                  <span>Qté</span>
                  <span>Total</span>
                </div>
              </div>

              <div className="space-y-1.5">
                {viewingInvoiceOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-stone-800 font-medium">{item.name}</span>
                    <div className="flex space-x-6 min-w-[120px] justify-between font-mono">
                      <span className="text-stone-500">x{item.quantity}</span>
                      <strong className="text-stone-800">{(item.price * item.quantity).toLocaleString()} F</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-3 mt-3 flex justify-between items-center">
                <div className="text-left text-[9px] text-stone-500">
                  <span className="font-bold">Moyen de règlement :</span> {viewingInvoiceOrder.paymentMethod} <br />
                  <span>Génération le {viewingInvoiceOrder.date}</span>
                </div>
                <div className="text-right text-base font-extrabold text-stone-900 font-mono">
                  Total : {viewingInvoiceOrder.total.toLocaleString()} F CFA
                </div>
              </div>
            </div>

            {/* Delivery conditions notice */}
            <div className="p-3 bg-stone-50 rounded-xl text-center border border-stone-100">
              <p className="text-[9px] text-stone-500 leading-normal">
                📦 <strong>Bordereau officiel AgriElevage Connect :</strong> Veuillez vérifier l'état physique du foin, de l'aliment ou du flacon de vaccin vétérinaire en présence du livreur avant de contre-signer le document papier d'expédition.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => alert(`🖨️ Simulation de l'impression physique lancée sur votre imprimante locale pour la commande ${viewingInvoiceOrder.id}.`)}
                className="flex-1 py-2.5 bg-[#001714] text-[#00f2c3] text-xs font-bold uppercase rounded-xl transition-all"
              >
                Imprimer Facture 🖨️
              </button>
              <button
                onClick={() => setViewingInvoiceOrder(null)}
                className="flex-1 py-2.5 bg-stone-100 text-stone-600 text-xs font-bold uppercase rounded-xl hover:bg-stone-200"
              >
                Fermer l'aperçu
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. DYNAMIC ADD/EDIT PRODUCT CATALOG MODAL FORM */}
      {showProductModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#01221b] border-2 border-[#035547] rounded-3xl p-6 relative text-left overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-base text-white mb-6">
              {editingProduct ? 'Modifier la Fiche Produit' : 'Ajouter un nouveau Produit au Catalogue'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Nom du Produit
                  </label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="Ex: Tourteau de soja - 50kg"
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Catégorie
                  </label>
                  <select
                    value={pCategory}
                    onChange={(e: any) => setPCategory(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  >
                    <option value="Aliment">Aliment</option>
                    <option value="Médicament">Médicament</option>
                    <option value="Équipement">Équipement</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                  Description succincte
                </label>
                <textarea
                  required
                  rows={2}
                  value={pDescription}
                  onChange={(e) => setPDescription(e.target.value)}
                  placeholder="Expliquez l'intérêt ou les bienfaits pour le cheptel..."
                  className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Prix (FCFA)
                  </label>
                  <input
                    type="number"
                    required
                    min="500"
                    value={pPrice === 0 ? '' : pPrice}
                    onChange={(e) => setPPrice(Number(e.target.value))}
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Stock Initial (Unités)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={pStock}
                    onChange={(e) => setPStock(Number(e.target.value))}
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                    Image (Unsplash URL ou suggestion)
                  </label>
                  <input
                    type="text"
                    required
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="w-full bg-[#001714] border border-[#033a30] text-[10px] text-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>
              </div>

              {/* Subcategories animal specific check values */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 font-bold mb-1.5">
                  Espèces animales concernées (au moins une) :
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {animalOptions.map((animal) => {
                    const isChecked = pAnimals.includes(animal);
                    return (
                      <button
                        key={animal}
                        type="button"
                        onClick={() => handleToggleAnimal(animal)}
                        className={`py-1 px-2 text-[10px] rounded-lg transition-all ${
                          isChecked 
                            ? 'bg-[#00f2c3] text-[#001714] font-bold border border-[#00f2c3]' 
                            : 'bg-[#001714] text-stone-400 border border-[#033a30]'
                        }`}
                      >
                        {animal}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical block sheets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-[#00b59c] font-bold mb-1">
                    Composition technique (Fiche produit)
                  </label>
                  <textarea
                    rows={2}
                    value={pComposition}
                    onChange={(e) => setPComposition(e.target.value)}
                    placeholder="Ex: Protéines, Sels mineraux, vitamines..."
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-300 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-[#00b59c] font-bold mb-1">
                    Posologie / Dosage recommandé
                  </label>
                  <textarea
                    rows={2}
                    value={pDosage}
                    onChange={(e) => setPDosage(e.target.value)}
                    placeholder="Ex: Diluer 2ml de médicament par litre d'eau..."
                    className="w-full bg-[#001714] border border-[#033a30] text-xs text-stone-300 rounded-xl p-3 focus:outline-none focus:border-[#00f2c3]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#00f2c3] text-[#001714] font-extrabold text-xs uppercase tracking-wider hover:shadow-lg transition-all"
              >
                Sauvegarder et publier l'article
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
