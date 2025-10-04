import React, { useState, useEffect } from 'react';
import { Globe, TrendingUp, BarChart3, Leaf, Search } from 'lucide-react';

// Mock country data with bloom information
const countryData = {
  'Brazil': {
    name: 'Amazon Basin, Brazil',
    ndvi: '0.85',
    peakBloom: 'March 15, 2024',
    species: 'Tropical Rainforest',
    coordinates: [-10, -55],
    bloomIntensity: 'high'
  },
  'United States': {
    name: 'California, USA',
    ndvi: '0.72',
    peakBloom: 'April 20, 2024',
    species: 'Wildflowers & Chaparral',
    coordinates: [37, -119],
    bloomIntensity: 'medium'
  },
  'Japan': {
    name: 'Kyoto, Japan',
    ndvi: '0.78',
    peakBloom: 'April 5, 2024',
    species: 'Cherry Blossoms',
    coordinates: [35, 135],
    bloomIntensity: 'high'
  },
  'South Africa': {
    name: 'Western Cape, South Africa',
    ndvi: '0.68',
    peakBloom: 'August 30, 2024',
    species: 'Fynbos & Proteas',
    coordinates: [-33, 19],
    bloomIntensity: 'medium'
  },
  'Australia': {
    name: 'Western Australia',
    ndvi: '0.75',
    peakBloom: 'September 15, 2024',
    species: 'Wildflowers',
    coordinates: [-25, 122],
    bloomIntensity: 'high'
  },
  'France': {
    name: 'Provence, France',
    ndvi: '0.70',
    peakBloom: 'June 20, 2024',
    species: 'Lavender Fields',
    coordinates: [44, 6],
    bloomIntensity: 'medium'
  },
  'Netherlands': {
    name: 'Keukenhof, Netherlands',
    ndvi: '0.73',
    peakBloom: 'April 15, 2024',
    species: 'Tulips',
    coordinates: [52, 5],
    bloomIntensity: 'high'
  },
  'India': {
    name: 'Valley of Flowers, India',
    ndvi: '0.80',
    peakBloom: 'July 25, 2024',
    species: 'Alpine Flowers',
    coordinates: [30, 79],
    bloomIntensity: 'high'
  }
};

const BloomMapPage = ({ onNavigate }) => {
  const [selectedCountry, setSelectedCountry] = useState('Brazil');
  const [map, setMap] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initialize Leaflet map
    const initializeMap = () => {
      const L = window.L;
      if (!L) return;

      const mapInstance = L.map('map', {
        zoomControl: false,
        attributionControl: false
      }).setView([20, 0], 2);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 8,
        minZoom: 2
      }).addTo(mapInstance);

      // Add bloom markers for each country
      Object.entries(countryData).forEach(([country, data]) => {
        const bloomColor = data.bloomIntensity === 'high' ? '#10B981' : 
                          data.bloomIntensity === 'medium' ? '#F59E0B' : '#EF4444';
        
        const bloomIcon = L.divIcon({
          className: 'bloom-marker',
          html: `
            <div class="relative">
              <div class="w-6 h-6 rounded-full bg-white border-2 border-white shadow-lg animate-pulse"></div>
              <div class="absolute inset-0 w-6 h-6 rounded-full ${data.bloomIntensity === 'high' ? 'bg-green-500' : data.bloomIntensity === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}" style="animation: bloomPulse 2s infinite"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker(data.coordinates, { icon: bloomIcon }).addTo(mapInstance);
        
        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-sm">${data.name}</h3>
            <p class="text-xs text-gray-600">NDVI: ${data.ndvi}</p>
            <p class="text-xs text-gray-600">Peak: ${data.peakBloom}</p>
          </div>
        `);

        marker.on('click', () => {
          setSelectedCountry(country);
        });
      });

      setMap(mapInstance);
    };

    // Load Leaflet CSS and JS
    const loadLeaflet = () => {
      if (!document.querySelector('#leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    loadLeaflet();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (map && countryData[selectedCountry]) {
      const data = countryData[selectedCountry];
      map.setView(data.coordinates, 4, {
        animate: true,
        duration: 1
      });
    }
  }, [selectedCountry, map]);

  const filteredCountries = Object.keys(countryData).filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentData = countryData[selectedCountry];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <style jsx>{`
        @keyframes bloomPulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }
        .bloom-marker {
          background: transparent !important;
          border: none !important;
        }
        #map {
          height: 500px;
          border-radius: 12px;
          z-index: 1;
        }
        .leaflet-container {
          background: #bfdbfe !important;
        }
      `}</style>

      <nav className="flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
        >
          <Leaf size={28} />
          BLOOMTRACKER
        </button>
        <div className="flex gap-2 bg-white/50 rounded-2xl p-2 backdrop-blur-sm border border-white/30">
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium shadow-lg">
            Global Bloom Map
          </button>
          <button onClick={() => onNavigate('trends')} className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-colors">
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

      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold text-gray-900">Global Bloom Map</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>High Bloom</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span>Medium Bloom</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-1">
              <div id="map" className="w-full"></div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Country Selector */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredCountries.map((country) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedCountry === country
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{country}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        countryData[country].bloomIntensity === 'high' ? 'bg-green-500' :
                        countryData[country].bloomIntensity === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bloom Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Bloom Information</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Region</div>
                  <div className="font-semibold text-gray-900">{currentData.name}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">NDVI Index</div>
                    <div className="font-semibold text-gray-900">{currentData.ndvi}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Bloom Intensity</div>
                    <div className="font-semibold capitalize text-gray-900">{currentData.bloomIntensity}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Peak Bloom Period</div>
                  <div className="font-semibold text-gray-900">{currentData.peakBloom}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Dominant Species</div>
                  <div className="font-semibold text-gray-900">{currentData.species}</div>
                </div>
              </div>
            </div>

            {/* Timeline Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="font-bold mb-4 text-gray-900">Bloom Timeline Analysis</h4>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                <svg viewBox="0 0 300 120" className="w-full">
                  <defs>
                    <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points="10,80 40,70 70,75 100,65 130,70 160,60 190,65 220,55 250,60 280,50"
                    fill="none"
                    stroke="url(#timelineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <text x="10" y="110" fontSize="10" fill="#6B7280">2018</text>
                  <text x="100" y="110" fontSize="10" fill="#6B7280">2020</text>
                  <text x="190" y="110" fontSize="10" fill="#6B7280">2022</text>
                  <text x="280" y="110" fontSize="10" fill="#6B7280">2024</text>
                </svg>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Bloom period starting earlier each year → sign of warming trend
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloomMapPage;