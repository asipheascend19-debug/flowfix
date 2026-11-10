import { motion } from 'framer-motion';
import CountUp from 'react-countup';
const floatingReports = [
  { location: 'Jan Smuts Ave', time: '2 min ago', severity: 'Critical' },
  { location: 'Louis Botha Ave', time: '5 min ago', severity: 'Major burst' },
  { location: 'Main Rd Bryanston', time: '12 min ago', severity: 'Leak' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const leftItemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const rightItemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' as const, delay: 0.3 } },
};

export default function Hero() {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen gradient-shift overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative max-w-[1200px] mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 w-full items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={leftItemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-[#CAF0F8] text-[#03045E] text-xs font-semibold px-4 py-2 rounded-full">
                🚰 Johannesburg Water Crisis
              </span>
            </motion.div>

            <motion.h1
              variants={leftItemVariants}
              className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl lg:text-[64px] leading-tight text-white mb-6"
            >
              Every Drop Counts.<br />
              <span className="text-[#00B4D8]">Report. Track. Fix.</span>
            </motion.h1>

            <motion.p
              variants={leftItemVariants}
              className="text-lg text-white/80 max-w-[480px] mb-8 leading-relaxed"
            >
              Johannesburg loses 40% of its treated water to leaks before it reaches homes. See it, report it, stop the waste — in real time.
            </motion.p>

            <motion.div variants={leftItemVariants} className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => handleScroll('#report')}
                className="bg-[#00B4D8] text-[#03045E] px-8 py-4 rounded-full text-base font-bold hover:scale-105 hover:shadow-[0_0_24px_rgba(0,180,216,0.4)] transition-all duration-300"
              >
                Report a Leak
              </button>
              <button
                onClick={() => handleScroll('#map')}
                className="border border-white/80 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white hover:text-[#03045E] transition-all duration-300"
              >
                View Live Map
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={leftItemVariants} className="flex items-center gap-6 sm:gap-8">
              {[
                { value: 40, suffix: '%', label: 'NRW', sub: 'Non-revenue water' },
                { value: 428, suffix: ' km', label: '', sub: 'Pipes to replace' },
                { value: 7, suffix: 'B', label: 'R', sub: 'Annual losses' },
              ].map((stat, i) => (
                <div key={i} className={`${i > 0 ? 'border-l border-white/20 pl-6 sm:pl-8' : ''}`}>
                  <div className="font-['Playfair_Display'] font-bold text-2xl text-[#00B4D8]">
                    {stat.label && <span>{stat.label}</span>}
                    <CountUp end={stat.value} duration={2} delay={1} />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-white/60 mt-1">{stat.sub}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Water Drop Visual */}
          <motion.div
            variants={rightItemVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Water Drop */}
            <div className="relative w-[320px] h-[380px]">
              {/* Drop shape */}
              <div
                className="absolute inset-0 water-drop-shimmer"
                style={{
                  background: 'linear-gradient(135deg, #00B4D8 0%, #90E0EF 100%)',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  boxShadow: '0 0 60px rgba(0,180,216,0.3), 0 20px 40px rgba(0,0,0,0.2)',
                  transform: 'rotate(0deg)',
                  clipPath: 'ellipse(50% 55% at 50% 55%)',
                }}
              >
                {/* Counter inside drop */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#03045E]">
                  <div className="text-4xl font-extrabold">
                    <CountUp end={1247} duration={5} delay={2} separator="," />
                  </div>
                  <div className="text-sm font-medium mt-1">liters saved today</div>
                </div>
              </div>

              {/* Floating Report Cards */}
              {floatingReports.map((report, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.2, type: 'spring', stiffness: 200 }}
                  className={`absolute bg-white rounded-xl shadow-lg p-3 w-[140px] ${
                    i === 0 ? '-top-4 -right-8 float-1' :
                    i === 1 ? 'bottom-20 -left-12 float-2' :
                    'top-1/2 -right-16 float-3'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={`w-2 h-2 rounded-full ${
                      i === 0 ? 'bg-[#E63946]' : i === 1 ? 'bg-[#FF9F1C]' : 'bg-[#00B4D8]'
                    }`} />
                    <span className="text-[10px] font-semibold text-[#03045E]">{report.severity}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight">{report.location}</div>
                  <div className="text-[9px] text-gray-400 mt-0.5">{report.time}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z" fill="#F0F4F8"/>
        </svg>
      </div>
    </section>
  );
}
