-- ============================================
-- RAZORPAY MIGRATION
-- Add Razorpay fields to subscriptions table
-- ============================================

-- Add Razorpay payment columns to subscriptions
ALTER TABLE subscriptions
  ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT,
  ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
  ADD COLUMN IF NOT EXISTS amount_paid INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE;

-- Index for Razorpay order ID lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_razorpay_order_id ON subscriptions(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_razorpay_payment_id ON subscriptions(razorpay_payment_id);

-- Update the subscription_status enum to include 'failed'
-- NOTE: In Postgres you cannot add enum values inside a transaction block run in Supabase directly,
-- so we use the ALTER TYPE approach.
ALTER TYPE subscription_status ADD VALUE IF NOT EXISTS 'failed';
