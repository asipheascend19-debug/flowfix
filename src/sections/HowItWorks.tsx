import { motion } from 'framer-motion';
import { Eye, Smartphone, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { processSteps } from '../data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Eye,
  Smartphone,
  TrendingUp,
  CheckCircle,
};

export default function HowItWorks() {
  return (
    <section id="howitworks" className="bg-[#90E0EF] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-['Playfair_Display'] font-bold text-3xl sm:text-5xl text-[#03045E] mb-4">
            How FlowFix Works
          </h2>
          <p className="text-base text-[#0077B6]">
            From puddle to pipeline — the journey of a leak report.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative"
              >
                {/* Dashed arrow between steps (desktop only) */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(100%+12px)] w-[calc(100%-24px)] z-0">
                    <div className="flex items-center gap-1">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className="h-0.5 flex-1 bg-[#00B4D8]/40" />
                      ))}
                      <ArrowRight className="w-4 h-4 text-[#00B4D8] flex-shrink-0" />
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-[20px] p-6 relative z-10 h-full"
                  style={{ borderTop: `4px solid ${step.accentColor}` }}
                >
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: step.accentColor }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className="text-2xl font-black"
                      style={{ color: step.accentColor, fontFamily: 'Inter, sans-serif' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#03045E] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
