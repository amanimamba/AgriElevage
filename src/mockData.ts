import { Shop, Product, Course } from './types';

export const INITIAL_SHOPS: Shop[] = [
  {
    id: 'vendor_sahel',
    name: 'Ferme du Sahel',
    description: 'Spécialiste de l\'alimentation bovine, ovine et de la vente de géniteurs sélectionnés de haute qualité au Sénégal.',
    logo: '🐂',
    banner: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 142,
    location: 'Km 12, Route de Rufisque, Dakar, Sénégal',
    contactPhone: '+221 77 555 12 34',
    whatsapp: '221775551234',
    email: 'contact@fermedusahel.sn',
    hours: 'Lun - Sam: 08:00 - 18:30',
    categories: ['Aliment', 'Équipement']
  },
  {
    id: 'vendor_vetoplus',
    name: 'VetoPlus Sénégal',
    description: 'Votre partenaire santé pour tous vos élevages. Médicaments vétérinaires agréés, conseils, vaccins et compléments minéraux.',
    logo: '💊',
    banner: 'https://images.unsplash.com/photo-1584036561566-baf245f8e6c3?w=1200&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewsCount: 98,
    location: 'Avenue Bourguiba, Face Station Total, Dakar',
    contactPhone: '+221 33 824 45 90',
    whatsapp: '221763445566',
    email: 'info@vetoplus.sn',
    hours: 'Lun - Ven: 08:30 - 19:00, Sam: 09:00 - 14:00',
    categories: ['Médicament']
  },
  {
    id: 'vendor_provendier',
    name: 'Provendier Express',
    description: 'Boutique axée sur la nutrition animale industrielle et l\'aviculture moderne. Premier constructeur d\'abreuvoirs et mangeoires.',
    logo: '🐔',
    banner: 'https://images.unsplash.com/photo-1548676924-48e71ceac154?w=1200&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewsCount: 64,
    location: 'Zone Industrielle de Mbao, Dakar',
    contactPhone: '+221 78 120 44 55',
    whatsapp: '221781204455',
    email: 'sales@provendierexpress.sn',
    hours: 'Tous les jours: 08:00 - 18:00',
    categories: ['Aliment', 'Équipement', 'Autre']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Ferme du Sahel
  {
    id: 'p1',
    vendorId: 'vendor_sahel',
    name: 'Tourteau de Coton Premium - 50kg',
    description: 'Hautement riche en protéines (plus de 40%), idéal pour le engraissement rapide (embouche bovine) des taurillons et béliers pour le Tabaski.',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&auto=format&fit=crop&q=60',
    price: 29,
    stock: 85,
    category: 'Aliment',
    animalTypes: ['Bovins', 'Ovins', 'Caprins'],
    composition: 'Protéines brutes: 41%, Cellulose: 12%, Matières grasses: 1.5%. Issu du pressage de graines de coton locales.',
    dosage: 'Distribuer 1.5kg à 3kg par jour et par bovin adulte en complément de paille de brousse.',
    rating: 4.9
  },
  {
    id: 'p2',
    vendorId: 'vendor_sahel',
    name: 'Pierre à lécher enrichie (Sels & Oligos) - 5kg',
    description: 'Bloc de sel minéral à lécher pour bovins et grands ruminants. Empêche les carences en iode, zinc et sélénium durant la saison sèche.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format&fit=crop&q=60',
    price: 7,
    stock: 120,
    category: 'Équipement',
    animalTypes: ['Bovins', 'Ovins', 'Caprins', 'Équins'],
    composition: 'Sodium: 37%, Magnésium: 2.5%, Zinc: 1200mg/kg, Iode, Cobalt, Cuivre.',
    dosage: 'Laisser à libre disposition des animaux à proximité immédiate d\'un point d\'eau propre.',
    rating: 4.7
  },
  {
    id: 'p3',
    vendorId: 'vendor_sahel',
    name: 'Mélange Foin de Luzerne Sélectionné - Ballot de 15kg',
    description: 'Luzerne de grande qualité, séchée au soleil avec soin pour garantir des valeurs nutritionnelles exceptionnelles pour les vaches laitières.',
    image: 'https://images.unsplash.com/photo-1535090486071-42345260c57c?w=500&auto=format&fit=crop&q=60',
    price: 15,
    stock: 40,
    category: 'Aliment',
    animalTypes: ['Bovins', 'Ovins', 'Caprins', 'Équins'],
    composition: 'Luzerne séchée pure à 100% sans aucun additif chimique.',
    dosage: 'Un demi-ballot par vache laitière et par jour pour optimiser la traite du matin.',
    rating: 4.8
  },

  // VetoPlus
  {
    id: 'p4',
    vendorId: 'vendor_vetoplus',
    name: 'Multivitamines Élevage Orale - 1 Litre',
    description: 'Solution buvable riche en vitamines A, D3, E et Acides Aminés essentiels. Stimule la croissance des poussins et lutte contre le stress de la chaleur.',
    image: 'https://images.unsplash.com/photo-1584036561566-baf245f8e6c3?w=500&auto=format&fit=crop&q=60',
    price: 12,
    stock: 200,
    category: 'Médicament',
    animalTypes: ['Volailles', 'Bovins', 'Ovins', 'Porcins'],
    composition: 'Vitamine A: 10 000 000 UI, Vitamine D3, Vitamine E: 20g, Acides aminés complexes.',
    dosage: 'Diluer 1ml par litre d\'eau de boisson pendant 5 à 7 jours consécutifs.',
    rating: 4.6
  },
  {
    id: 'p5',
    vendorId: 'vendor_vetoplus',
    name: 'Vaccin Aviaire Maladie de Newcastle - 1000 Doses',
    description: 'Vaccin atténué par lyophilisation pour la prévention immunitaire de la pseudo-peste aviaire (Newcastle) chez les poulets et dindes.',
    image: 'https://images.unsplash.com/photo-1584036561566-baf245f8e6c3?w=500&auto=format&fit=crop&q=60',
    price: 17,
    stock: 50,
    category: 'Médicament',
    animalTypes: ['Volailles'],
    composition: 'Virus de la maladie de Newcastle (souche Lasota) atténué actif.',
    dosage: 'Administration oculaire par goutte ou par eau de boisson suivant le calendrier vaccinal standard (consulter un vétérinaire).',
    rating: 4.8
  },
  {
    id: 'p6',
    vendorId: 'vendor_vetoplus',
    name: 'Anti-parasitaire interne Boviverm Forte - 100 Bolus',
    description: 'Comprimés de large spectre pour lutter efficacement contre les nématodes gastro-intestinaux et pulmonaires chez les bovins et ovins.',
    image: 'https://images.unsplash.com/photo-1584036561566-baf245f8e6c3?w=500&auto=format&fit=crop&q=60',
    price: 32,
    stock: 65,
    category: 'Médicament',
    animalTypes: ['Bovins', 'Ovins', 'Caprins'],
    composition: 'Chaque bolus contient 300mg d\'Albendazole pur.',
    dosage: '1 bolus par tranche de 100kg de poids corporel de l\'animal, par voie orale.',
    rating: 4.3
  },

  // Provendier Express
  {
    id: 'p7',
    vendorId: 'vendor_provendier',
    name: 'Provende Démarrage Poulet de Chair G1 - 50kg',
    description: 'Aliment complet pour poussins de 1 à 15 jours. Haute teneur en énergie digestologique pour sécuriser les premiers jours critiques.',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&auto=format&fit=crop&q=60',
    price: 37,
    stock: 15, // Low stock on purpose to trigger alerts!
    category: 'Aliment',
    animalTypes: ['Volailles'],
    composition: 'Maïs concassé, Soja extrudé, Farine de poisson, Phosphate bicalcique, Prémix oligo-vitaminé.',
    dosage: 'Distribuer à volonté (environ 25g par jour par poussin au début) de façon continue.',
    rating: 4.5
  },
  {
    id: 'p8',
    vendorId: 'vendor_provendier',
    name: 'Abreuvoir Siphon Automatique 10L - Volailles',
    description: 'Abreuvoir robuste en plastique polypropylène haute densité traité anti-UV pour l\'élevage avicole au sol. Remplissage direct par le haut.',
    image: 'https://images.unsplash.com/photo-1548676924-48e71ceac154?w=500&auto=format&fit=crop&q=60',
    price: 13,
    stock: 45,
    category: 'Équipement',
    animalTypes: ['Volailles'],
    composition: 'Plastique PP vierge, raccordements laiton étanches.',
    dosage: '1 abreuvoir de 10L convient pour 100 poulets adultes.',
    rating: 4.7
  },
  {
    id: 'p9',
    vendorId: 'vendor_provendier',
    name: 'Mangeoire Trémie Professionnelle - 15kg',
    description: 'Mangeoire circulaire de grande capacité à suspendre pour limiter le gaspillage des aliments par grattage de la part des poules pondeuses.',
    image: 'https://images.unsplash.com/photo-1548676924-48e71ceac154?w=500&auto=format&fit=crop&q=60',
    price: 24,
    stock: 22,
    category: 'Équipement',
    animalTypes: ['Volailles'],
    composition: 'Tôle d\'acier galvanisé ultra-renforcé anti-corrosion.',
    dosage: 'Suspendre à la hauteur du dos des volailles pour minimiser les pertes de nourriture.',
    rating: 4.6
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Engraissement de Tabaski : L\'embouche Ovine pas-à-pas',
    description: 'Maîtrisez les techniques intensives d\'embouche de moutons de race Ladoum ou Peul-peul pour maximiser vos bénéfices lors de la fête de la Tabaski.',
    category: 'Ovins',
    level: 'Débutant',
    videoPoster: 'https://images.unsplash.com/photo-1484557985045-def2560fbd6d?w=800&auto=format&fit=crop&q=80',
    duration: '2h 15m (7 modules)',
    isPremium: false,
    price: 0,
    pdfUrl: 'Guide_Pratique_Embouche_Ovine_Sahel.pdf',
    quizQuestions: [
      {
        id: 1,
        question: 'Quel est l\'âge idéal pour acquérir un mouton destiné à l\'embouche de Tabaski (6 mois de cycle) ?',
        options: ['2 à 3 mois', '12 à 18 mois', '3 ans et plus', 'Les nouveau-nés'],
        correctAnswerIndex: 1
      },
      {
        id: 2,
        question: 'Quelle est la teneur minimale recommandée en protéines pour un aliment d\'engraissement de qualité ?',
        options: ['5%', '10%', '15% à 18%', '35% minimun'],
        correctAnswerIndex: 2
      },
      {
        id: 3,
        question: 'Quel traitement médical primordial doit être administré obligatoirement dès l\'entrée du mouton en bergerie ?',
        options: ['Une coupe de sabots seule', 'Le déparasitage interne/externe et vaccination contre la peste', 'Un bain d\'eau froide', 'Aucun traitement'],
        correctAnswerIndex: 1
      },
      {
        id: 4,
        question: 'Pourquoi l\'ajout d\'une pierre à lécher est-elle importante pour l\'ovins à l\'engrais ?',
        options: ['Pour réduire la soif', 'Pour apporter des minéraux indispensables empêchant les intoxications', 'Pour occuper l\'animal', 'Pour embellir la laine'],
        correctAnswerIndex: 1
      },
      {
        id: 5,
        question: 'En moyenne, quelle est la durée idéale d\'une phase d\'embouche intensive de Tabaski ?',
        options: ['15 jours', '90 à 120 jours', '2 ans', '300 jours'],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'c2',
    title: 'Aviculture Moderne : Réussir son Élevage de Poulets de Chair',
    description: 'Une formation complète pour rentabiliser rapidement un cheptel de poulets de chair au Sénégal. Gestion thermique, alimentation équilibrée et prophylaxie.',
    category: 'Volailles',
    level: 'Débutant',
    videoPoster: 'https://images.unsplash.com/photo-1548676924-48e71ceac154?w=800&auto=format&fit=crop&q=80',
    duration: '3h 40m (10 modules)',
    isPremium: true,
    price: 30,
    pdfUrl: 'Manuel_Complet_Aviculture_Dakar.pdf',
    quizQuestions: [
      {
        id: 1,
        question: 'Quelle doit être la température au sol idéale sous le radiant lors du premier jour de chauffage des poussins ?',
        options: ['20-22 °C', '25-28 °C', '32-35 °C', '40-45 °C'],
        correctAnswerIndex: 2
      },
      {
        id: 2,
        question: 'Quelle pathologie majeure prévient-on principalement avec le vaccin de Newcastle ?',
        options: ['La grippe simple', 'La pseudo-peste aviaire', 'La gale des pattes', 'La carence en fer'],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: 'La densité de poulets de chair adultes recommandée au Sahel dans un poulailler standard est de :',
        options: ['50 sujets par m²', '25-30 sujets par m²', '8-10 sujets par m²', '2 sujets par m²'],
        correctAnswerIndex: 2
      },
      {
        id: 4,
        question: 'Après quel âge le poussin passe-t-il généralement de l\'aliment démarrage à l\'aliment croissance ?',
        options: ['3 jours', '15 à 18 jours', '45 jours', '90 jours'],
        correctAnswerIndex: 1
      },
      {
        id: 5,
        question: 'Combien de jours dure en général un cycle d\'élevage de poulet de chair standard avant commercialisation ?',
        options: ['15 à 20 jours', '35 à 45 jours', '120 jours', '1 an'],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'c3',
    title: 'Gestion Sanitaire Bovine et Traite Laitière',
    description: 'Apprenez à diagnostiquer les maladies bovines les plus fréquentes (dermatose nodulaire, pasteurellose) et optimisez la traite laitière de vos vaches.',
    category: 'Bovins',
    level: 'Avancé',
    videoPoster: 'https://images.unsplash.com/photo-1543160495-2c83c74e1d53?w=800&auto=format&fit=crop&q=80',
    duration: '1h 50m (5 modules)',
    isPremium: false,
    price: 0,
    pdfUrl: 'Sante_Bovine_Laitiere_Afrique_Ouest.pdf',
    quizQuestions: [
      {
        id: 1,
        question: 'Quelle est la principale cause de la mammite chez la vache laitière ?',
        options: ['Infection bactérienne due à un manque d\'hygiène lors de la traite', 'Un foin trop sec', 'Une marche prolongée sous le soleil', 'Une carence en vitamine C'],
        correctAnswerIndex: 0
      },
      {
        id: 2,
        question: 'La dermatose nodulaire contagieuse bovine se manifeste principalement par :',
        options: ['Une perte de cornes', 'Des nodules cutanés sur tout le corps et de la fièvre', 'Un pelage devenant blanc', 'Une cécité subite'],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: 'Quel est l\'atout nutritionnel majeur du gâteau/tourteau de coton pour la vache laitière ?',
        options: ['Teneur élevée en énergie brute azotée', 'Teneur très élevée en protéines de haute digestibilité stimulant le lait', 'C\'est un colorant pour le beurre', 'Il dispense d\'apporter de l\'eau'],
        correctAnswerIndex: 1
      },
      {
        id: 4,
        question: 'Avant la traite d\'un quartier, quel geste essentiel assure la propreté du lait ?',
        options: ['Laver abondamment à l\'eau froide', 'Nettoyer avec un chiffon propre et désinfecter le trayon puis jeter les premiers jets', 'Utiliser du parfum', 'Rasurer le pis de la vache'],
        correctAnswerIndex: 1
      },
      {
        id: 5,
        question: 'À quelle fréquence doit être administré l\'anti-parasitaire interne aux vaches d\'un troupeau pastoral au Sénégal ?',
        options: ['Une fois tous les 5 ans', 'Au moins 2 fois par an (début et fin d\'hivernage)', 'Chaque semaine', 'Seulement quand l\'animal perd connaissance'],
        correctAnswerIndex: 1
      }
    ]
  }
];
