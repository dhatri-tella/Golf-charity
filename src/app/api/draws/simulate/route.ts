import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { drawId } = await req.json();

    // Get all user scores
    const { data: allScores } = await supabase
      .from('scores')
      .select('user_id, score')
      .order('date_played', { ascending: false });

    // Get draw numbers
    const { data: draw } = await supabase
      .from('draws')
      .select('*')
      .eq('id', drawId)
      .single();

    if (!draw || !allScores) {
      return NextResponse.json(
        { error: 'Draw or scores not found' },
        { status: 404 }
      );
    }

    const drawnNumbers = draw.drawn_numbers || [];
    const results: any[] = [];

    // Check each user's scores against draw numbers
    const uniqueUsers = [...new Set(allScores.map(s => s.user_id))];

    for (const userId of uniqueUsers) {
      const userScores = allScores
        .filter((s: any) => s.user_id === userId)
        .slice(0, 5)
        .map((s: any) => s.score);

      // Calculate matches
      const matches = userScores.filter(score => drawnNumbers.includes(score));
      const matchCount = matches.length;

      if (matchCount >= 3) {
        let prizeAmount = 0;
        let matchType: '3' | '4' | '5' = matchCount.toString() as '3' | '4' | '5';

        if (matchCount === 5) prizeAmount = 15750; // 40% of pool
        else if (matchCount === 4) prizeAmount = 13781.25; // 35% of pool
        else if (matchCount === 3) prizeAmount = 9843.75; // 25% of pool

        results.push({
          user_id: userId,
          match_type: matchType,
          prize_amount: prizeAmount,
          verification_status: 'pending',
          payout_status: 'pending',
        });
      }
    }

    // Insert results if any
    if (results.length > 0) {
      const resultsToInsert = results.map(r => ({
        ...r,
        draw_id: drawId,
      }));

      const { error: insertError } = await supabase
        .from('draw_results')
        .insert(resultsToInsert);

      if (insertError) {
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      resultsCount: results.length,
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
