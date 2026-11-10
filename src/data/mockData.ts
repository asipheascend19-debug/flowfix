export interface LeakReport {
  id: number;
  location: string;
  severity: 'critical' | 'medium' | 'low';
  status: 'active' | 'repairing' | 'fixed';
  lat: number;
  lng: number;
  time: string;
  description: string;
}

export const leakReports: LeakReport[] = [
  { id: 1, location: "Jan Smuts Ave, Rosebank", severity: "critical", status: "active", lat: 30, lng: 45, time: "2 hours ago", description: "Major burst pipe, water flooding roadway" },
  { id: 2, location: "Main Rd, Bryanston", severity: "medium", status: "repairing", lat: 25, lng: 35, time: "5 hours ago", description: "Persistent leak from manhole cover" },
  { id: 3, location: "Louis Botha Ave, Orange Grove", severity: "critical", status: "active", lat: 55, lng: 60, time: "30 min ago", description: "Water gushing from broken main line" },
  { id: 4, location: "Rivonia Rd, Sandton", severity: "low", status: "fixed", lat: 20, lng: 40, time: "1 day ago", description: "Small seepage from sidewalk valve" },
  { id: 5, location: "Eloff St, CBD", severity: "medium", status: "active", lat: 50, lng: 50, time: "3 hours ago", description: "Leaking fire hydrant" },
  { id: 6, location: "Crownwood Rd, Ormonde", severity: "critical", status: "repairing", lat: 65, lng: 48, time: "8 hours ago", description: "Burst service connection, road damage" },
  { id: 7, location: "Witkoppen Rd, Fourways", severity: "low", status: "active", lat: 15, lng: 30, time: "6 hours ago", description: "Slow leak at meter box" },
  { id: 8, location: "Klipfontein Rd, Athlone", severity: "medium", status: "fixed", lat: 58, lng: 52, time: "2 days ago", description: "Intermittent leak from aging pipe" },
];

export interface ChartDataPoint {
  day: string;
  reports: number;
}

export const chartData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 12 + Math.sin(day * 0.3) * 8;
  const trend = day * 0.4;
  const noise = (Math.random() - 0.5) * 10;
  return {
    day: `Day ${day}`,
    reports: Math.max(5, Math.round(base + trend + noise)),
  };
});

export interface LeaderboardEntry {
  rank: number;
  name: string;
  reports: number;
  points: number;
  initials: string;
  gradient: string;
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Thabo M.", reports: 47, points: 2350, initials: "TM", gradient: "from-yellow-400 to-orange-500" },
  { rank: 2, name: "Lerato K.", reports: 41, points: 2050, initials: "LK", gradient: "from-gray-300 to-gray-400" },
  { rank: 3, name: "Sipho N.", reports: 38, points: 1900, initials: "SN", gradient: "from-orange-400 to-orange-600" },
  { rank: 4, name: "Anele D.", reports: 33, points: 1650, initials: "AD", gradient: "from-cyan-500 to-teal-500" },
  { rank: 5, name: "Nomvula S.", reports: 29, points: 1450, initials: "NS", gradient: "from-teal-500 to-cyan-500" },
];

export interface ImpactMetric {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
  trend: string;
  trendUp: boolean;
}

export const impactMetrics: ImpactMetric[] = [
  { value: "70M", numericValue: 70, suffix: "M", label: "Litres Lost Daily", description: "Treated drinking water never reaches consumers", trend: "↑ 12%", trendUp: true },
  { value: "R7B", numericValue: 7, suffix: "B", label: "Annual Revenue Loss", description: "Cost to municipalities and ultimately residents", trend: "↑ 8%", trendUp: true },
  { value: "428 km", numericValue: 428, suffix: " km", label: "Pipes Need Replacement", description: "Aging infrastructure beyond useful lifespan", trend: "↓ 5%", trendUp: false },
  { value: "40%", numericValue: 40, suffix: "%", label: "Non-Revenue Water", description: "SA national average, nearly double the world standard", trend: "↑ 3%", trendUp: true },
];

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  accentColor: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  { number: 1, title: "Spot It", description: "Notice a leak? Don't walk past it. Every report matters.", accentColor: "#E63946", icon: "Eye" },
  { number: 2, title: "Report It", description: "Snap a photo, tag the location, submit in 30 seconds.", accentColor: "#FF9F1C", icon: "Smartphone" },
  { number: 3, title: "Track It", description: "Watch your report move from logged → under review → repair scheduled → fixed.", accentColor: "#00B4D8", icon: "TrendingUp" },
  { number: 4, title: "Fixed!", description: "Earn points, see impact stats, and know you made a difference.", accentColor: "#2EC4B6", icon: "CheckCircle" },
];
