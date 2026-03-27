// GOLF CHARITY PLATFORM - UNIFIED TYPE DEFINITIONS

export type UserRole = 'subscriber' | 'admin' | 'public_visitor';

export interface User {
  id: string;
  email: string;
  full_name: string;
  name?: string; // Legacy support
  role: UserRole;
  avatar?: string;
  subscription_status?: SubscriptionStatus;
  joined_date?: string;
  created_at: string;
}

export type SubscriptionStatus = 'active' | 'cancelled' | 'lapsed' | 'pending' | 'inactive';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan: 'monthly' | 'yearly';
  status: SubscriptionStatus;
  current_period_end: string;
  charity_id: string | null;
  charity_percentage: number;
}

export interface Charity {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  logo?: string; // Legacy support
  images?: string[];
  website: string;
  is_featured: boolean;
  is_active?: boolean;
  events?: CharityEvent[];
  total_raised: number;
  supporter_count?: number;
}

export interface CharityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  link: string;
}

export interface Score {
  id: string;
  user_id: string;
  score: number;
  date_played: string;
  created_at: string;
}

export interface Draw {
  id: string;
  month: number | string;
  year?: number;
  logic_type?: 'random' | 'algorithmic';
  drawn_numbers?: number[];
  winning_numbers?: number[]; // Legacy support
  status: 'draft' | 'simulated' | 'published' | 'pending';
  jackpot_rollover_amount?: number;
  total_prize_pool?: number;
  total_subscribers?: number;
  created_at: string;
}

export interface DrawResult {
  id: string;
  draw_id: string;
  user_id: string;
  match_type?: '3' | '4' | '5';
  matched_numbers?: number[];
  prize_amount: number;
  verification_status: 'pending' | 'approved' | 'rejected';
  payout_status: 'pending' | 'paid';
  verification_image_url?: string;
  is_winner?: boolean;
}

export interface PrizePoolConfig {
  pool_percentage: number;
  tier_5_pct: number;
  tier_4_pct: number;
  tier_3_pct: number;
}

export interface Winner {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  draw_id: string;
  month: string;
  tier: number;
  prize_amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  proof_url?: string;
  admin_notes?: string;
  created_at: string;
}

export interface Donation {
  id: string;
  user_id?: string;
  charity_id: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  donor_name: string;
  donor_email: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

// Aliases for legacy support (with I prefix)
export type IUser = User;
export type ISubscription = Subscription;
export type ICharity = Charity;
export type ICharityEvent = CharityEvent;
export type IScore = Score;
export type IDraw = Draw;
export type IDrawResult = DrawResult;
export type IWinner = Winner;
export type IDonation = Donation;
