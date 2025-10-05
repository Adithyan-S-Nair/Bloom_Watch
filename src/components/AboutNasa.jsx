import React, { useState, useEffect } from 'react';
import { Satellite, Globe, Database, Zap, Download, BarChart3, Leaf, Sparkles } from 'lucide-react';

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-float"
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

const DataSourceCard = ({ icon: Icon, title, description, satellites, frequency, status }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <div className="text-gray-500 mb-1">Satellites</div>
        <div className="font-semibold text-gray-900">{satellites}</div>
      </div>
      <div>
        <div className="text-gray-500 mb-1">Update Frequency</div>
        <div className="font-semibold text-gray-900">{frequency}</div>
      </div>
    </div>
    
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
      <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
      <span className="text-sm text-gray-600">{status}</span>
    </div>
  </div>
);

const SatelliteCard = ({ name, agency, launch, purpose, status }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
    </div>
    
    <div className="space-y-3 text-sm">
      <div>
        <div className="text-gray-500">Agency</div>
        <div className="font-semibold text-gray-900">{agency}</div>
      </div>
      <div>
        <div className="text-gray-500">Launch Date</div>
        <div className="font-semibold text-gray-900">{launch}</div>
      </div>
      <div>
        <div className="text-gray-500">Primary Purpose</div>
        <div className="font-semibold text-gray-900">{purpose}</div>
      </div>
    </div>
  </div>
);

const AboutNasa = ({ onNavigate }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dataSources = [
    {
      icon: Zap,
      title: "NASA POWER API",
      description: "Climate and meteorological data including temperature, precipitation, and solar radiation.",
      satellites: "Multiple NASA Missions",
      frequency: "Daily Updates",
      status: "Active"
    },
    {
      icon: Globe,
      title: "Vegetation Indices",
      description: "NDVI and EVI data for monitoring plant health and vegetation coverage worldwide.",
      satellites: "MODIS, Landsat, Sentinel-2",
      frequency: "16-day Cycles",
      status: "Active"
    },
    {
      icon: Database,
      title: "iNaturalist Observations",
      description: "Community-sourced plant and animal observations with species identification.",
      satellites: "N/A - Ground-based",
      frequency: "Real-time",
      status: "Active"
    }
  ];

  const satellites = [
    {
      name: "Terra",
      agency: "NASA",
      launch: "1999",
      purpose: "Earth Observation System",
      status: "Operational"
    },
    {
      name: "Aqua",
      agency: "NASA", 
      launch: "2002",
      purpose: "Atmospheric & Water Monitoring",
      status: "Operational"
    },
    {
      name: "Landsat 9",
      agency: "NASA/USGS",
      launch: "2021",
      purpose: "Land Imaging",
      status: "Operational"
    },
    {
      name: "Sentinel-2",
      agency: "ESA",
      launch: "2015-2017",
      purpose: "Land Monitoring",
      status: "Operational"
    }
  ];

  const statistics = [
    { value: "50+", label: "Countries Monitored" },
    { value: "24/7", label: "Data Collection" },
    { value: "2.5M+", label: "Data Points Daily" },
    { value: "99.8%", label: "Data Accuracy" }
  ];

  const handleNavigation = (page) => {
    onNavigate(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <button 
          onClick={() => handleNavigation('home')} 
          className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          <Leaf size={28} />
          BLOOMTRACKER
        </button>
        <div className="flex gap-2 bg-white/50 rounded-2xl p-2 backdrop-blur-sm border border-white/30">
          <button 
            onClick={() => handleNavigation('map')} 
            className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors hover:bg-white/50"
          >
            Global Bloom Map
          </button>
          <button 
            onClick={() => handleNavigation('trends')} 
            className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors hover:bg-white/50"
          >
            Trends
          </button>
          <button 
            onClick={() => handleNavigation('insights')} 
            className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors hover:bg-white/50"
          >
            Insights
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium shadow-lg">
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
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Satellite size={16} />
              NASA EARTHDATA
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powered by
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              NASA Satellite Technology
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            BloomTracker leverages cutting-edge NASA Earth observation data, satellite imagery, 
            and climate science to provide accurate, real-time bloom predictions and vegetation analysis.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Data Sources Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Data Sources & APIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataSources.map((source, index) => (
              <DataSourceCard key={index} {...source} />
            ))}
          </div>
        </div>

        {/* Satellite Fleet */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Satellite Constellation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {satellites.map((satellite, index) => (
              <SatelliteCard key={index} {...satellite} />
            ))}
          </div>
        </div>

        {/* Data Processing Pipeline */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Data Processing Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                <Satellite className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Satellite Acquisition</h3>
              <p className="text-gray-600 text-sm">Data collection from multiple satellite systems</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto">
                <Database className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-900">NASA Processing</h3>
              <p className="text-gray-600 text-sm">Quality control and data normalization</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Analysis Engine</h3>
              <p className="text-gray-600 text-sm">AI-powered bloom prediction algorithms</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Visualization</h3>
              <p className="text-gray-600 text-sm">Interactive maps and real-time displays</p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">NASA Technologies</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Sparkles size={16} />
                MODIS Vegetation Indices
              </li>
              <li className="flex items-center gap-3">
                <Sparkles size={16} />
                Landsat Surface Reflectance
              </li>
              <li className="flex items-center gap-3">
                <Sparkles size={16} />
                POWER Climate Analytics
              </li>
              <li className="flex items-center gap-3">
                <Sparkles size={16} />
                AppEEARS Data Extraction
              </li>
            </ul>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Accuracy & Quality</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Vegetation Data</span>
                  <span className="font-semibold">99.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Climate Data</span>
                  <span className="font-semibold">98.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Species Data</span>
                  <span className="font-semibold">95.4%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95.4%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Explore Real NASA Data</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Experience the power of satellite technology and Earth observation data in tracking global bloom patterns.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => handleNavigation('map')}
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              <Globe size={20} />
              Explore Global Map
            </button>
            <button 
              onClick={() => handleNavigation('home')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutNasa;