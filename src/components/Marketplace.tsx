import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Product, Shop } from '../types';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
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
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedLocation, setSelectedLocation] = useState<string>('Tous');
  
  // UI Tabs: 'products' | 'shops' | 'map'
  const [activeTab, setActiveTab] = useState<'products' | 'shops' | 'map'>('products');

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
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D2926] pb-16">
      
      {/* OmniSave inspired Hero Section with beautiful bright teal glowing design */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-stone-200 bg-white">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#4F7942]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-[#6B8E23]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Subtle badges in row */}
          <div className="flex items-center justify-center space-x-2.5 mb-6">
            <span className="px-3 py-1 rounded-full border border-stone-200 bg-stone-50 text-[#4F7942] text-[10px] font-mono tracking-wider uppercase font-extrabold">
              🌾 Sénégal Éco-Agri
            </span>
            <span className="px-3 py-1 rounded-full border border-stone-200 bg-stone-50 text-[#6B8E23] text-[10px] font-mono tracking-wider uppercase font-extrabold">
              📦 Multi-Boutiques
            </span>
            <span className="px-3 py-1 rounded-full border border-stone-200 bg-stone-50 text-[#D2691E] text-[10px] font-mono tracking-wider uppercase font-extrabold">
              📜 Formations Certifiées
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-stone-950 max-w-4xl mx-auto leading-tight sm:leading-none">
            La Marketplace de l'Élevage <br />
            <span className="bg-gradient-to-r from-[#4F7942] to-[#6B8E23] bg-clip-text text-transparent">
              Moderne & Connecté
            </span>
          </h1>
          
          <p className="text-stone-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
            Trouvez les meilleurs aliments pour bovins, médicaments agréés et équipements d'élevage livrés à domicile au Sénégal. Apprenez auprès de vétérinaires certifiés !
          </p>

          {/* OmniSave inspired Search Pill Input bar */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="relative p-1.5 rounded-full bg-stone-50 border-2 border-stone-200 focus-within:border-[#4F7942] transition-all flex items-center shadow-md">
              <div className="flex items-center pl-4 pr-2 text-stone-400">
                <Search className="w-5 h-5 text-[#D2691E]" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit (tourteau de coton, vaccins, abreuvoirs), une ferme, une zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none text-stone-800 text-xs sm:text-sm focus:outline-none placeholder-stone-400 py-2"
              />
              <button 
                className="px-6 py-2.5 sm:px-8 rounded-full bg-[#4F7942] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#3D5E32] transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>Rechercher</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center mt-3 space-x-1.5 text-[11px] text-stone-500">
              <span>Suggestions fréquentes :</span>
              <button onClick={() => setSearchTerm('Coton')} className="text-[#4F7942] hover:underline font-semibold">Tourteau de Coton</button>
              <span>•</span>
              <button onClick={() => setSearchTerm('Newcastle')} className="text-[#4F7942] hover:underline font-semibold">Vaccin Newcastle</button>
              <span>•</span>
              <button onClick={() => setSearchTerm('Abreuvoir')} className="text-[#4F7942] hover:underline font-semibold">Abreuvoir</button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Arena */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Filters - Sticky desk bar */}
          <aside className="w-full lg:w-72 flex-shrink-0 bg-white rounded-3xl border border-stone-200 p-6 self-start space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-semibold text-sm text-stone-900 flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#4F7942]" />
                <span>Filtres de Recherche</span>
              </h3>
              {(selectedCategory !== 'Tous' || selectedAnimal !== 'Tous' || selectedLocation !== 'Tous' || maxPrice !== 100) && (
                <button 
                  onClick={() => {
                    setSelectedCategory('Tous');
                    setSelectedAnimal('Tous');
                    setSelectedLocation('Tous');
                    setMaxPrice(100);
                  }}
                  className="text-[10px] text-red-500 hover:underline"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                Prix Maximum : <span className="text-[#4F7942]">${maxPrice.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#4F7942] bg-stone-200 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500">
                <span>$5</span>
                <span>$100+</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">Catégorie Produit :</label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between w-full p-2 text-left rounded-xl text-xs transition-all ${
                      selectedCategory === cat 
                        ? 'bg-stone-100 text-[#4F7942] border border-stone-200 font-bold' 
                        : 'text-stone-600 hover:bg-stone-50 border border-transparent'
                    }`}
                  >
                    <span>{cat === 'Tous' ? 'Toutes Catégories' : cat}</span>
                    <CircleDot className={`w-3.5 h-3.5 ${selectedCategory === cat ? 'text-[#4F7942]' : 'text-stone-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Animal Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">Espèce Animale :</label>
              <div className="grid grid-cols-2 gap-1.5">
                {animals.map((anim) => (
                  <button
                    key={anim}
                    onClick={() => setSelectedAnimal(anim)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] text-center transition-all cursor-pointer ${
                      selectedAnimal === anim 
                        ? 'bg-[#4F7942] text-white font-extrabold' 
                        : 'bg-stone-50 text-stone-600 border border-stone-250 hover:border-[#4F7942]/30'
                    }`}
                  >
                    {anim}
                  </button>
                ))}
              </div>
            </div>

            {/* Geographical Location Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#4F7942]" />
                <span>Zone (Sénégal) :</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-white text-xs text-stone-800 border border-stone-200 rounded-xl p-2.5 focus:outline-none focus:border-[#4F7942]"
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
            <div className="flex items-center justify-between bg-white rounded-2xl border border-stone-200 p-3 mb-6 shadow-sm">
              <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center space-x-1.5 py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === 'products' 
                      ? 'bg-white text-[#4F7942] font-bold shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#4F7942]" />
                  <span>Tous les Produits ({filteredProducts.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('shops')}
                  className={`flex items-center space-x-1.5 py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === 'shops' 
                      ? 'bg-white text-[#4F7942] font-bold shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-[#4F7942]" />
                  <span>Voir les Boutiques ({filteredShops.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`flex items-center space-x-1.5 py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === 'map' 
                      ? 'bg-white text-[#4F7942] font-bold shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#4F7942]" />
                  <span>Carte des Boutiques</span>
                </button>
              </div>

              {/* Counter status label */}
              <div className="text-[11px] text-stone-500 font-mono">
                {activeTab === 'products' ? (
                  <span>{filteredProducts.length} Articles trouvés</span>
                ) : activeTab === 'shops' ? (
                  <span>{filteredShops.length} Vendeurs certifiés</span>
                ) : (
                  <span>Carte interactive</span>
                )}
              </div>
            </div>

            {/* Products Tab View */}
            {activeTab === 'products' && (
              <div>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
                    <p className="text-stone-500 text-sm">Aucun produit ne correspond à vos filtres.</p>
                    <button 
                      onClick={() => {
                        setSelectedCategory('Tous');
                        setSelectedAnimal('Tous');
                        setSelectedLocation('Tous');
                        setMaxPrice(30000);
                        setSearchTerm('');
                      }}
                      className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs bg-[#4F7942] text-white font-bold uppercase tracking-wider hover:bg-[#3D5E32]"
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
                          className="group bg-white border border-stone-200 hover:border-[#4F7942]/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-lg cursor-pointer"
                        >
                          <div className="relative">
                            {/* Image Container */}
                            <div className="aspect-video w-full overflow-hidden bg-stone-100 relative">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#4F7942] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                                {product.category}
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 space-y-1.5">
                              {/* Shop profile connection */}
                              <div className="flex items-center space-x-1.5 text-[10px] text-stone-500 font-medium">
                                <span className="bg-stone-100 text-[#4F7942] p-1 rounded-md text-[10px] leading-tight font-bold">
                                  {shop?.logo || '🏪'}
                                </span>
                                <span className="hover:underline text-stone-800 font-bold truncate">
                                  {shop?.name || 'Vendeur'}
                                </span>
                              </div>

                              <h4 className="font-semibold text-sm text-stone-900 group-hover:text-[#4F7942] transition-colors leading-snug line-clamp-2">
                                {product.name}
                              </h4>

                              {/* Animal tags row */}
                              <div className="flex flex-wrap gap-1 pt-1">
                                {product.animalTypes.map((anim, idx) => (
                                  <span key={idx} className="bg-stone-50 border border-stone-200 text-[9px] text-[#4F7942] font-mono px-1.5 py-0.5 rounded">
                                    {anim}
                                  </span>
                                ))}
                              </div>

                              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                                {product.description}
                              </p>
                            </div>
                          </div>

                          {/* Footer action */}
                          <div className="px-4 pb-4 pt-1.5 border-t border-stone-100 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-mono text-stone-500 uppercase">Prix</span>
                              <span className="text-base font-extrabold text-[#D2691E]">
                                ${product.price.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              {product.stock <= 5 ? (
                                <span className="text-[10px] text-orange-600 font-bold uppercase font-mono px-2 py-1 bg-orange-500/10 rounded-lg animate-pulse border border-orange-500/25">
                                  Pris d'assaut (Stock: {product.stock})
                                </span>
                              ) : (
                                <span className="text-[10px] text-[#4F7942] font-mono font-bold">
                                  En stock
                                </span>
                              )}

                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                disabled={product.stock === 0}
                                className="p-2.5 rounded-xl bg-[#4F7942] hover:bg-[#3D5E32] text-white shadow-md disabled:bg-stone-200 disabled:text-stone-400 transition-all cursor-pointer"
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
                  <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
                    <p className="text-stone-500 text-sm">Aucune boutique ne correspond à vos filtres.</p>
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
                          className="group bg-white border border-stone-200 hover:border-[#4F7942]/30 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-lg"
                        >
                          <div className="h-28 w-full overflow-hidden bg-stone-100 relative">
                            <img 
                              src={shop.banner} 
                              alt={shop.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                          </div>

                          <div className="p-6 pt-0 relative flex-1 flex flex-col justify-between">
                            {/* Logo overlay badge */}
                            <div className="w-14 h-14 rounded-2xl bg-stone-50 border-2 border-[#4F7942] flex items-center justify-center text-3xl -mt-7 shadow-lg relative z-10">
                              {shop.logo}
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-extrabold text-lg text-stone-900 group-hover:text-[#4F7942] transition-colors">
                                  {shop.name}
                                </h4>
                                <div className="flex items-center space-x-1 text-[#ffb800]">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="text-xs font-bold text-stone-800">{shop.rating}</span>
                                  <span className="text-[10px] text-stone-500">({shop.reviewsCount})</span>
                                </div>
                              </div>

                              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                                {shop.description}
                              </p>

                              <div className="flex items-center space-x-2 text-stone-600 text-[11px] pt-1.5">
                                <MapPin className="w-3.5 h-3.5 text-[#4F7942]" />
                                <span className="truncate">{shop.location}</span>
                              </div>
                            </div>

                            {/* Footer links */}
                            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                              <span className="text-[#4F7942] font-mono">
                                {shopProducts.length} Articles en catalogue
                              </span>
                              <span className="text-[#D2691E] group-hover:translate-x-1.5 transition-transform flex items-center space-x-1">
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

            {/* Map Tab View */}
            {activeTab === 'map' && (
              <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm h-[600px] w-full flex flex-col justify-center items-center">
                {!(process.env.GOOGLE_MAPS_PLATFORM_KEY) || process.env.GOOGLE_MAPS_PLATFORM_KEY === 'YOUR_API_KEY' ? (
                  <div className="p-8 text-center max-w-md">
                    <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-stone-700 mb-2">Clé API Google Maps requise</h2>
                    <p className="text-sm text-stone-500 mb-4">Pour afficher la carte interactive des boutiques, veuillez saisir votre clé API Google Maps (GOOGLE_MAPS_PLATFORM_KEY) dans les secrets (Settings).</p>
                  </div>
                ) : (
                  <APIProvider apiKey={process.env.GOOGLE_MAPS_PLATFORM_KEY || ''} version="weekly">
                    <Map
                      defaultCenter={{ lat: 14.7167, lng: -17.4677 }}
                      defaultZoom={11}
                      mapId="MARKETPLACE_MAP_ID"
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{ width: '100%', height: '100%' }}
                    >
                      {filteredShops.filter(shop => shop.coordinates).map(shop => (
                        <MarkerWithInfoWindow key={shop.id} shop={shop} />
                      ))}
                    </Map>
                  </APIProvider>
                )}
              </div>
            )}

          </section>

        </div>
      </main>

    </div>
  );
};

// Helper component for marker with info window
const MarkerWithInfoWindow: React.FC<{ shop: Shop }> = ({ shop }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [open, setOpen] = useState(false);

  if (!shop.coordinates) return null;

  return (
    <>
      <AdvancedMarker ref={markerRef} position={shop.coordinates} onClick={() => setOpen(true)} title={shop.name}>
        <Pin background="#4F7942" glyphColor="#fff" borderColor="#3D5E32" />
      </AdvancedMarker>
      {open && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
          <div className="p-2 max-w-[200px]">
            <h4 className="font-bold text-[#4F7942] mb-1">{shop.name}</h4>
            <p className="text-xs text-stone-600 mb-2 truncate">{shop.location}</p>
            <Link to={`/boutique/${shop.id}`} className="text-xs font-bold text-[#D2691E] hover:underline">
              Visiter la boutique →
            </Link>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
