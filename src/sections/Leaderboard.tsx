import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { leaderboard } from '../data/mockData';

type TabType = 'week' | 'alltime';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<TabType>('week');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
    if (rank === 2) return <Star className="w-5 h-5 text-gray-400 fill-gray-400" />;
    if (rank === 3) return <Star className="w-5 h-5 text-orange-500 fill-orange-500" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-400">{rank}</span>;
  };

  return (
    <section className="bg-[#F0F4F8] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="font-['Playfair_Display'] font-bold text-3xl sm:text-5xl text-[#03045E] mb-4">
            Community Heroes
          </h2>
          <p className="text-base text-gray-600">
            The neighbors keeping Johannesburg's water where it belongs.
          </p>
        </motion.div>

        {/* Leaderboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-[640px] mx-auto"
        >
          <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Tabs */}
            <div className="flex p-4 gap-2 border-b border-gray-100">
              {[{ key: 'week' as TabType, label: 'This Week' }, { key: 'alltime' as TabType, label: 'All Time' }].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-[#90E0EF] text-[#03045E]'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="divide-y divide-gray-50">
              {leaderboard.map((entry, i) => (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    entry.rank === 1 ? 'bg-[#CAF0F8]/40 border-l-[3px] border-l-[#00B4D8]' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="w-8 flex-shrink-0 flex justify-center">
                    {getRankIcon(entry.rank)}
                  </div>

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${entry.gradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xs font-bold text-white">{entry.initials}</span>
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-[#03045E] truncate block">{entry.name}</span>
                  </div>

                  {/* Reports badge */}
                  <span className="bg-[#00B4D8] text-white text-xs font-bold px-3 py-1 rounded-full flex-shrink-0">
                    {entry.reports} reports
                  </span>

                  {/* Points */}
                  <span className="text-sm font-bold text-[#03045E] flex-shrink-0 w-16 text-right">
                    {entry.points.toLocaleString()} pts
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="p-4 text-center border-t border-gray-100">
              <a
                href="#report"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#report')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B4D8] hover:underline transition-all"
              >
                Join the leaderboard
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
