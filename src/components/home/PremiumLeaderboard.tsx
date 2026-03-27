'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Zap } from 'lucide-react';

interface LeaderboardPlayer {
  rank: number;
  name: string;
  score: number;
  charity: string;
  donation: number;
}

export const PremiumLeaderboard: React.FC = () => {
  const players: LeaderboardPlayer[] = [
    { rank: 1, name: 'Alex Johnson', score: 68, charity: 'Ocean Foundation', donation: 2500 },
    { rank: 2, name: 'Sarah Williams', score: 70, charity: 'Youth Sports', donation: 2200 },
    { rank: 3, name: 'Michael Chen', score: 71, charity: 'Health Initiative', donation: 1950 },
    { rank: 4, name: 'Emma Davis', score: 72, charity: 'Education Fund', donation: 1850 },
    { rank: 5, name: 'James Smith', score: 73, charity: 'Wildlife Care', donation: 1650 },
  ];

  const getRankClass = (rank: number) => {
    if (rank === 1) return 'top-1';
    if (rank === 2) return 'top-2';
    if (rank === 3) return 'top-3';
    return '';
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-gray-900 mb-4">Championship Leaders</h2>
          <p className="text-xl text-gray-600">
            🏆 Top Performers Making the Greatest Impact
          </p>
        </motion.div>

        {/* Leaderboard Cards */}
        <motion.div className="space-y-4">
          {players.map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`leaderboard-rank ${getRankClass(player.rank)}`}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-16">
                <div className="flex items-center justify-center space-x-2">
                  {player.rank <= 3 && (
                    <span
                      className={`text-2xl font-black ${
                        player.rank === 1
                          ? 'text-gold-DEFAULT'
                          : player.rank === 2
                            ? 'text-gray-400'
                            : 'text-amber-700'
                      }`}
                    >
                      #
                    </span>
                  )}
                  <span className="text-3xl font-black text-gray-900">{player.rank}</span>
                </div>
              </div>

              {/* Player Info */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-DEFAULT" />
                      {player.charity}
                    </p>
                  </div>

                  {/* Score Display */}
                  <div className="golf-score-display flex-shrink-0 w-32">
                    <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Score</p>
                    <p className="score-number">{player.score}</p>
                  </div>

                  {/* Donation Badge */}
                  <div className="impact-badge w-40">
                    <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Donated</p>
                    <p className="text-2xl font-black text-green-pop">${player.donation.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Achievement Icons */}
              <div className="flex-shrink-0 flex gap-2">
                {player.rank === 1 && <Award className="w-6 h-6 text-gold-DEFAULT" />}
                {player.donation > 2000 && <Zap className="w-6 h-6 text-gold-DEFAULT" />}
                {player.rank <= 3 && <Target className="w-6 h-6 text-lavender-DEFAULT" />}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="stat-card-premium">
              <p className="text-sm text-gray-600 font-semibold mb-2">Total Raised</p>
              <p className="text-4xl font-black text-green-pop">$10,250</p>
            </div>
            <div className="stat-card-premium">
              <p className="text-sm text-gray-600 font-semibold mb-2">Tournaments This Season</p>
              <p className="text-4xl font-black text-lavender-DEFAULT">12</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Heart icon since we're using it in the component
const Heart = ({ className }: { className?: string }) => (
  <div className={`charity-heart ${className}`} />
);

export default PremiumLeaderboard;
