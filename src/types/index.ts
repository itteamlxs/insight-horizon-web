
export interface User {
  id: string;
  email: string;
  role: 'admin';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
  createdAt: string;
  lastLogin?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'press_release' | 'announcement' | 'company_info';
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface CompanySettings {
  companyName: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
