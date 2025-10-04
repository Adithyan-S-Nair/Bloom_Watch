import React, { useState, useEffect, useRef } from 'react';
import { Globe, TrendingUp, BarChart3, Leaf, Sparkles, Satellite, ArrowRight, Play, Pause, Download, Share2 } from 'lucide-react';

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
      {[...Array(20)].map((_, i) => (
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

// Insight card component
const InsightCard = ({ title, description, impact, stat, statLabel, delay = 0, isActive, onHover }) => {
  return (
    <div 
      className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
        isActive ? 'ring-2 ring-green-500 ring-opacity-50' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900 pr-4">{title}</h3>
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
          <Sparkles size={24} className="text-white" />
        </div>
      </div>
      
      <p className="text-gray-700 mb-6 leading-relaxed text-lg">
        {description}
      </p>
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
        <p className="text-gray-600 mb-3 text-sm font-medium">Impact Analysis</p>
        <p className="text-gray-700">{impact}</p>
      </div>
      
      {stat && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-gray-600">{statLabel}</div>
        </div>
      )}
    </div>
  );
};

// Animated timeline component
const ResearchTimeline = () => {
  const [activeYear, setActiveYear] = useState(2024);
  
  const timelineData = [
    { year: 2024, event: 'AI-Powered Bloom Prediction', progress: 'Current' },
    { year: 2023, event: 'Global NDVI Pattern Analysis', progress: 'Completed' },
    { year: 2022, event: 'Climate Impact Modeling', progress: 'Completed' },
    { year: 2021, event: 'Satellite Data Integration', progress: 'Completed' },
    { year: 2020, event: 'Bloom Tracker Foundation', progress: 'Completed' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Research Timeline</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-500"></div>
        
        {timelineData.map((item, index) => (
          <div 
            key={item.year}
            className="relative flex items-center mb-8 last:mb-0 group cursor-pointer"
            onClick={() => setActiveYear(item.year)}
          >
            <div className={`w-8 h-8 rounded-full border-4 z-10 transition-all duration-300 ${
              activeYear === item.year 
                ? 'bg-green-500 border-green-500 scale-125' 
                : 'bg-white border-green-300 group-hover:border-green-500'
            }`}></div>
            
            <div className={`ml-6 transition-all duration-300 ${
              activeYear === item.year ? 'scale-105' : ''
            }`}>
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-lg font-bold transition-colors ${
                  activeYear === item.year ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {item.year}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.progress === 'Current' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.progress}
                </span>
              </div>
              <p className="text-gray-700">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Data visualization component
const DataVisualization = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">NDVI Trend Analysis</h3>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? 'Pause' : 'Play'} Animation
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <svg viewBox="0 0 400 200" className="w-full h-48">
          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 50, 100, 150, 200].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#E5E7EB" strokeWidth="1" />
          ))}
          
          {/* Trend line with animation */}
          <path 
            d="M 0,150 C 50,120 100,140 150,100 C 200,60 250,80 300,50 C 350,20 400,40 400,40"
            fill="none"
            stroke="url(#trendGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          >
            {isPlaying && (
              <animate
                attributeName="d"
                dur="3s"
                repeatCount="indefinite"
                values="
                  M 0,150 C 50,120 100,140 150,100 C 200,60 250,80 300,50 C 350,20 400,40 400,40;
                  M 0,150 C 50,130 100,110 150,90 C 200,70 250,90 300,70 C 350,50 400,70 400,70;
                  M 0,150 C 50,120 100,140 150,100 C 200,60 250,80 300,50 C 350,20 400,40 400,40
                "
                keyTimes="0; 0.5; 1"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
              />
            )}
          </path>
          
          {/* Data points */}
          <circle cx="0" cy="150" r="4" fill="#10B981">
            {isPlaying && <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />}
          </circle>
          <circle cx="150" cy="100" r="4" fill="#10B981">
            {isPlaying && <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" begin="0.5s" />}
          </circle>
          <circle cx="300" cy="50" r="4" fill="#10B981">
            {isPlaying && <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" begin="1s" />}
          </circle>
        </svg>
        
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <span>2018</span>
          <span>2020</span>
          <span>2022</span>
          <span>2024</span>
        </div>
        
        <p className="text-center text-gray-700 mt-4">
          Normalized Difference Vegetation Index (NDVI) showing increasing vegetation health trends
        </p>
      </div>
    </div>
  );
};

const InsightsPage = ({ onNavigate }) => {
  const [activeInsight, setActiveInsight] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const insightsData = [
    {
      title: "Early Spring Blooms",
      description: "Analysis of satellite data shows that spring blooming events are occurring 2-3 weeks earlier than they did 30 years ago across temperate regions.",
      impact: "This shift has significant implications for pollinator populations and agricultural planning, requiring adaptation strategies.",
      stat: { value: 15, suffix: ' days' },
      statLabel: "Average advancement in spring bloom timing"
    },
    {
      title: "Tropical Stability",
      description: "Tropical rainforests show more stable blooming patterns year-round, with peak NDVI values maintaining remarkable consistency.",
      impact: "However, subtle changes in timing may indicate stress from temperature increases and changing precipitation patterns.",
      stat: { value: 98, suffix: '%' },
      statLabel: "Consistency in tropical vegetation patterns"
    },
    {
      title: "Arctic Greening",
      description: "Northern regions are experiencing extended growing seasons and increased vegetation coverage due to climate warming.",
      impact: "NDVI increases of up to 15% in Arctic regions over the past two decades signal significant ecosystem changes.",
      stat: { value: 15, suffix: '%' },
      statLabel: "Increase in Arctic vegetation coverage"
    },
    {
      title: "Agricultural Impact",
      description: "Farmers can optimize planting schedules by tracking local bloom trends and NDVI patterns with unprecedented precision.",
      impact: "Predictive models based on historical satellite data help reduce crop loss and improve yields by up to 20%.",
      stat: { value: 20, suffix: '%' },
      statLabel: "Potential yield improvement with optimized planning"
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
          <button onClick={() => onNavigate('trends')} className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors">
            Trends
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium shadow-lg">
            Insights
          </button>
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors">
            NASA Data
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-8 py-12 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              RESEARCH INSIGHTS
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover Planetary
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bloom Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advanced analysis of satellite data reveals critical patterns in global vegetation health, 
            helping us understand and respond to our changing planet.
          </p>
        </div>

        {/* Main Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {insightsData.map((insight, index) => (
            <InsightCard
              key={index}
              {...insight}
              delay={index * 100}
              isActive={activeInsight === index}
              onHover={(isHovering) => isHovering && setActiveInsight(index)}
            />
          ))}
        </div>

        {/* Additional Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ResearchTimeline />
          <DataVisualization />
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Deeper Insights?</h2>
          <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
            Access our complete research database, download datasets, and collaborate with our scientific team.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center gap-2">
              <Download size={20} />
              Download Research Paper
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2">
              <Share2 size={20} />
              Share Insights
            </button>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={500} suffix="+" />
            </div>
            <div className="text-gray-600">Research Papers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={25} suffix="+" />
            </div>
            <div className="text-gray-600">Countries Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={15} suffix="+" />
            </div>
            <div className="text-gray-600">Years of Data</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={99} suffix="%" />
            </div>
            <div className="text-gray-600">Data Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;