import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Product, Shop } from '../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Store, 
  ChevronRight, 
  SlidersHorizontal,
  DollarSign, 
  CircleDot,
  Plus,
  ShoppingBag,
  Info
} from 'lucide-react';

interface MarketplaceProps {
  onOpenAuth: () => void;
  onOpenProductDetail: (product: Product) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onOpenAuth, onOpenProductDetail }) => {
  const { shops, products, addToCart, currentUser } = useApp();
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedAnimal, setSelectedAnimal] = useState<string>('Tous');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [selectedLocation, setSelectedLocation] = useState<string>('Tous');
  
  // UI Tabs: 'products' | 'shops'
  const [activeTab, setActiveTab] = useState<'products' | 'shops'>('products');

  const categories = ['Tous', 'Aliment', 'Médicament', 'Équipement'];
  const animals = ['Tous', 'Bovins', 'Volailles', 'Porcins', 'Ovins', 'Caprins', 'Équins'];
  const locations = ['Tous', 'Dakar', 'Rufisque', 'Thies', 'Mbao'];

  // Add to cart with feedback / warning
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Filter logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Tous' || p.category === selectedCategory;
    
    const matchesAnimal = selectedAnimal === 'Tous' || p.animalTypes.includes(selectedAnimal as any);
    
    const matchesPrice = p.price <= maxPrice;
    
    const shop = shops.find(s => s.id === p.vendorId);
    const matchesLocation = selectedLocation === 'Tous' || 
       (shop && shop.location.toLowerCase().includes(selectedLocation.toLowerCase()));

    return matchesSearch && matchesCategory && matchesAnimal && matchesPrice && matchesLocation;
  });

  const filteredShops = shops.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'Tous' || s.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012520] via-[#011915] to-[#000e0c] text-stone-100 pb-16">
      
      {/* OmniSave inspired Hero Section with beautiful bright teal glowing design */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#033a30] bg-[#001714]">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#00f2c3]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-[#00b59c]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Subtle badges in row */}
          <div className="flex items-center justify-center space-x-2.5 mb-6">
            <span className="px-3 py-1 rounded-full border border-[#04594a]/60 bg-[#022822] text-[#00f2c3] text-[10px] font-mono tracking-wider uppercase font-semibold">
              🌾 Sénégal Éco-Agri
            </span>
            <span className="px-3 py-1 rounded-full border border-[#04594a]/60 bg-[#022822] text-[#00f7a6] text-[10px] font-mono tracking-wider uppercase font-semibold">
              📦 Multi-Boutiques
            </span>
            <span className="px-3 py-1 rounded-full border border-[#04594a]/60 bg-[#022822] text-[#00d0ff] text-[10px] font-mono tracking-wider uppercase font-semibold">
              📜 Formations Certifiées
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            La Marketplace de l'Élevage <br />
            <span className="bg-gradient-to-r from-[#00f2c3] to-[#00f7a6] bg-clip-text text-transparent">
              Moderne & Connecté
            </span>
          </h1>
          
          <p className="text-stone-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
            Trouvez les meilleurs aliments pour bovins, médicaments agréés et équipements d'élevage livrés à domicile au Sénégal. Apprenez auprès de vétérinaires certifiés !
          </p>

          {/* OmniSave inspired Search Pill Input bar */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="relative p-1.5 rounded-full bg-[#001f1b] border-2 border-[#03594b] focus-within:border-[#00f2c3] transition-all flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <div className="flex items-center pl-4 pr-2 text-stone-400">
                <Search className="w-5 h-5 text-[#00b59c]" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit (tourteau de coton, vaccins, abreuvoirs), une ferme, une zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none text-white text-xs sm:text-sm focus:outline-none placeholder-stone-400 py-2"
              />
              <button 
                className="px-6 py-2.5 sm:px-8 rounded-full bg-[#00f2c3] text-[#001714] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#00d9ae] hover:shadow-[0_0_20px_rgba(0,242,195,0.4)] transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>Rechercher</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center mt-3 space-x-1.5 text-[11px] text-stone-400">
              <span>Suggestions fréquentes :</span>
              <button onClick={() => setSearchTerm('Coton')} className="text-[#00f2c3] hover:underline">Tourteau de Coton</button>
              <span>•</span>
              <button onClick={() => setSearchTerm('Newcastle')} className="text-[#00f2c3] hover:underline">Vaccin Newcastle</button>
              <span>•</span>
              <button onClick={() => setSearchTerm('Abreuvoir')} className="text-[#00f2c3] hover:underline">Abreuvoir</button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Arena */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Filters - Sticky desk bar */}
          <aside className="w-full lg:w-72 flex-shrink-0 bg-[#012d26]/80 backdrop-blur-md rounded-3xl border border-[#034438] p-6 self-start space-y-6">
            <div className="flex items-center justify-between border-b border-[#034d3f] pb-3">
              <h3 className="font-semibold text-sm text-white flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#00f2c3]" />
                <span>Filtres de Recherche</span>
              </h3>
              {(selectedCategory !== 'Tous' || selectedAnimal !== 'Tous' || selectedLocation !== 'Tous' || maxPrice !== 30000) && (
                <button 
                  onClick={() => {
                    setSelectedCategory('Tous');
                    setSelectedAnimal('Tous');
                    setSelectedLocation('Tous');
                    setMaxPrice(30000);
                  }}
                  className="text-[10px] text-red-400 hover:underline"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300">
                Prix Maximum : <span className="text-[#00f2c3]">{maxPrice.toLocaleString()} FCFA</span>
              </label>
              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#00f2c3] bg-[#001714] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>1 000 F</span>
                <span>30 000 F+</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300">Catégorie Produit :</label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between w-full p-2 text-left rounded-xl text-xs transition-all ${
                      selectedCategory === cat 
                        ? 'bg-[#034a3e] text-[#00f2c3] border border-[#045c4e] font-semibold' 
                        : 'text-stone-300 hover:bg-[#023129] border border-transparent'
                    }`}
                  >
                    <span>{cat === 'Tous' ? 'Toutes Catégories' : cat}</span>
                    <CircleDot className={`w-3 h-3 ${selectedCategory === cat ? 'text-[#00f2c3]' : 'text-stone-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Animal Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300">Espèce Animale :</label>
              <div className="grid grid-cols-2 gap-1.5">
                {animals.map((anim) => (
                  <button
                    key={anim}
                    onClick={() => setSelectedAnimal(anim)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] text-center transition-all ${
                      selectedAnimal === anim 
                        ? 'bg-[#00f2c3] text-[#001714] font-bold' 
                        : 'bg-[#001714] text-stone-300 border border-[#033a30] hover:border-[#00f2c3]/30'
                    }`}
                  >
                    {anim}
                  </button>
                ))}
              </div>
            </div>

            {/* Geographical Location Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00f2c3]" />
                <span>Zone (Sénégal) :</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#001714] text-xs text-white border border-[#033a30] rounded-xl p-2.5 focus:outline-none focus:border-[#00f2c3]"
              >
                <option value="Tous">Toutes les régions</option>
                <option value="Dakar">Dakar Région</option>
                <option value="Rufisque">Rufisque</option>
                <option value="Mbao">Mbao</option>
                <option value="Thies">Thiès</option>
              </select>
            </div>

          </aside>

          {/* Right Area - Grid of Shops or Products */}
          <section className="flex-1">
            
            {/* View Switcher Bar */}
            <div className="flex items-center justify-between bg-[#012d26]/80 backdrop-blur-md rounded-2xl border border-[#034438] p-3 mb-6">
              <div className="flex bg-[#001714] p-1 rounded-xl border border-[#033a30]">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center space-x-1.5 py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === 'products' 
                      ? 'bg-[#024d40] text-[#00f2c3] font-bold' 
                      : 'text-stone-400 hover:text-stone-100'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Tous les Produits ({filteredProducts.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('shops')}
                  className={`flex items-center space-x-1.5 py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === 'shops' 
                      ? 'bg-[#024d40] text-[#00f2c3] font-bold' 
                      : 'text-stone-400 hover:text-stone-100'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Voir les Boutiques ({filteredShops.length})</span>
                </button>
              </div>

              {/* Counter status label */}
              <div className="text-[11px] text-stone-400 font-mono">
                {activeTab === 'products' ? (
                  <span>{filteredProducts.length} Articles trouvés</span>
                ) : (
                  <span>{filteredShops.length} Vendeurs certifiés</span>
                )}
              </div>
            </div>

            {/* Products Tab View */}
            {activeTab === 'products' && (
              <div>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-[#012520] border border-[#034438] rounded-3xl p-8">
                    <p className="text-stone-400 text-sm">Aucun produit ne correspond à vos filtres.</p>
                    <button 
                      onClick={() => {
                        setSelectedCategory('Tous');
                        setSelectedAnimal('Tous');
                        setSelectedLocation('Tous');
                        setMaxPrice(30000);
                        setSearchTerm('');
                      }}
                      className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs bg-[#00f2c3] text-[#001714] font-bold uppercase tracking-wider"
                    >
                      Effacer les filtres
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => {
                      const shop = shops.find(s => s.id === product.vendorId);
                      return (
                        <div 
                          key={product.id}
                          onClick={() => onOpenProductDetail(product)}
                          className="group bg-[#012d26]/40 backdrop-blur-sm border border-[#034438] hover:border-[#00f2c3]/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] cursor-pointer"
                        >
                          <div className="relative">
                            {/* Image Container */}
                            <div className="aspect-video w-full overflow-hidden bg-[#001714] relative">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-[#00f2c3] font-bold uppercase tracking-wider">
                                {product.category}
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 space-y-1.5">
                              {/* Shop profile connection */}
                              <div className="flex items-center space-x-1.5 text-[10px] text-stone-400 font-medium">
                                <span className="bg-[#023e33] text-[#00f2c3] p-1 rounded-md text-[10px] leading-tight">
                                  {shop?.logo || '🏪'}
                                </span>
                                <span className="hover:underline text-stone-300 font-bold truncate">
                                  {shop?.name || 'Vendeur'}
                                </span>
                              </div>

                              <h4 className="font-semibold text-sm text-stone-100 group-hover:text-[#00f2c3] transition-colors leading-snug line-clamp-2">
                                {product.name}
                              </h4>

                              {/* Animal tags row */}
                              <div className="flex flex-wrap gap-1 pt-1">
                                {product.animalTypes.map((anim, idx) => (
                                  <span key={idx} className="bg-[#001c18] border border-[#034438] text-[9px] text-[#00f2c3] font-mono px-1.5 py-0.5 rounded">
                                    {anim}
                                  </span>
                                ))}
                              </div>

                              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed pt-1">
                                {product.description}
                              </p>
                            </div>
                          </div>

                          {/* Footer action */}
                          <div className="px-4 pb-4 pt-1.5 border-t border-[#033d32]/45 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-mono text-stone-400 uppercase">Prix</span>
                              <span className="text-base font-extrabold text-[#00f7a6]">
                                {product.price.toLocaleString()} F CFA
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              {product.stock <= 5 ? (
                                <span className="text-[10px] text-orange-400 font-bold uppercase font-mono px-2 py-1 bg-orange-500/10 rounded-lg animate-pulse border border-orange-500/25">
                                  Pris d'assaut (Stock: {product.stock})
                                </span>
                              ) : (
                                <span className="text-[10px] text-[#00b59c] font-mono">
                                  En stock
                                </span>
                              )}

                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                disabled={product.stock === 0}
                                className="p-2.5 rounded-xl bg-[#00f2c3] hover:bg-[#00d0ac] text-[#001714] shadow-md hover:shadow-[0_0_15px_rgba(0,242,195,0.4)] disabled:bg-stone-800 disabled:text-stone-500 transition-all cursor-pointer"
                              >
                                <Plus className="w-4 h-4 stroke-[3]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Shops Tab View */}
            {activeTab === 'shops' && (
              <div>
                {filteredShops.length === 0 ? (
                  <div className="text-center py-16 bg-[#012520] border border-[#034438] rounded-3xl p-8">
                    <p className="text-stone-400 text-sm">Aucune boutique ne correspond à vos filtres.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredShops.map((shop) => {
                      // Count shop products
                      const shopProducts = products.filter(p => p.vendorId === shop.id);
                      return (
                        <Link 
                          key={shop.id}
                          to={`/boutique/${shop.id}`}
                          className="group bg-[#012d26]/40 backdrop-blur-sm border border-[#034438] hover:border-[#00f2c3]/30 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
                        >
                          <div className="h-28 w-full overflow-hidden bg-[#001714] relative">
                            <img 
                              src={shop.banner} 
                              alt={shop.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-[#001511]/40" />
                          </div>

                          <div className="p-6 pt-0 relative flex-1 flex flex-col justify-between">
                            {/* Logo overlay badge */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#012d26] to-[#024d40] border-2 border-[#00f2c3] flex items-center justify-center text-3xl -mt-7 shadow-lg relative z-10">
                              {shop.logo}
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-extrabold text-lg text-white group-hover:text-[#00f2c3] transition-colors">
                                  {shop.name}
                                </h4>
                                <div className="flex items-center space-x-1 text-[#ffb800]">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="text-xs font-bold text-stone-200">{shop.rating}</span>
                                  <span className="text-[10px] text-stone-400">({shop.reviewsCount})</span>
                                </div>
                              </div>

                              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                                {shop.description}
                              </p>

                              <div className="flex items-center space-x-2 text-stone-300 text-[11px] pt-1.5">
                                <MapPin className="w-3.5 h-3.5 text-[#00f2c3]" />
                                <span className="truncate">{shop.location}</span>
                              </div>
                            </div>

                            {/* Footer links */}
                            <div className="mt-6 pt-4 border-t border-[#033d32]/45 flex items-center justify-between text-xs font-semibold">
                              <span className="text-[#00f2c3] font-mono">
                                {shopProducts.length} Articles en catalogue
                              </span>
                              <span className="text-[#00b59c] group-hover:translate-x-1.5 transition-transform flex items-center space-x-1">
                                <span>Visiter la boutique</span>
                                <ChevronRight className="w-4 h-4" />
                              </span>
                            </div>

                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </section>

        </div>
      </main>

    </div>
  );
};
