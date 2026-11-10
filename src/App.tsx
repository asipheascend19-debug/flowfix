import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import LiveMap from './sections/LiveMap';
import ImpactMetrics from './sections/ImpactMetrics';
import ReportLeak from './sections/ReportLeak';
import HowItWorks from './sections/HowItWorks';
import Leaderboard from './sections/Leaderboard';
import AskPlumber from './sections/AskPlumber';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <LiveMap />
      <ImpactMetrics />
      <ReportLeak />
      <HowItWorks />
      <Leaderboard />
      <AskPlumber />
      <Footer />
    </div>
  );
}
