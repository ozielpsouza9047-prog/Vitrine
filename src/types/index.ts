export type NavigationTab = 
  | 'painel'
  | 'clientes'
  | 'agenda'
  | 'gestao'
  | 'caixa'
  | 'soquete'
  | 'financeiro'
  | 'perfil'
  | 'configuracao'
  | 'seguranca';

export type AppViewMode = 'dashboard' | 'home';

export type MarketplaceNavTab = 'inicio' | 'vitrines' | 'sacola' | 'cliente';

export type MasterMode = 'marketplace' | 'admin';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'busy';
  phone: string;
  department: string;
  accessLevel: string;
  lastLogin: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: 'Ativo' | 'Pendente' | 'VIP' | 'Inativo';
  totalSpent: number;
  lastVisit: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  date: string;
  duration: string;
  status: 'Confirmado' | 'Em Espera' | 'Concluído' | 'Cancelado';
  price: number;
  staff: string;
}

export interface CashTransaction {
  id: string;
  time: string;
  description: string;
  type: 'entrada' | 'saida';
  method: 'PIX' | 'Cartão Crédito' | 'Cartão Débito' | 'Dinheiro';
  amount: number;
  category: string;
}

export interface SocketConnection {
  id: string;
  name: string;
  endpoint: string;
  port: number;
  status: 'conectado' | 'ocioso' | 'desconectado';
  ping: number;
  packetsSent: number;
  packetsReceived: number;
  uptime: string;
  deviceType: string;
}

export interface SocketLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
  source: string;
}

// Multi-Brand Marketplace Types
export interface StoreProduct {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  badge?: string;
  rating: number;
}

export interface BrandStore {
  id: string;
  name: string;
  tagline: string;
  category: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  themeStyle: {
    bgBannerGlow: string;
    borderGlow: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    buttonHover: string;
    accentGlow: string;
  };
  banners: string[];
  rating: number;
  totalProducts: number;
  verified: boolean;
  city: string;
  products: StoreProduct[];
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
}

export interface CustomerOrder {
  id: string;
  date: string;
  storeName: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  paymentMethod: 'PIX';
  paymentStatus: 'Pago' | 'Pendente' | 'Processando';
  orderStatus: 'Entregue' | 'Em Trânsito' | 'Preparando Envio' | 'Aguardando Pagamento';
  pixCode?: string;
  deliveryAddress: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  avatarUrl: string;
  address: string;
  city: string;
  memberSince: string;
  loyaltyPoints: number;
}
