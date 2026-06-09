import React, { useState } from 'react';
import { Product, Shop } from '../types';
import { useApp } from '../context/AppContext';
import { X, ShoppingBag, Plus, Star, MapPin, Sparkles, MessageSquare, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { shops, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) return null;

  const shop = shops.find(s => s.id === product.vendorId);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-stone-200 bg-stone-50 text-stone-500 hover:text-[#4F7942] transition-all cursor-pointer"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          
          {/* Left Media Block */}
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-black/60 text-[10px] font-mono font-bold text-[#4F7942] uppercase">
                {product.category}
              </span>
            </div>

            {/* Shop Quickcard */}
            {shop && (
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-250 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-xl">
                    {shop.logo}
                  </span>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-stone-900 truncate">{shop.name}</p>
                    <div className="flex items-center space-x-1 text-[11px] text-stone-500">
                      <MapPin className="w-3 h-3 text-[#4F7942]" />
                      <span className="truncate">{shop.location}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/boutique/${shop.id}`}
                  onClick={onClose}
                  className="p-1 px-3 bg-stone-150 text-[#4F7942] text-[10px] uppercase font-bold rounded-lg hover:bg-[#4F7942] hover:text-white transition-all"
                >
                  Visiter
                </Link>
              </div>
            )}
          </div>

          {/* Right Product Characteristic Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-stone-900 leading-snug">
                  {product.name}
                </h3>
                
                <div className="flex flex-wrap gap-1">
                  {product.animalTypes.map((anim, idx) => (
                    <span key={idx} className="bg-stone-50 border border-stone-200 text-[9px] text-[#4F7942] px-2 py-0.5 rounded font-mono">
                      {anim}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-mono font-extrabold text-[#D2691E]">
                  {product.price.toLocaleString()} F CFA
                </span>
                <span className="text-[10px] text-sub text-stone-500 font-mono leading-none">
                  TC incl.
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Advanced info: Composition / Dosage */}
              {(product.composition || product.dosage) && (
                <div className="space-y-3 p-4 rounded-xl bg-stone-50 border border-stone-200 text-[11px]">
                  {product.composition && (
                    <div>
                      <span className="font-bold text-[#4F7942] uppercase tracking-wide block text-[9px]">🥕 Composition Technique :</span>
                      <p className="text-stone-600 leading-normal mt-0.5">{product.composition}</p>
                    </div>
                  )}
                  {product.dosage && (
                    <div className="pt-2 border-t border-stone-200">
                      <span className="font-bold text-[#4F7942] uppercase tracking-wide block text-[9px]">💊 Posologie & Conseils :</span>
                      <p className="text-stone-600 leading-normal mt-0.5">{product.dosage}</p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Add to cart panel */}
            <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4 mt-4">
              
              <div className="flex items-center space-x-1 bg-stone-50 border border-stone-200 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-stone-200 font-bold text-xs text-[#4F7942] flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-bold font-mono px-2 text-stone-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  className="w-8 h-8 rounded-lg bg-stone-200 font-bold text-xs text-[#4F7942] flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addedFeedback}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#4F7942] to-[#6B8E23] text-white font-extrabold text-xs uppercase tracking-wide shadow-lg hover:shadow-md disabled:from-stone-800 disabled:to-stone-800 disabled:text-stone-500 cursor-pointer flex items-center justify-center space-x-1.5 transition-all"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                    <span>Ajouté au panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Ajouter au panier</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
