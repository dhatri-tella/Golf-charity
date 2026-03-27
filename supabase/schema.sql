-- GOLF CHARITY PLATFORM - DATABASE SCHEMA
-- Created for premium golf charity tournament platform

-- ============================================
-- CHARITIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS charities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  images TEXT[] DEFAULT '{}',
  website TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  events JSONB DEFAULT '[]'::JSONB,
  total_raised DECIMAL(12, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'subscriber' CHECK (role IN ('subscriber', 'admin', 'public_visitor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- ============================================
-- SUBSCRIPTION STATUS ENUM
-- ============================================
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'lapsed', 'pending');

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT CHECK (plan IN ('monthly', 'yearly')),
  status subscription_status DEFAULT 'pending',
  current_period_end TIMESTAMP WITH TIME ZONE,
  charity_id UUID REFERENCES charities(id) ON DELETE SET NULL,
  charity_percentage INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- ============================================
-- SCORES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 45),
  date_played DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- ============================================
-- DRAW STATUS & LOGIC TYPE ENUMS
-- ============================================
CREATE TYPE draw_status AS ENUM ('draft', 'simulated', 'published');
CREATE TYPE logic_type AS ENUM ('random', 'algorithmic');

-- ============================================
-- DRAWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  logic_type logic_type DEFAULT 'random',
  drawn_numbers INTEGER[] DEFAULT '{}',
  status draw_status DEFAULT 'draft',
  jackpot_rollover_amount DECIMAL(12, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- ============================================
-- DRAW RESULTS ENUMS
-- ============================================
CREATE TYPE match_type AS ENUM ('3', '4', '5');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE payout_status AS ENUM ('pending', 'paid');

-- ============================================
-- DRAW RESULTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS draw_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_id UUID REFERENCES draws(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  match_type match_type NOT NULL,
  prize_amount DECIMAL(12, 2) NOT NULL,
  verification_status verification_status DEFAULT 'pending',
  payout_status payout_status DEFAULT 'pending',
  verification_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- ============================================
-- CHARITY CONTRIBUTION TYPE ENUM
-- ============================================
CREATE TYPE contribution_type AS ENUM ('subscription', 'independent');

-- ============================================
-- CHARITY CONTRIBUTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS charity_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  charity_id UUID REFERENCES charities(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  type contribution_type DEFAULT 'subscription',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- ============================================
-- PRIZE POOL CONFIGURATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS prize_pool_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_percentage INTEGER DEFAULT 60,
  tier_5_pct INTEGER DEFAULT 40,
  tier_4_pct INTEGER DEFAULT 35,
  tier_3_pct INTEGER DEFAULT 25,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- ============================================
-- ROW LEVEL SECURITY - ENABLE
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE draw_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE charity_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prize_pool_config ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Users can read own record
CREATE POLICY "Users can read own record" ON public.users 
  FOR SELECT USING (auth.uid() = id);

-- Users can read own scores
CREATE POLICY "Users can read own scores" ON scores 
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert own scores
CREATE POLICY "Users can insert own scores" ON scores 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read all charities
CREATE POLICY "Users can read all charities" ON charities 
  FOR SELECT USING (true);

-- Users can read own subscriptions
CREATE POLICY "Users can read own subscriptions" ON subscriptions 
  FOR SELECT USING (auth.uid() = user_id);

-- Everyone can read draws
CREATE POLICY "Everyone can read draws" ON draws 
  FOR SELECT USING (true);

-- Everyone can read draw results
CREATE POLICY "Everyone can read draw results" ON draw_results 
  FOR SELECT USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_charity_id ON subscriptions(charity_id);
CREATE INDEX IF NOT EXISTS idx_scores_user_id ON scores(user_id);
CREATE INDEX IF NOT EXISTS idx_scores_date_played ON scores(date_played);
CREATE INDEX IF NOT EXISTS idx_draw_results_draw_id ON draw_results(draw_id);
CREATE INDEX IF NOT EXISTS idx_draw_results_user_id ON draw_results(user_id);
CREATE INDEX IF NOT EXISTS idx_charity_contributions_user_id ON charity_contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_charity_contributions_charity_id ON charity_contributions(charity_id);

-- ============================================
-- SEED SAMPLE CHARITIES
-- ============================================
INSERT INTO charities (name, description, logo_url, website, is_featured, total_raised)
VALUES
  ('Greens for Good', 'Supporting youth golf education and sustainability projects worldwide.', 'https://example.com/logos/greens-for-good.png', 'https://greenseed.org', TRUE, 24850.00),
  ('TigerCare Foundation', 'Charity delivering sports therapy to underserved communities.', 'https://example.com/logos/tigercare.png', 'https://tigercare.org', TRUE, 17200.00),
  ('Fairway Futures', 'Scholarships and coaching for promising junior golfers.', 'https://example.com/logos/fairway-futures.png', 'https://fairwayfutures.org', FALSE, 9800.00)
ON CONFLICT (name) DO NOTHING;
