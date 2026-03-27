'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Heart, Target, Award, Zap, Flag } from 'lucide-react';

export const PremiumAchievements: React.FC = () => {
  const achievements = [
    {
      title: 'Hole-in-One Hero',
      description: 'Score a perfect eagle',
      icon: Trophy,
      color: 'gold',
      badge: '🏌️',
    },
    {
      title: 'Charity Champion',
      description: 'Donate $5,000+ in season',
      icon: Heart,
      color: 'rose',
      badge: '💚',
    },
    {
      title: 'Consistent Performer',
      description: 'Complete 10 tournaments',
      icon: Target,
      color: 'green-pop',
      badge: '🎯',
    },
    {
      title: 'Elite Member',
      description: 'Join Platinum tier',
      icon: Award,
      color: 'lavender',
      badge: '⭐',
    },
    {
      title: 'Power Player',
      description: 'Achieve 50+ points',
      icon: Zap,
      color: 'gold',
      badge: '⚡',
    },
    {
      title: 'Green Master',
      description: 'Master all course types',
      icon: Flag,
      color: 'green-pop',
      badge: '🌿',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-black text-gray-900 mb-4">Exclusive Achievements</h2>
          <p className="text-xl text-gray-600">
            Unlock premium badges through skill, consistency, and impact
          </p>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ translateY: -12 }}
              className="trophy-card"
            >
              <div className="space-y-4">
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className="flex justify-center"
                >
                  <div
                    className={`w-24 h-24 ${
                      achievement.color === 'gold'
                        ? 'bg-gradient-to-br from-gold-DEFAULT/30 to-gold-DEFAULT/10'
                        : achievement.color === 'rose'
                          ? 'bg-gradient-to-br from-rose-DEFAULT/30 to-rose-DEFAULT/10'
                          : achievement.color === 'green-pop'
                            ? 'bg-gradient-to-br from-green-pop/30 to-green-pop/10'
                            : 'bg-gradient-to-br from-lavender-DEFAULT/30 to-lavender-DEFAULT/10'
                    } rounded-2xl flex items-center justify-center text-4xl shadow-lg`}
                  >
                    {achievement.badge}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>

                {/* Unlock Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-900 font-bold rounded-lg transition-all"
                >
                  Unlock Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-12 border-t border-gray-200"
        >
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Total Achievements', value: '48' },
              { label: 'Players with 5+', value: '1.2K' },
              { label: 'Rarest Achievement', value: 'Perfect Round' },
              { label: 'Most Earned', value: 'Consistency' },
            ].map((stat, i) => (
              <motion.div key={i} className="stat-card-premium text-center">
                <p className="text-sm text-gray-600 font-semibold uppercase mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-green-pop">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card px-12 py-4 font-bold text-lg bg-gradient-to-r from-green-pop to-lavender-DEFAULT text-white"
          >
            View Full Achievement List
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumAchievements;
