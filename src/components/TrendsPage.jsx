import React, { useState, useEffect, useRef } from 'react';
import { Globe, TrendingUp, BarChart3, Leaf, Sparkles, Satellite, Play, Pause, Download, Filter, Calendar, Zap } from 'lucide-react';

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(value);
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-green-300 rounded-full opacity-30 animate-float"
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

// Interactive chart component
const InteractiveChart = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const dataPoints = [
    { year: 2000, ndvi: 0.65, bloomShift: 0 },
    { year: 2004, ndvi: 0.68, bloomShift: 2 },
    { year: 2008, ndvi: 0.72, bloomShift: 5 },
    { year: 2012, ndvi: 0.74, bloomShift: 8 },
    { year: 2016, ndvi: 0.77, bloomShift: 12 },
    { year: 2020, ndvi: 0.79, bloomShift: 16 },
    { year: 2024, ndvi: 0.82, bloomShift: 21 }
  ];

  const getPointPosition = (point) => {
    const yearProgress = (point.year - 2000) / (2024 - 2000);
    const ndviProgress = (point.ndvi - 0.6) / (0.85 - 0.6);
    return {
      x: 40 + (yearProgress * 320),
      y: 200 - (ndviProgress * 150)
    };
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">NDVI Trend Analysis</h3>
          <p className="text-gray-600">Normalized Difference Vegetation Index (2000-2024)</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:border-green-400 transition-all duration-300">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      <div className="relative">
        <svg viewBox="0 0 400 250" className="w-full h-64">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[50, 100, 150, 200].map((y, index) => (
            <g key={y}>
              <line x1="40" y1={y} x2="380" y2={y} stroke="#E5E7EB" strokeWidth="1" />
              <text x="20" y={y + 4} fontSize="12" fill="#6B7280" textAnchor="end">
                {((250 - y) / 250 * 0.25 + 0.6).toFixed(2)}
              </text>
            </g>
          ))}
          
          {/* Year labels */}
          {dataPoints.map((point, index) => (
            <text 
              key={point.year}
              x={getPointPosition(point).x} 
              y="240" 
              fontSize="12" 
              fill="#6B7280" 
              textAnchor="middle"
            >
              {point.year}
            </text>
          ))}
          
          {/* Area fill */}
          <path
            d={`M 40 ${getPointPosition(dataPoints[0]).y} ${dataPoints.map(point => {
              const pos = getPointPosition(point);
              return `L ${pos.x} ${pos.y}`;
            }).join(' ')} L 360 200 L 40 200 Z`}
            fill="url(#areaGradient)"
          />
          
          {/* Animated trend line */}
          <polyline
            points={dataPoints.map(point => {
              const pos = getPointPosition(point);
              return `${pos.x},${pos.y}`;
            }).join(' ')}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          >
            {isPlaying && (
              <animate
                attributeName="stroke-dasharray"
                from="0, 1000"
                to="1000, 0"
                dur="2s"
                fill="freeze"
              />
            )}
          </polyline>
          
          {/* Data points with hover effects */}
          {dataPoints.map((point, index) => {
            const pos = getPointPosition(point);
            const isSelected = selectedYear === point.year;
            const isHovered = hoveredPoint === point.year;
            
            return (
              <g key={point.year}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected || isHovered ? 8 : 6}
                  fill={isSelected ? "#10B981" : "#3B82F6"}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredPoint(point.year)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setSelectedYear(point.year)}
                >
                  {(isSelected || isHovered) && (
                    <animate
                      attributeName="r"
                      values="6;8;6"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                
                {/* Tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={pos.x - 40}
                      y={pos.y - 60}
                      width="80"
                      height="40"
                      rx="8"
                      fill="#1F2937"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 45}
                      fontSize="10"
                      fill="white"
                      textAnchor="middle"
                    >
                      {point.year}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y - 30}
                      fontSize="10"
                      fill="white"
                      textAnchor="middle"
                    >
                      NDVI: {point.ndvi}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Current selection info */}
        {selectedYear && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="text-sm font-medium">
              {dataPoints.find(p => p.year === selectedYear)?.year}: 
              NDVI {dataPoints.find(p => p.year === selectedYear)?.ndvi}
            </div>
          </div>
        )}
      </div>
      
      {/* Trend summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="text-green-600" size={20} />
          <span className="font-semibold text-gray-900">Trend Analysis</span>
        </div>
        <p className="text-gray-700">
          Bloom period shifting <span className="font-bold text-green-600">earlier each year</span> → 
          clear sign of warming trend. Average advancement of{' '}
          <span className="font-bold text-blue-600">
            {dataPoints.find(p => p.year === 2024)?.bloomShift} days
          </span> since 2000.
        </p>
      </div>
    </div>
  );
};

// Application card component
const ApplicationCard = ({ icon: Icon, title, description, stats, color, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
        isHovered ? `ring-2 ring-${color}-500 ring-opacity-50` : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r from-${color}-500 to-${color}-600`}>
          <Icon size={32} className="text-white" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      
      {stats && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TrendsPage = ({ onNavigate }) => {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState('2000-2024');
  const [selectedRegion, setSelectedRegion] = useState('global');

  useEffect(() => {
    setMounted(true);
  }, []);

  const applications = [
    {
      icon: Leaf,
      title: "Agriculture",
      description: "Track crop health and optimize harvest timing with precision analytics",
      color: "green",
      stats: [
        { value: 20, suffix: '%', label: 'Yield Increase' },
        { value: 15, suffix: ' days', label: 'Better Planning' }
      ]
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12L3 13.5V15.5L9 14V16L3 17.5V19.5L9 18V22H15V18L21 19.5V17.5L15 16V14L21 15.5V13.5L15 12V10.5L21 9Z" />
        </svg>
      ),
      title: "Pollinators",
      description: "Monitor bloom timing for pollination patterns and ecosystem health",
      color: "purple",
      stats: [
        { value: 35, suffix: '%', label: 'Efficiency Gain' },
        { value: 12, suffix: ' species', label: 'Better Supported' }
      ]
    },
    {
      icon: Globe,
      title: "Climate Research",
      description: "Understand ecosystem responses to warming and climate patterns",
      color: "blue",
      stats: [
        { value: 2.3, suffix: '°C', label: 'Temp Correlation' },
        { value: 85, suffix: '%', label: 'Pattern Accuracy' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
        >
          <Leaf size={28} />
          BLOOMTRACKER
        </button>
        <div className="flex gap-2 bg-white/50 rounded-2xl p-2 backdrop-blur-sm border border-white/30">
          <button onClick={() => onNavigate('map')} className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors">
            Global Bloom Map
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium shadow-lg">
            Trends
          </button>
          <button onClick={() => onNavigate('insights')} className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors">
            Insights
          </button>
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors">
            NASA Data
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-8 py-12 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <TrendingUp size={16} />
              TREND ANALYSIS
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Track Global
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bloom Patterns
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover long-term vegetation trends and climate impacts through interactive data visualization 
            and advanced analytics powered by NASA satellite data.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <Calendar size={20} className="text-gray-600" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-gray-700"
            >
              <option value="2000-2024">2000-2024</option>
              <option value="2010-2024">2010-2024</option>
              <option value="2015-2024">2015-2024</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <Globe size={20} className="text-gray-600" />
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-gray-700"
            >
              <option value="global">Global</option>
              <option value="north-america">North America</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="tropics">Tropics</option>
            </select>
          </div>
          
          <button className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 hover:border-green-400 transition-all duration-300">
            <Filter size={20} className="text-gray-600" />
            <span className="text-gray-700">More Filters</span>
          </button>
        </div>

        {/* Main Chart */}
        <div className="mb-12">
          <InteractiveChart />
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {applications.map((app, index) => (
            <ApplicationCard
              key={app.title}
              {...app}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Trend Analysis Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter value={24} suffix="+" />
              </div>
              <div className="text-green-100">Years of Data</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter value={150} suffix="M+" />
              </div>
              <div className="text-green-100">Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter value={99} suffix="%" />
              </div>
              <div className="text-green-100">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter value={21} suffix=" days" />
              </div>
              <div className="text-green-100">Avg Bloom Shift</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsPage;