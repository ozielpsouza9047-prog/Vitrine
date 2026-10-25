import { AdminUser, Client, Appointment, CashTransaction, SocketConnection, SocketLog } from '../types';

export const initialAdminUser: AdminUser = {
  id: 'usr-001',
  name: 'Oziel Souza',
  email: 'oziel.souza@admin.com',
  role: 'Administrador Master',
  avatarUrl: '/src/assets/images/avatar_admin_profile_1792968556981.jpg',
  status: 'online',
  phone: '(11) 98765-4321',
  department: 'Operações e Gestão Tecnológica',
  accessLevel: 'Nível 5 - Acesso Irrestrito',
  lastLogin: 'Hoje às 15:42'
};

export const mockClients: Client[] = [
  {
    id: 'cli-01',
    name: 'Carolina Mendes',
    email: 'carolina.mendes@email.com',
    phone: '(11) 99234-5678',
    city: 'São Paulo, SP',
    status: 'VIP',
    totalSpent: 4280.00,
    lastVisit: 'Hoje às 11:30',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'cli-02',
    name: 'Lucas Fontenele',
    email: 'lucas.fontenele@email.com',
    phone: '(21) 98456-1122',
    city: 'Rio de Janeiro, RJ',
    status: 'Ativo',
    totalSpent: 1950.50,
    lastVisit: 'Ontem',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'cli-03',
    name: 'Mariana Duarte',
    email: 'mariana.duarte@email.com',
    phone: '(31) 97123-9988',
    city: 'Belo Horizonte, MG',
    status: 'Ativo',
    totalSpent: 2890.00,
    lastVisit: '22 Out',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'cli-04',
    name: 'Rodrigo Alcantara',
    email: 'rodrigo.alcantara@email.com',
    phone: '(41) 99654-3321',
    city: 'Curitiba, PR',
    status: 'Pendente',
    totalSpent: 620.00,
    lastVisit: '18 Out',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'cli-05',
    name: 'Beatriz Silveira',
    email: 'beatriz.silveira@email.com',
    phone: '(51) 98877-6655',
    city: 'Porto Alegre, RS',
    status: 'VIP',
    totalSpent: 5120.00,
    lastVisit: '20 Out',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'cli-06',
    name: 'Gabriel Vasconcelos',
    email: 'gabriel.v@email.com',
    phone: '(19) 99122-4433',
    city: 'Campinas, SP',
    status: 'Inativo',
    totalSpent: 340.00,
    lastVisit: '10 Set',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-01',
    clientName: 'Carolina Mendes',
    service: 'Consultoria Especializada & Gestão',
    time: '09:00 - 10:00',
    date: 'Hoje',
    duration: '60 min',
    status: 'Concluído',
    price: 350.00,
    staff: 'Dra. Vanessa'
  },
  {
    id: 'apt-02',
    clientName: 'Lucas Fontenele',
    service: 'Auditoria e Avaliação Operacional',
    time: '11:15 - 12:30',
    date: 'Hoje',
    duration: '75 min',
    status: 'Concluído',
    price: 480.00,
    staff: 'Oziel Souza'
  },
  {
    id: 'apt-03',
    clientName: 'Mariana Duarte',
    service: 'Planejamento e Otimização de Processos',
    time: '14:00 - 15:00',
    date: 'Hoje',
    duration: '60 min',
    status: 'Confirmado',
    price: 420.00,
    staff: 'Felipe Rocha'
  },
  {
    id: 'apt-04',
    clientName: 'Rodrigo Alcantara',
    service: 'Sessão Técnica de Alinhamento de Rede',
    time: '15:30 - 16:30',
    date: 'Hoje',
    duration: '60 min',
    status: 'Em Espera',
    price: 300.00,
    staff: 'Oziel Souza'
  },
  {
    id: 'apt-05',
    clientName: 'Beatriz Silveira',
    service: 'Diagnóstico Estratégico Corporativo',
    time: '17:00 - 18:00',
    date: 'Hoje',
    duration: '60 min',
    status: 'Confirmado',
    price: 550.00,
    staff: 'Dra. Vanessa'
  }
];

export const mockTransactions: CashTransaction[] = [
  {
    id: 'tx-101',
    time: '15:12',
    description: 'Pagamento Serviço - Carolina Mendes',
    type: 'entrada',
    method: 'PIX',
    amount: 350.00,
    category: 'Serviços'
  },
  {
    id: 'tx-102',
    time: '14:40',
    description: 'Venda Plano Anual - Lucas Fontenele',
    type: 'entrada',
    method: 'Cartão Crédito',
    amount: 1480.00,
    category: 'Planos'
  },
  {
    id: 'tx-103',
    time: '13:05',
    description: 'Material de Suporte & Manutenção',
    type: 'saida',
    method: 'PIX',
    amount: 195.40,
    category: 'Operacional'
  },
  {
    id: 'tx-104',
    time: '11:20',
    description: 'Pagamento Consulta - Mariana Duarte',
    type: 'entrada',
    method: 'Cartão Débito',
    amount: 420.00,
    category: 'Serviços'
  },
  {
    id: 'tx-105',
    time: '10:05',
    description: 'Taxa de Licenciamento de Servidor',
    type: 'saida',
    method: 'PIX',
    amount: 450.00,
    category: 'Tecnologia'
  },
  {
    id: 'tx-106',
    time: '08:30',
    description: 'Abertura de Caixa / Fundo de Troco',
    type: 'entrada',
    method: 'Dinheiro',
    amount: 500.00,
    category: 'Caixa'
  }
];

export const mockSockets: SocketConnection[] = [
  {
    id: 'sck-01',
    name: 'Soquete Principal de Gateway (TCP/IP)',
    endpoint: 'wss://gateway.sys.internal',
    port: 8080,
    status: 'conectado',
    ping: 14,
    packetsSent: 142800,
    packetsReceived: 139940,
    uptime: '18h 42m',
    deviceType: 'Servidor Central'
  },
  {
    id: 'sck-02',
    name: 'Soquete do Terminal PDV Caixa',
    endpoint: 'tcp://pos-terminal-01.lan',
    port: 9002,
    status: 'conectado',
    ping: 8,
    packetsSent: 48920,
    packetsReceived: 48912,
    uptime: '07h 15m',
    deviceType: 'Hardware PDV'
  },
  {
    id: 'sck-03',
    name: 'Soquete de Impressão Fiscal & Comprovantes',
    endpoint: 'tcp://printer-thermal.lan',
    port: 9100,
    status: 'ocioso',
    ping: 22,
    packetsSent: 9420,
    packetsReceived: 9415,
    uptime: '09h 50m',
    deviceType: 'Periférico Serial/IP'
  },
  {
    id: 'sck-04',
    name: 'Soquete de Telemetria e Sensores IoT',
    endpoint: 'ws://iot-broker.lan',
    port: 1883,
    status: 'conectado',
    ping: 19,
    packetsSent: 820150,
    packetsReceived: 819990,
    uptime: '42h 10m',
    deviceType: 'Sensores de Ambiente'
  }
];

export const mockSocketLogs: SocketLog[] = [
  {
    id: 'log-1',
    timestamp: '15:44:02',
    level: 'success',
    message: 'Handshake WebSocket finalizado com sucesso no canal ws://gateway.sys.internal:8080',
    source: 'Gateway Principal'
  },
  {
    id: 'log-2',
    timestamp: '15:43:18',
    level: 'info',
    message: 'Heartbeat ping enviado para PDV Caixa (ACK 8ms)',
    source: 'Terminal PDV'
  },
  {
    id: 'log-3',
    timestamp: '15:41:50',
    level: 'info',
    message: 'Broadcast de evento de transação #TX-101 emitido para 4 ouvintes ativos',
    source: 'EventBus'
  },
  {
    id: 'log-4',
    timestamp: '15:39:12',
    level: 'warn',
    message: 'Reconexão rápida executada no canal de telemetria IoT (Buffer recuperado)',
    source: 'Broker IoT'
  },
  {
    id: 'log-5',
    timestamp: '15:35:00',
    level: 'success',
    message: 'Sincronização de soquete fiscal OK. 0 pacotes corrompidos.',
    source: 'Impressora Fiscal'
  }
];
