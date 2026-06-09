import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shop, Product, Course, Order, CartItem, User } from '../types';
import { INITIAL_SHOPS, INITIAL_PRODUCTS, INITIAL_COURSES } from '../mockData';

interface AppContextType {
  shops: Shop[];
  products: Product[];
  courses: Course[];
  orders: Order[];
  cart: CartItem[];
  currentUser: User | null;
  activeRole: 'client' | 'vendeur';
  
  // Auth actions
  login: (email: string, name: string, role: 'client' | 'vendeur', phone?: string, address?: string) => void;
  logout: () => void;
  switchRole: (role: 'client' | 'vendeur') => void;
  updateUserPreferences: (phone: string, address: string) => void;
  
  // Cart actions
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Vendor actions
  addOrUpdateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateShopProfile: (shop: Shop) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Order actions
  placeOrder: (clientName: string, clientPhone: string, clientAddress: string, paymentMethod: string) => Order[];
  
  // Stats & wallets
  walletBalance: number;
  withdrawToMobileMoney: (amount: number, provider: string, phoneNumber: string) => boolean;
  withdrawals: { id: string; amount: number; provider: string; phone: string; status: string; date: string }[];
  
  // Certifications
  unlockedCourses: string[]; // list of course IDs purchased or unlocked
  passedQuizzes: string[]; // list of course IDs where quiz was passed
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shops, setShops] = useState<Shop[]>(() => {
    const saved = localStorage.getItem('agri_shops');
    return saved ? JSON.parse(saved) : INITIAL_SHOPS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('agri_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [courses] = useState<Course[]>(INITIAL_COURSES);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('agri_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('agri_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('agri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeRole, setActiveRole] = useState<'client' | 'vendeur'>(() => {
    const saved = localStorage.getItem('agri_role');
    return saved ? (saved as 'client' | 'vendeur') : 'client';
  });

  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('agri_wallet_balance');
    return saved ? Number(saved) : 185000; // initial vendor payout wallet
  });

  const [withdrawals, setWithdrawals] = useState<any[]>(() => {
    const saved = localStorage.getItem('agri_withdrawals');
    return saved ? JSON.parse(saved) : [];
  });

  const [unlockedCourses, setUnlockedCourses] = useState<string[]>(() => {
    const saved = localStorage.getItem('agri_unlocked_courses');
    return saved ? JSON.parse(saved) : ['c1', 'c3']; // c1 and c3 are free, c2 is premium
  });

  const [passedQuizzes, setPassedQuizzes] = useState<string[]>(() => {
    const saved = localStorage.getItem('agri_passed_quizzes');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('agri_shops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem('agri_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('agri_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('agri_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('agri_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('agri_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('agri_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('agri_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('agri_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('agri_unlocked_courses', JSON.stringify(unlockedCourses));
  }, [unlockedCourses]);

  useEffect(() => {
    localStorage.setItem('agri_passed_quizzes', JSON.stringify(passedQuizzes));
  }, [passedQuizzes]);

  // Auth Action Methods
  const login = (email: string, name: string, role: 'client' | 'vendeur', phone?: string, address?: string) => {
    const newUser: User = {
      id: role === 'vendeur' ? 'vendor_sahel' : 'client_' + Date.now().toString(), // map to default vendor for simplicity in presentation
      email,
      name,
      role,
      phone: phone || '+221 77 444 88 99',
      address: address || 'Dakar Plateau, Sénégal',
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      isLoggedIn: true
    };
    setCurrentUser(newUser);
    setActiveRole(role);
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
  };

  const switchRole = (role: 'client' | 'vendeur') => {
    setActiveRole(role);
  };

  const updateUserPreferences = (phone: string, address: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        phone,
        address
      });
    }
  };

  // Cart actions
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex].quantity = Math.min(newQty, product.stock);
        return updated;
      }
      return [...prevCart, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: Math.min(quantity, item.product.stock) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Vendor actions
  const addOrUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => {
      const exists = prevProducts.some(p => p.id === updatedProduct.id);
      if (exists) {
        return prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      } else {
        return [updatedProduct, ...prevProducts];
      }
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const updateShopProfile = (updatedShop: Shop) => {
    setShops(prevShops => prevShops.map(s => s.id === updatedShop.id ? updatedShop : s));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          // If status goes to 'Livrée', adding to vendor balance (simulating real platform commissions)
          if (status === 'Livrée' && order.status !== 'Livrée') {
            const earn = order.total * 0.90; // platform takes 10% commission, vendor gets 90%
            setWalletBalance(prev => prev + earn);
          }
          return { ...order, status };
        }
        return order;
      });
    });
  };

  // Order placement
  const placeOrder = (clientName: string, clientPhone: string, clientAddress: string, paymentMethod: string): Order[] => {
    // Because it is a multi-vendor marketplace, we split the cart items by vendorId
    // so each vendor gets their own specific order record to manage.
    const itemsByVendor: { [vendorId: string]: CartItem[] } = {};
    cart.forEach(item => {
      const vId = item.product.vendorId;
      if (!itemsByVendor[vId]) {
        itemsByVendor[vId] = [];
      }
      itemsByVendor[vId].push(item);
    });

    const createdOrders: Order[] = [];
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    Object.entries(itemsByVendor).forEach(([vendorId, cartItems]) => {
      const shop = shops.find(s => s.id === vendorId);
      const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      
      const newOrder: Order = {
        id: 'CMD-' + Math.floor(100000 + Math.random() * 900000).toString(),
        date: dateStr,
        shopId: vendorId,
        shopName: shop ? shop.name : 'Boutique Agri',
        clientName,
        clientPhone,
        clientAddress,
        paymentMethod,
        items: cartItems.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        total,
        status: 'En attente'
      };

      createdOrders.push(newOrder);

      // Decrement catalog stock
      setProducts(prevProducts => {
        return prevProducts.map(p => {
          const cartMatch = cartItems.find(item => item.product.id === p.id);
          if (cartMatch) {
            return {
              ...p,
              stock: Math.max(0, p.stock - cartMatch.quantity)
            };
          }
          return p;
        });
      });
    });

    setOrders(prev => [...createdOrders, ...prev]);
    clearCart();
    return createdOrders;
  };

  const withdrawToMobileMoney = (amount: number, provider: string, phoneNumber: string): boolean => {
    if (amount > walletBalance) return false;
    
    setWalletBalance(prev => prev - amount);
    const newWithdrawal = {
      id: 'WTH-' + Math.floor(1000 + Math.random() * 9000).toString(),
      amount,
      provider,
      phone: phoneNumber,
      status: 'Réussi (Instantané)',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setWithdrawals(prev => [newWithdrawal, ...prev]);
    return true;
  };

  return (
    <AppContext.Provider value={{
      shops,
      products,
      courses,
      orders,
      cart,
      currentUser,
      activeRole,
      login,
      logout,
      switchRole,
      updateUserPreferences,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      addOrUpdateProduct,
      deleteProduct,
      updateShopProfile,
      updateOrderStatus,
      placeOrder,
      walletBalance,
      withdrawToMobileMoney,
      withdrawals,
      unlockedCourses,
      passedQuizzes,
      // unlocked premium validator
      setUnlockedCourses: (val: any) => {
        setUnlockedCourses(val);
      },
      setPassedQuizzes: (val: any) => {
        setPassedQuizzes(val);
      }
    } as any}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
