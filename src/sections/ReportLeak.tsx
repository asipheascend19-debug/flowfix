import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Camera, TrendingUp, Award, Check } from 'lucide-react';

type Severity = 'low' | 'medium' | 'critical';

const features = [
  { icon: MapPin, label: 'GPS-tagged location' },
  { icon: Camera, label: 'Attach a photo' },
  { icon: TrendingUp, label: 'Track repair status' },
  { icon: Award, label: 'Earn community points' },
];

const severityOptions: { value: Severity; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-orange-500' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500' },
];

export default function ReportLeak() {
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState<Severity>('medium');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const reset = () => {
    setSubmitted(false);
    setLocation('');
    setDescription('');
    setSeverity('medium');
  };

  return (
    <section id="report" className="bg-[#F0F4F8] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-['Playfair_Display'] font-bold text-3xl sm:text-[40px] text-[#03045E] mb-4">
              See a Leak? Report It.
            </h2>
            <p className="text-base text-gray-600 mb-8">
              Your report goes straight to the dashboard. The more eyes on the ground, the faster we fix.
            </p>

            <div className="space-y-4">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00B4D8] flex items-center justify-center flex-shrink-0">
                    <feat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{feat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-[#03045E] mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Street address or landmark"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-[#03045E] mb-2">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the leak — size, duration, danger level..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 transition-all resize-none"
                        required
                      />
                    </div>

                    {/* Severity */}
                    <div>
                      <label className="block text-sm font-semibold text-[#03045E] mb-2">
                        Severity
                      </label>
                      <div className="flex gap-3">
                        {severityOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setSeverity(opt.value)}
                            className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                              severity === opt.value
                                ? `${opt.color} text-white shadow-md`
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-[#03045E] mb-2">
                        Photo
                      </label>
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={() => setDragOver(false)}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 ${
                          dragOver ? 'border-[#00B4D8] bg-[#CAF0F8]/50' : 'border-dashed border-gray-300'
                        } rounded-lg py-8 px-4 text-center cursor-pointer hover:border-[#00B4D8] hover:bg-[#CAF0F8]/30 transition-all`}
                      >
                        <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Drop a photo or <span className="text-[#00B4D8] font-medium">click to upload</span>
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-[#00B4D8] text-[#03045E] py-4 rounded-full text-base font-bold hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(0,180,216,0.4)] transition-all duration-300"
                    >
                      Submit Report
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    {/* Animated Check */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2EC4B6]/20 flex items-center justify-center">
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="w-10 h-10 text-[#2EC4B6]" />
                      </motion.div>
                    </div>
                    <h3 className="font-['Playfair_Display'] font-bold text-2xl text-[#03045E] mb-2">
                      Reported!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for keeping Johannesburg dry. Your report ID is <strong className="text-[#00B4D8]">#FLX-{Math.floor(Math.random() * 9000) + 1000}</strong>
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      You earned <strong className="text-[#00B4D8]">50 community points!</strong> 🎉
                    </p>
                    <button
                      onClick={reset}
                      className="bg-[#03045E] text-white px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform"
                    >
                      Report Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
