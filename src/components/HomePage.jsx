import React, { useState, useEffect } from 'react';
import { Globe, TrendingUp, BarChart3, Leaf, Sparkles, Satellite, MapPin } from 'lucide-react';

// Floating particles background component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-300 rounded-full opacity-40 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

// Animated bloom icon component
const AnimatedBloom = () => {
  return (
    <div className="relative w-full h-full max-w-2xl max-h-2xl flex items-center justify-center">
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full opacity-20 blur-xl"></div>
      </div>
      
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
      >
        <defs>
          <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Earth sphere with subtle texture */}
        <circle cx="200" cy="200" r="160" fill="url(#earthGradient)" opacity="0.9">
          <animate attributeName="r" values="160;162;160" dur="6s" repeatCount="indefinite" />
        </circle>
        
        {/* Glow effect */}
        <circle cx="200" cy="200" r="170" fill="url(#glow)" opacity="0.4" />
        
        {/* Subtle earth texture */}
        <path 
          d="M 120 120 Q 150 100 180 110 Q 220 90 250 130 Q 280 160 270 200 Q 260 240 220 250 Q 180 260 140 240 Q 110 220 100 180 Q 90 150 120 120 Z" 
          fill="#FFFFFF" 
          opacity="0.05"
        />
        
        {/* Bloom locations with flower animations */}
        <g className="bloom-locations">
          {/* North America Bloom */}
          <g transform="translate(120, 120)" className="bloom-spot">
            <circle r="4" fill="#4ADE80" opacity="0.8">
              <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
            </circle>
            <g className="flower-petals" transform="scale(0.6)">
              <circle cx="0" cy="-8" r="3" fill="#86EFAC" opacity="0.7">
                <animate attributeName="cy" values="-8;-6;-8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="8" cy="0" r="3" fill="#86EFAC" opacity="0.7">
                <animate attributeName="cx" values="8;6;8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="8" r="3" fill="#86EFAC" opacity="0.7">
                <animate attributeName="cy" values="8;6;8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="-8" cy="0" r="3" fill="#86EFAC" opacity="0.7">
                <animate attributeName="cx" values="-8;-6;-8" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* Europe Bloom */}
          <g transform="translate(180, 100)" className="bloom-spot">
            <circle r="3" fill="#22C55E" opacity="0.9">
              <animate attributeName="r" values="3;7;3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <g className="flower-petals" transform="scale(0.5)">
              <circle cx="0" cy="-6" r="2" fill="#BBF7D0" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="6" cy="0" r="2" fill="#BBF7D0" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="6" r="2" fill="#BBF7D0" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="-6" cy="0" r="2" fill="#BBF7D0" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* Asia Bloom */}
          <g transform="translate(250, 140)" className="bloom-spot">
            <circle r="5" fill="#16A34A" opacity="0.7">
              <animate attributeName="r" values="5;9;5" dur="4s" repeatCount="indefinite" />
            </circle>
            <g className="flower-petals" transform="scale(0.7)">
              <circle cx="0" cy="-7" r="2.5" fill="#4ADE80" opacity="0.6">
                <animateTransform attributeName="transform" type="rotate" values="0 0 0;10 0 0;0 0 0" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="7" cy="0" r="2.5" fill="#4ADE80" opacity="0.6">
                <animateTransform attributeName="transform" type="rotate" values="0 0 0;10 0 0;0 0 0" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="7" r="2.5" fill="#4ADE80" opacity="0.6">
                <animateTransform attributeName="transform" type="rotate" values="0 0 0;10 0 0;0 0 0" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="-7" cy="0" r="2.5" fill="#4ADE80" opacity="0.6">
                <animateTransform attributeName="transform" type="rotate" values="0 0 0;10 0 0;0 0 0" dur="3s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* Africa Bloom */}
          <g transform="translate(190, 180)" className="bloom-spot">
            <circle r="4" fill="#15803D" opacity="0.8">
              <animate attributeName="r" values="4;6;4" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <g className="flower-petals" transform="scale(0.8)">
              <circle cx="0" cy="-5" r="2" fill="#22C55E" opacity="0.7">
                <animate attributeName="cy" values="-5;-7;-5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="5" cy="0" r="2" fill="#22C55E" opacity="0.7">
                <animate attributeName="cx" values="5;7;5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="5" r="2" fill="#22C55E" opacity="0.7">
                <animate attributeName="cy" values="5;7;5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="-5" cy="0" r="2" fill="#22C55E" opacity="0.7">
                <animate attributeName="cx" values="-5;-7;-5" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* South America Bloom */}
          <g transform="translate(150, 220)" className="bloom-spot">
            <circle r="3" fill="#065F46" opacity="0.9">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
            </circle>
            <g className="flower-petals" transform="scale(0.4)">
              <circle cx="0" cy="-4" r="1.5" fill="#16A34A" opacity="0.8">
                <animate attributeName="r" values="1.5;2;1.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="4" cy="0" r="1.5" fill="#16A34A" opacity="0.8">
                <animate attributeName="r" values="1.5;2;1.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="4" r="1.5" fill="#16A34A" opacity="0.8">
                <animate attributeName="r" values="1.5;2;1.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="-4" cy="0" r="1.5" fill="#16A34A" opacity="0.8">
                <animate attributeName="r" values="1.5;2;1.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
        </g>

        {/* Satellite orbit with data collection animation */}
        <circle cx="200" cy="200" r="175" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        
        {/* Data collection satellite */}
        <g className="satellite">
          <circle cx="275" cy="125" r="4" fill="#F59E0B">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Data beam from satellite to bloom spots */}
          <path 
            d="M 275 125 L 250 140" 
            stroke="#F59E0B" 
            strokeWidth="1" 
            strokeDasharray="2 2" 
            opacity="0.6"
          >
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Bloom intensity rings */}
        <g className="bloom-rings">
          <circle cx="120" cy="120" r="12" fill="none" stroke="#4ADE80" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="12;20;12" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="250" cy="140" r="10" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

// Navigation item component
const NavItem = ({ icon: Icon, label, onClick, isActive = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group ${
      isActive 
        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
        : 'text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-md'
    }`}
  >
    <Icon size={20} className="group-hover:scale-110 transition-transform" />
    <span className="font-medium">{label}</span>
  </button>
);

// Home Page Component
const HomePage = ({ onNavigate, currentPage = 'home' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden flex flex-col">
      <FloatingParticles />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-green-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-purple-300 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
            <Leaf size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            BLOOMTRACKER
          </h1>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full ml-2">
            NASA Powered
          </span>
        </div>
        
        <div className="flex gap-2 bg-white/50 rounded-2xl p-2 backdrop-blur-sm border border-white/30">
          <NavItem 
            icon={Globe} 
            label="Global Bloom Map" 
            onClick={() => onNavigate('map')}
            isActive={currentPage === 'map'}
          />
          <NavItem 
            icon={TrendingUp} 
            label="Trends & Analysis" 
            onClick={() => onNavigate('trends')}
            isActive={currentPage === 'trends'}
          />
          <NavItem 
            icon={BarChart3} 
            label="Insights" 
            onClick={() => onNavigate('insights')}
            isActive={currentPage === 'insights'}
          />
          <NavItem 
            icon={Satellite} 
            label="About NASA Data" 
            onClick={() => onNavigate('nasa')}
            isActive={currentPage === 'nasa'}
          />
        </div>
      </nav>

      {/* Main Content - Full screen */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="container mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
            <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium text-green-600">
                  <Sparkles size={16} />
                  <span>REAL-TIME EARTH OBSERVATION</span>
                </div>
                
                <h2 className="text-6xl font-bold text-gray-900 leading-tight">
                  Witness Earth's
                  <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Living Canvas
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Explore the dynamic beauty of plant blooming events across our planet, 
                  powered by cutting-edge NASA Earth observation data and satellite imagery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('map')}
                  className="group relative bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-2xl text-lg font-medium hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    <MapPin size={20} />
                    Start Exploring
                  </span>
                </button>
                
                <button 
                  onClick={() => onNavigate('nasa')}
                  className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl text-lg font-medium hover:border-green-400 hover:bg-white/50 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Satellite size={20} />
                    About NASA Data
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Bloom Events Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Real-time Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">NASA</div>
                  <div className="text-sm text-gray-600">Satellite Data</div>
                </div>
              </div>
            </div>

            {/* Animated Bloom Visualization */}
            <div className={`flex justify-center items-center transition-all duration-700 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <AnimatedBloom />
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="relative z-10 text-center pb-8">
        <p className="text-gray-500 text-sm">
          Powered by NASA Earth Observatory Data • Tracking planetary vitality since 2024
        </p>
      </div>
    </div>
  );
};

export default HomePage;