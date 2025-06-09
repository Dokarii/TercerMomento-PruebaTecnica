export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export interface Subscription {
  id?: number;
  userId: number;
  name: string;
  cost: number;
  category: string;
  renewalDate: string;
  status: 'active' | 'inactive' | 'cancelled';
  description?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}