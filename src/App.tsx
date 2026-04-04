import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  CloudRain, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Lock, 
  Cpu,
  CheckCircle2,
  ArrowRight,
  Globe,
  Smartphone,
  Loader2,
  MapPin,
  Briefcase,
  IndianRupee
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

const SectionHeading = ({ badge, title, subtitle }: { badge: string, title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full uppercase tracking-wider"
    >
      {badge}
    </motion.span>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

export default function App() {
  const [riskData, setRiskData] = useState<any>(null);
  const [loadingRisk, setLoadingRisk] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    workType: "delivery",
    location: "Mumbai",
    weeklyIncome: 5000
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/disruption-alerts");
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    }
  };

  const handleRiskAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRisk(true);
    try {
      const response = await fetch("/api/risk-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setRiskData(data);
    } catch (error) {
      console.error("Risk assessment failed:", error);
    } finally {
      setLoadingRisk(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/input_file_0.png" 
              alt="GigSecure Logo" 
              className="h-10 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#ai-ml" className="hover:text-blue-600 transition-colors">AI Intelligence</a>
            <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Income Protection for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Modern Gig Economy
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              GigSecure uses AI-driven parametric insurance to protect delivery partners, drivers, and freelancers from income loss caused by weather, strikes, and environmental disruptions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                Secure My Income <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-all">
                View Coverage Plans
              </button>
            </div>
          </motion.div>

          {/* Hero Stats/Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: "Weekly Subscription", value: "₹50 - ₹150" },
              { label: "Payout Speed", value: "Instant" },
              { label: "Claims Process", value: "Automatic" },
              { label: "Risk Analysis", value: "AI-Powered" }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Risk Assessment Section */}
      <section id="risk-assessment" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                badge="Calculator"
                title="Calculate Your Protection"
                subtitle="Get a personalized risk assessment and premium quote in seconds based on your work profile and location."
              />
              
              <form onSubmit={handleRiskAssessment} className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" /> Work Type
                    </label>
                    <select 
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.workType}
                      onChange={(e) => setFormData({...formData, workType: e.target.value})}
                    >
                      <option value="delivery">Delivery Partner</option>
                      <option value="driver">Ride-hailing Driver</option>
                      <option value="freelancer">Freelancer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" /> Location
                    </label>
                    <select 
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-blue-600" /> Weekly Income (Avg)
                  </label>
                  <input 
                    type="number" 
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. 5000"
                    value={formData.weeklyIncome}
                    onChange={(e) => setFormData({...formData, weeklyIncome: parseInt(e.target.value) || 0})}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loadingRisk}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loadingRisk ? <Loader2 className="w-5 h-5 animate-spin" /> : "Calculate Premium"}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {riskData ? (
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-blue-500/30">
                  <h3 className="text-2xl font-bold mb-6 text-blue-400">Your Protection Plan</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <span className="text-slate-400">Weekly Premium</span>
                      <span className="text-3xl font-bold text-white">₹{riskData.premium}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <span className="text-slate-400">Risk Level</span>
                      <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                        riskData.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' : 
                        riskData.riskLevel === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {riskData.riskLevel} Risk
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <span className="text-slate-400">Max Weekly Coverage</span>
                      <span className="text-xl font-bold text-blue-400">₹{riskData.coverageAmount}</span>
                    </div>
                    <p className="text-sm text-slate-500 italic">
                      *Calculated based on hyper-local environmental data and your work profile.
                    </p>
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
                      Activate Protection
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Awaiting Calculation</h3>
                  <p className="text-slate-400">Fill in your details to see your personalized protection plan.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Alerts Section */}
      <section className="py-12 bg-slate-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Live Disruption Alerts</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border ${
                  alert.severity === 'High' ? 'bg-red-500/10 border-red-500/20' : 
                  alert.severity === 'Medium' ? 'bg-orange-500/10 border-orange-500/20' : 
                  'bg-blue-500/10 border-blue-500/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    alert.severity === 'High' ? 'bg-red-500 text-white' : 
                    alert.severity === 'Medium' ? 'bg-orange-500 text-white' : 
                    'bg-blue-500 text-white'
                  }`}>
                    {alert.type}
                  </span>
                  {alert.active && <span className="text-[10px] text-white/50 uppercase">Active Now</span>}
                </div>
                <p className="text-sm text-slate-300">{alert.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading 
            badge="The System"
            title="How GigSecure Works"
            subtitle="A seamless, automated experience designed to keep you financially stable regardless of external disruptions."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Smartphone}
              title="Dynamic Onboarding"
              description="Users are assigned to dynamic risk groups based on work type, location, and historical patterns for personalized protection."
              delay={0.1}
            />
            <FeatureCard 
              icon={BarChart3}
              title="AI Risk Assessment"
              description="A weekly subscription (₹50–₹150) is calculated using real-time AI-driven risk scoring tailored to your specific environment."
              delay={0.2}
            />
            <FeatureCard 
              icon={Globe}
              title="Continuous Monitoring"
              description="Our system monitors weather, AQI, geo-events, and your work patterns 24/7 to detect potential income threats."
              delay={0.3}
            />
            <FeatureCard 
              icon={AlertTriangle}
              title="Parametric Triggers"
              description="Claims trigger automatically when thresholds are met—like heavy rain, >30% order drops, or restricted zones."
              delay={0.4}
            />
            <FeatureCard 
              icon={Zap}
              title="Instant Payouts"
              description="No manual claims. No paperwork. Payouts are processed instantly through integrated payment systems the moment triggers are met."
              delay={0.5}
            />
            <FeatureCard 
              icon={CheckCircle2}
              title="Zero Friction"
              description="Designed for trust. Minimal intervention for genuine users with grace handling for network inconsistencies."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* AI/ML Components */}
      <section id="ai-ml" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <SectionHeading 
                badge="Intelligence"
                title="AI-Powered Resilience"
              />
              <div className="space-y-8">
                {[
                  {
                    title: "Risk Scoring",
                    desc: "Advanced ML models calculate premiums by analyzing hyper-local environmental risks and individual work profiles.",
                    icon: Cpu
                  },
                  {
                    title: "Disruption Detection",
                    desc: "Real-time data fusion from weather stations, AQI sensors, and city-wide geo-events to identify systemic income threats.",
                    icon: CloudRain
                  },
                  {
                    title: "Behavioral Fraud Detection",
                    desc: "Sophisticated analysis of GPS patterns, device fingerprinting, and network anomalies to ensure system integrity.",
                    icon: ShieldCheck
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="text-blue-400" /> Real-time Risk Dashboard
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Environmental Risk (AQI/Rain)</span>
                      <span className="text-sm font-bold text-orange-400">High</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full">
                      <div className="bg-orange-400 h-full rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Work Pattern Consistency</span>
                      <span className="text-sm font-bold text-green-400">Stable</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full">
                      <div className="bg-green-400 h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Trigger Status</span>
                      <span className="text-sm font-bold text-blue-400">Monitoring...</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-blue-400/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adversarial Defense */}
      <section id="security" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading 
            badge="Security"
            title="Adversarial Defense System"
            subtitle="Protecting the community pool through multi-layer validation and intelligent fraud prevention."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <Lock className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Multi-Layer Validation</h3>
              <p className="text-slate-400 leading-relaxed">
                Differentiating genuine users from spoofed claims using device fingerprinting, GPS verification, and network anomaly detection.
              </p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <Users className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Fraud Ring Detection</h3>
              <p className="text-slate-400 leading-relaxed">
                Using clustering algorithms and pattern recognition to identify and block organized fraud attempts before they impact the pool.
              </p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <Shield className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Tiered Claim System</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div> Low Risk: Instant Payout</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div> Medium: Soft Verification</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> High: Flagged for Review</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">The GigSecure Impact</h2>
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <p className="text-5xl font-extrabold mb-2">Millions</p>
              <p className="text-blue-100">Gig workers supported at scale</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold mb-2">100%</p>
              <p className="text-blue-100">Automated parametric triggers</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold mb-2">Fair</p>
              <p className="text-blue-100">Community-based pooling model</p>
            </div>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            GigSecure combines the power of community-based pooling with AI-driven parametric insurance to provide a scalable, fair, and instant financial safety net for the backbone of our economy.
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-blue-50 transition-all shadow-xl">
            Join the Network
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center">
            <img 
              src="/input_file_0.png" 
              alt="GigSecure Logo" 
              className="h-8 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 GigSecure AI. Protecting the future of work.
          </p>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
