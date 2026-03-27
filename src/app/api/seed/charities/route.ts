'use server';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST() {
  try {
    const supabaseAdmin = createAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not available. Check SUPABASE_SERVICE_ROLE_KEY.' }, { status: 500 });
    }

    const charities = [
      {
        name: 'Greens for Good',
        description: 'Supporting youth golf education and sustainability projects worldwide.',
        logo_url: 'https://placeimg.com/64/64/nature',
        website: 'https://greenseed.org',
        is_featured: true,
        total_raised: 24850.0,
      },
      {
        name: 'TigerCare Foundation',
        description: 'Charity delivering sports therapy to underserved communities.',
        logo_url: 'https://placeimg.com/64/64/people',
        website: 'https://tigercare.org',
        is_featured: true,
        total_raised: 17200.0,
      },
      {
        name: 'Fairway Futures',
        description: 'Scholarships and coaching for promising junior golfers.',
        logo_url: 'https://placeimg.com/64/64/arch',
        website: 'https://fairwayfutures.org',
        is_featured: false,
        total_raised: 9800.0,
      },
    ];

    const { error } = await supabaseAdmin.from('charities').upsert(charities, {
      onConflict: 'name',
      ignoreDuplicates: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, inserted: charities.length });
  } catch (err) {
    console.error('Seed charities failed', err);
    return NextResponse.json({ error: 'Seed failed. ' + (err instanceof Error ? err.message : 'Unknown') }, { status: 500 });
  }
}
