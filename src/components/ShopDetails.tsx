import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Clock, 
  Plus, 
  ChevronRight, 
  Share2, 
  CheckCircle,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface ShopDetailsProps {
  onOpenProductDetail: (product: Product) => void;
}

export const ShopDetails: React.FC<ShopDetailsProps> = ({ onOpenProductDetail }) => {
  const { id } = useParams<{ id: string }>();
  const { shops, products, addToCart } = useApp();

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Tous');

  const shop = shops.find(s => s.id === id);

  if (!shop) {
    return (
      <div className="min-h-screen bg-[#001714] text-white flex flex-col items-center justify-center p-8">
        <p className="text-xl text-stone-400">Boutique introuvable.</p>
        <Link to="/" className="mt-4 px-6 py-2.5 rounded-xl bg-[#00f2c3] text-[#001714] font-bold text-xs uppercase">
          Retour au Marketplace
        </Link>
      </div>
    );
  }

  const shopProducts = products.filter(p => p.vendorId === shop.id);
  
  // Dynamic list of subcategories actually present in this shop's items
  const animalSubCategories = ['Tous', 'Bovins', 'Volailles', 'Ovins', 'Caprins', 'Équins'];

  const filteredShopProducts = shopProducts.filter(p => {
    return selectedSubCategory === 'Tous' || p.animalTypes.includes(selectedSubCategory as any);
  });

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012520] via-[#011915] to-[#000e0c] text-stone-100 pb-16">
      
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="inline-flex items-center space-x-2 text-stone-300 hover:text-[#00f2c3] transition-colors text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Marketplace</span>
        </Link>
      </div>

      {/* Jumbotron Banner Customization */}
      <section className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#001714]">
        <img 
          src={shop.banner} 
          alt={shop.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001714] via-transparent to-black/30" />
      </section>

      {/* Shop Profile Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-[#012d26] border border-[#034d3f] rounded-3xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#012d26] to-[#014e41] border-3 border-[#00f2c3] flex items-center justify-center text-5xl shadow-lg">
                {shop.logo}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {shop.name}
                  </h2>
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#00f2c3]/10 border border-[#00f2c3]/35 text-[9px] text-[#00f2c3] uppercase tracking-wider font-bold">
                    <Sparkles className="w-3 h-3 text-[#00f2c3] animate-spin" />
                    <span>Fournisseur Vérifié</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-300">
                  <div className="flex items-center space-x-1 text-[#ffb800]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-white">{shop.rating}</span>
                    <span className="text-stone-400">({shop.reviewsCount} avis)</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1 text-stone-300">
                    <MapPin className="w-3.5 h-3.5 text-[#00f2c3]" />
                    <span>{shop.location}</span>
                  </div>
                </div>

                <p className="text-stone-400 text-xs sm:text-sm max-w-2xl leading-relaxed pt-1.5">
                  {shop.description}
                </p>
              </div>
            </div>

            {/* CTA action triggers */}
            <div className="flex flex-wrap gap-2 sm:self-center">
              <a 
                href={`tel:${shop.contactPhone}`}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-[#035243] bg-[#001d19] text-xs font-semibold text-white hover:text-[#00f2c3] hover:border-[#00f2c3]/40 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Appeler</span>
              </a>

              {/* Whatsapp trigger */}
              <a 
                href={`https://wa.me/${shop.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 mr-2 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#033a30] text-xs text-stone-300">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#00f2c3]" />
              <div>
                <p className="text-stone-400 text-[10px] uppercase font-mono">Heures d'ouverture</p>
                <p className="font-semibold text-stone-200">{shop.hours}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#00f2c3]" />
              <div>
                <p className="text-stone-400 text-[10px] uppercase font-mono">E-mail Professionnel</p>
                <p className="font-semibold text-stone-200">{shop.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#00f2c3]" />
              <div>
                <p className="text-stone-400 text-[10px] uppercase font-mono">Garantie Livraison</p>
                <p className="font-semibold text-[#00f7a6]">Partout au Sénégal 🇸🇳</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Catalog Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="border-b border-[#033a30] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-display font-extrabold text-white">
              Catalogue de la Boutique ({shopProducts.length} articles)
            </h3>
            <p className="text-xs text-stone-400">
              Parcourez les produits de qualité certifiés proposés par {shop.name}.
            </p>
          </div>

          {/* Subcategories animal specific inside this shop */}
          <div className="flex flex-wrap gap-1.5">
            {animalSubCategories.map((subCat) => (
              <button
                key={subCat}
                onClick={() => setSelectedSubCategory(subCat)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedSubCategory === subCat
                    ? 'bg-[#00f2c3] text-[#001714] font-bold shadow-md'
                    : 'bg-[#001c18] text-stone-300 border border-[#033d32] hover:border-[#00f2c3]/30'
                }`}
              >
                {subCat === 'Tous' ? 'Tous les Élevages' : subCat}
              </button>
            ))}
          </div>
        </div>

        {filteredShopProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#012520] border border-[#034438] rounded-3xl p-8">
            <p className="text-stone-400 text-sm">Aucun produit ne correspond à l'espèce sélectionnée.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredShopProducts.map((product) => {
              return (
                <div 
                  key={product.id}
                  onClick={() => onOpenProductDetail(product)}
                  className="group bg-[#012d26]/40 backdrop-blur-sm border border-[#034438] hover:border-[#00f2c3]/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] cursor-pointer"
                >
                  <div className="relative">
                    <div className="aspect-video w-full overflow-hidden bg-[#001714] relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-mono text-[#00f2c3] font-bold uppercase tracking-wider">
                        {product.category}
                      </div>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <h4 className="font-semibold text-xs sm:text-sm text-stone-100 group-hover:text-[#00f2c3] transition-colors leading-snug line-clamp-2">
                        {product.name}
                      </h4>

                      <div className="flex flex-wrap gap-1">
                        {product.animalTypes.map((anim, idx) => (
                          <span key={idx} className="bg-[#001714] text-[9px] text-[#00f2c3] font-mono px-1.5 py-0.5 rounded border border-[#03352c]">
                            {anim}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1 border-t border-[#033d32]/35 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-stone-400">PRIX</span>
                      <span className="text-sm font-extrabold text-[#00f7a6]">
                        {product.price.toLocaleString()} F CFA
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={product.stock === 0}
                      className="p-2.5 rounded-xl bg-[#00f2c3] hover:bg-[#00d0ac] text-[#001714] shadow-md disabled:bg-stone-800 disabled:text-stone-500 transition-all cursor-pointer"
                    >
                      <Plus className="w-4.5 h-4.5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

    </div>
  );
};
