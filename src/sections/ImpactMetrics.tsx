import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { impactMetrics, chartData } from '../data/mockData';

export default function ImpactMetrics() {
  return (
    <section id="impact" className="bg-[#03045E] py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-['Playfair_Display'] font-bold text-3xl sm:text-5xl text-white mb-4">
            The Real Cost of Leaks
          </h2>
          <p className="text-base text-white/70 max-w-xl mx-auto">
            Every liter lost is money, infrastructure, and future water down the drain.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-[#90E0EF] rounded-[20px] p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Animated number */}
              <div className="text-5xl font-extrabold text-[#03045E] mb-2">
                {metric.suffix === ' km' && <CountUp end={metric.numericValue} duration={2} />}
                {metric.suffix === '%' && <CountUp end={metric.numericValue} duration={2} />}
                {metric.suffix === 'M' && <CountUp end={metric.numericValue} duration={2} />}
                {metric.suffix === 'B' && <span>R</span>}
                {metric.suffix === 'B' && <CountUp end={metric.numericValue} duration={2} />}
                <span className="text-2xl">{metric.suffix === 'B' ? 'B' : metric.suffix}</span>
              </div>

              <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#03045E] mb-1">
                {metric.label}
              </h3>
              <p className="text-sm text-[#0077B6] mb-4">{metric.description}</p>

              {/* Trend pill */}
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                metric.trendUp
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              }`}>
                {metric.trend}
              </span>

              {/* Decorative circle */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#00B4D8]/10 group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-[#90E0EF] rounded-[20px] p-6 sm:p-8"
        >
          <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#03045E] mb-6">
            Leak Reports (Last 30 Days)
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(3,4,94,0.1)" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: '#03045E' }}
                  interval={4}
                />
                <YAxis tick={{ fontSize: 11, fill: '#03045E' }} />
                <Tooltip
                  contentStyle={{
                    background: '#03045E',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '13px',
                  }}
                  formatter={(value: number) => [`${value} reports`, 'Reports']}
                />
                <Area
                  type="monotone"
                  dataKey="reports"
                  stroke="#00B4D8"
                  strokeWidth={2}
                  fill="url(#colorReports)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
