import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { leakReports, type LeakReport } from '../data/mockData';

type FilterType = 'all' | 'critical' | 'repairing' | 'fixed';

const statusColor = (status: string) => {
  switch (status) {
    case 'active': return '#E63946';
    case 'repairing': return '#FF9F1C';
    case 'fixed': return '#2EC4B6';
    default: return '#00B4D8';
  }
};

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'critical', label: 'Critical' },
  { key: 'repairing', label: 'Under Repair' },
  { key: 'fixed', label: 'Fixed' },
];

export default function LiveMap() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedPin, setSelectedPin] = useState<LeakReport | null>(null);

  const filtered = activeFilter === 'all'
    ? leakReports
    : leakReports.filter(r => r.status === activeFilter);

  return (
    <section id="map" className="bg-[#F0F4F8] pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <h2 className="font-['Playfair_Display'] font-bold text-3xl sm:text-5xl text-[#03045E] mb-3">
            Live Leak Map
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Real-time reports from across the city. Click a pin to see details.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => { setActiveFilter(f.key); setSelectedPin(null); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === f.key
                    ? 'bg-[#90E0EF] text-[#03045E] shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-[#CAF0F8]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden"
          style={{ height: '500px' }}
        >
          {/* Map Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/map-bg.jpg)' }}
          />

          {/* Stats Overlay */}
          <div className="absolute top-4 left-4 z-20 bg-[#03045E]/90 backdrop-blur-sm rounded-xl p-4 text-white">
            <div className="text-xs text-white/70 mb-1">Reports Today</div>
            <div className="text-2xl font-extrabold text-[#00B4D8]">24</div>
            <div className="text-xs text-white/70 mt-2 mb-1">Critical</div>
            <div className="text-lg font-bold text-[#E63946]">7</div>
            <div className="text-xs text-white/70 mt-2 mb-1">Avg Resolution</div>
            <div className="text-lg font-bold text-[#2EC4B6]">3.2 days</div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <div className="text-xs font-semibold text-[#03045E] mb-2">Status</div>
            {[
              { color: '#E63946', label: 'Active' },
              { color: '#FF9F1C', label: 'Under Repair' },
              { color: '#2EC4B6', label: 'Fixed' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Pins */}
          <AnimatePresence>
            {filtered.map((report) => (
              <motion.button
                key={report.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-full group"
                style={{ left: `${report.lng}%`, top: `${report.lat}%` }}
                onClick={() => setSelectedPin(selectedPin?.id === report.id ? null : report)}
                aria-label={`Leak at ${report.location}`}
              >
                {/* Pin SVG */}
                <div className={`relative ${report.status === 'active' ? 'pin-pulse' : ''}`}>
                  <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                    <path
                      d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24C32 7.163 24.837 0 16 0z"
                      fill={statusColor(report.status)}
                    />
                    <circle cx="16" cy="15" r="6" fill="white" />
                  </svg>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#03045E] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {report.location}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>

          {/* Selected Pin Popup */}
          <AnimatePresence>
            {selectedPin && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute z-30 bg-white rounded-xl shadow-xl p-4 w-[260px]"
                style={{
                  left: `${Math.min(Math.max(selectedPin.lng, 20), 75)}%`,
                  top: `${Math.max(selectedPin.lat - 8, 5)}%`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: statusColor(selectedPin.status) }}
                  />
                  <span className="text-xs font-semibold text-gray-500 uppercase">{selectedPin.status}</span>
                </div>
                <h4 className="font-['Playfair_Display'] font-bold text-[#03045E] text-sm mb-1">
                  {selectedPin.location}
                </h4>
                <p className="text-xs text-gray-600 mb-2">{selectedPin.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedPin.severity === 'critical' ? 'bg-red-100 text-red-600' :
                    selectedPin.severity === 'medium' ? 'bg-orange-100 text-orange-600' :
                    'bg-cyan-100 text-cyan-600'
                  }`}>
                    {selectedPin.severity}
                  </span>
                  <span className="text-[10px] text-gray-400">{selectedPin.time}</span>
                </div>
                {/* Arrow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
