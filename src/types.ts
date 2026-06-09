export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  image: string;
  price: number; // in USD (e.g. 30)
  stock: number;
  category: 'Aliment' | 'Médicament' | 'Équipement' | 'Autre';
  animalTypes: ('Bovins' | 'Volailles' | 'Porcins' | 'Ovins' | 'Caprins' | 'Équins' | 'Aquaculture' | 'Apiculture')[];
  composition?: string;
  dosage?: string;
  rating: number;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  logo: string; // url or abstract icon identifier
  banner: string; // url or gradient class
  rating: number;
  reviewsCount: number;
  location: string;
  contactPhone: string;
  whatsapp: string;
  email: string;
  hours: string;
  categories: string[];
  coordinates?: { lat: number; lng: number };
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  shopId: string;
  shopName: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  items: OrderItem[];
  total: number;
  status: 'En attente' | 'Confirmée' | 'Préparation' | 'Expédiée' | 'Livrée';
  paymentMethod: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Débutant' | 'Avancé';
  videoPoster: string;
  duration: string;
  isPremium: boolean;
  price: number; // in USD
  pdfUrl: string;
  quizQuestions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'vendeur';
  phone?: string;
  address?: string;
  avatar?: string;
  isLoggedIn: boolean;
}
