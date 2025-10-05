import React, { useState, useEffect } from 'react';
import { Globe, TrendingUp, BarChart3, Leaf, Search } from 'lucide-react';

// Mock country data with bloom information
const countryData = {
  // 🌿 HIGH BLOOM INTENSITY - Optimal Conditions
  'Brazil': {
    name: 'Amazon Basin, Brazil',
    ndvi: '0.85',
    peakBloom: 'March 15, 2024',
    species: 'Tropical Rainforest',
    coordinates: [-10, -55],
    bloomIntensity: 'high',
    temperature: '28°C',
    precipitation: 'High',
    confidence: '92%'
  },
  'Japan': {
    name: 'Kyoto, Japan',
    ndvi: '0.78',
    peakBloom: 'April 5, 2024',
    species: 'Cherry Blossoms',
    coordinates: [35, 135],
    bloomIntensity: 'high',
    temperature: '16°C',
    precipitation: 'Moderate',
    confidence: '88%'
  },
  'Netherlands': {
    name: 'Keukenhof, Netherlands',
    ndvi: '0.73',
    peakBloom: 'April 15, 2024',
    species: 'Tulips',
    coordinates: [52, 5],
    bloomIntensity: 'high',
    temperature: '12°C',
    precipitation: 'High',
    confidence: '85%'
  },
  'India': {
    name: 'Valley of Flowers, India',
    ndvi: '0.80',
    peakBloom: 'July 25, 2024',
    species: 'Alpine Flowers',
    coordinates: [30, 79],
    bloomIntensity: 'high',
    temperature: '18°C',
    precipitation: 'Moderate',
    confidence: '90%'
  },
  'Australia': {
    name: 'Western Australia',
    ndvi: '0.75',
    peakBloom: 'September 15, 2024',
    species: 'Wildflowers',
    coordinates: [-25, 122],
    bloomIntensity: 'high',
    temperature: '22°C',
    precipitation: 'Low',
    confidence: '82%'
  },

  // 🌸 MEDIUM BLOOM INTENSITY - Moderate Conditions
  'United States': {
    name: 'California, USA',
    ndvi: '0.72',
    peakBloom: 'April 20, 2024',
    species: 'Wildflowers & Chaparral',
    coordinates: [37, -119],
    bloomIntensity: 'medium',
    temperature: '20°C',
    precipitation: 'Low',
    confidence: '65%'
  },
  'South Africa': {
    name: 'Western Cape, South Africa',
    ndvi: '0.68',
    peakBloom: 'August 30, 2024',
    species: 'Fynbos & Proteas',
    coordinates: [-33, 19],
    bloomIntensity: 'medium',
    temperature: '24°C',
    precipitation: 'Low',
    confidence: '60%'
  },
  'France': {
    name: 'Provence, France',
    ndvi: '0.70',
    peakBloom: 'June 20, 2024',
    species: 'Lavender Fields',
    coordinates: [44, 6],
    bloomIntensity: 'medium',
    temperature: '18°C',
    precipitation: 'Moderate',
    confidence: '70%'
  },
  'Italy': {
    name: 'Tuscany, Italy',
    ndvi: '0.69',
    peakBloom: 'May 15, 2024',
    species: 'Sunflowers',
    coordinates: [43, 11],
    bloomIntensity: 'medium',
    temperature: '19°C',
    precipitation: 'Moderate',
    confidence: '68%'
  },
  'Spain': {
    name: 'Andalusia, Spain',
    ndvi: '0.66',
    peakBloom: 'March 30, 2024',
    species: 'Orange Blossoms',
    coordinates: [37, -5],
    bloomIntensity: 'medium',
    temperature: '22°C',
    precipitation: 'Low',
    confidence: '62%'
  },

  // 🍂 LOW BLOOM INTENSITY - Poor Conditions
  'Canada': {
    name: 'Canadian Rockies',
    ndvi: '0.45',
    peakBloom: 'July 10, 2024',
    species: 'Alpine Wildflowers',
    coordinates: [51, -116],
    bloomIntensity: 'low',
    temperature: '8°C',
    precipitation: 'High',
    confidence: '35%'
  },
  'Chile': {
    name: 'Atacama Desert',
    ndvi: '0.38',
    peakBloom: 'Rare Event',
    species: 'Desert Blooms',
    coordinates: [-23, -69],
    bloomIntensity: 'low',
    temperature: '25°C',
    precipitation: 'Very Low',
    confidence: '25%'
  },
  'Norway': {
    name: 'Norwegian Fjords',
    ndvi: '0.52',
    peakBloom: 'June 25, 2024',
    species: 'Arctic Flowers',
    coordinates: [62, 7],
    bloomIntensity: 'low',
    temperature: '10°C',
    precipitation: 'High',
    confidence: '40%'
  },
  'Egypt': {
    name: 'Nile Delta',
    ndvi: '0.48',
    peakBloom: 'February 28, 2024',
    species: 'Lotus Flowers',
    coordinates: [30, 31],
    bloomIntensity: 'low',
    temperature: '26°C',
    precipitation: 'Very Low',
    confidence: '30%'
  },
  'Greenland': {
    name: 'Southern Greenland',
    ndvi: '0.32',
    peakBloom: 'July 5, 2024',
    species: 'Tundra Flora',
    coordinates: [64, -40],
    bloomIntensity: 'low',
    temperature: '5°C',
    precipitation: 'Moderate',
    confidence: '20%'
  },

  // 🌺 VARIABLE BLOOM INTENSITY - Unpredictable Conditions
  'United Kingdom': {
    name: 'Cotswolds, UK',
    ndvi: '0.71',
    peakBloom: 'May 20, 2024',
    species: 'Bluebells',
    coordinates: [52, -2],
    bloomIntensity: 'medium',
    temperature: '14°C',
    precipitation: 'High',
    confidence: '55%'
  },
  'New Zealand': {
    name: 'South Island',
    ndvi: '0.74',
    peakBloom: 'December 15, 2024',
    species: 'Lupines',
    coordinates: [-43, 170],
    bloomIntensity: 'high',
    temperature: '16°C',
    precipitation: 'High',
    confidence: '78%'
  },
  'Mexico': {
    name: 'Oaxaca Valley',
    ndvi: '0.67',
    peakBloom: 'March 10, 2024',
    species: 'Dahlias',
    coordinates: [17, -96],
    bloomIntensity: 'medium',
    temperature: '24°C',
    precipitation: 'Low',
    confidence: '58%'
  },
  'Thailand': {
    name: 'Chiang Mai',
    ndvi: '0.79',
    peakBloom: 'January 20, 2024',
    species: 'Orchids',
    coordinates: [19, 99],
    bloomIntensity: 'high',
    temperature: '28°C',
    precipitation: 'Moderate',
    confidence: '84%'
  },
  'Argentina': {
    name: 'Patagonia',
    ndvi: '0.56',
    peakBloom: 'November 30, 2024',
    species: 'Andean Flowers',
    coordinates: [-41, -71],
    bloomIntensity: 'low',
    temperature: '12°C',
    precipitation: 'Moderate',
    confidence: '45%'
  },

  // 🌻 EXTREME SCENARIOS - Edge Cases
  'Saudi Arabia': {
    name: 'Empty Quarter',
    ndvi: '0.15',
    peakBloom: 'No Bloom Predicted',
    species: 'Desert Shrubs',
    coordinates: [20, 50],
    bloomIntensity: 'none',
    temperature: '35°C',
    precipitation: 'Extremely Low',
    confidence: '5%'
  },
  'Indonesia': {
    name: 'Borneo Rainforest',
    ndvi: '0.88',
    peakBloom: 'Year-round',
    species: 'Tropical Orchids',
    coordinates: [-2, 113],
    bloomIntensity: 'very-high',
    temperature: '30°C',
    precipitation: 'Very High',
    confidence: '95%'
  },
  'Russia': {
    name: 'Siberian Tundra',
    ndvi: '0.28',
    peakBloom: 'July 20, 2024',
    species: 'Arctic Poppies',
    coordinates: [67, 86],
    bloomIntensity: 'very-low',
    temperature: '3°C',
    precipitation: 'Low',
    confidence: '15%'
  },
  'Madagascar': {
    name: 'Spiny Forest',
    ndvi: '0.63',
    peakBloom: 'October 15, 2024',
    species: 'Baobab Flowers',
    coordinates: [-19, 46],
    bloomIntensity: 'medium',
    temperature: '26°C',
    precipitation: 'Low',
    confidence: '52%'
  },
  'Iceland': {
    name: 'Volcanic Highlands',
    ndvi: '0.41',
    peakBloom: 'June 15, 2024',
    species: 'Arctic Thyme',
    coordinates: [64, -19],
    bloomIntensity: 'low',
    temperature: '7°C',
    precipitation: 'High',
    confidence: '28%'
  },
  
  'China': {
    name: 'Yunnan Province, China',
    ndvi: '0.76',
    peakBloom: 'March 25, 2024',
    species: 'Rhododendrons',
    coordinates: [25, 102],
    bloomIntensity: 'high',
    temperature: '18°C',
    precipitation: 'Moderate',
    confidence: '82%'
  },
  'South Korea': {
    name: 'Jirisan National Park',
    ndvi: '0.73',
    peakBloom: 'April 10, 2024',
    species: 'Azaleas',
    coordinates: [35, 128],
    bloomIntensity: 'high',
    temperature: '14°C',
    precipitation: 'Moderate',
    confidence: '79%'
  },
  'Vietnam': {
    name: 'Sapa Valley',
    ndvi: '0.81',
    peakBloom: 'February 15, 2024',
    species: 'Terraced Blooms',
    coordinates: [22, 104],
    bloomIntensity: 'high',
    temperature: '20°C',
    precipitation: 'High',
    confidence: '86%'
  },
  'Philippines': {
    name: 'Banaue Rice Terraces',
    ndvi: '0.78',
    peakBloom: 'Year-round',
    species: 'Tropical Blooms',
    coordinates: [17, 121],
    bloomIntensity: 'high',
    temperature: '28°C',
    precipitation: 'Very High',
    confidence: '88%'
  },
  'Malaysia': {
    name: 'Cameron Highlands',
    ndvi: '0.83',
    peakBloom: 'Year-round',
    species: 'Orchids & Ferns',
    coordinates: [4, 101],
    bloomIntensity: 'very-high',
    temperature: '22°C',
    precipitation: 'High',
    confidence: '92%'
  },

  // 🌼 EUROPE - Seasonal Blooms
  'Germany': {
    name: 'Black Forest',
    ndvi: '0.69',
    peakBloom: 'May 15, 2024',
    species: 'Edelweiss',
    coordinates: [48, 8],
    bloomIntensity: 'medium',
    temperature: '16°C',
    precipitation: 'High',
    confidence: '65%'
  },
  'Switzerland': {
    name: 'Swiss Alps',
    ndvi: '0.58',
    peakBloom: 'June 20, 2024',
    species: 'Alpine Roses',
    coordinates: [46, 8],
    bloomIntensity: 'medium',
    temperature: '12°C',
    precipitation: 'High',
    confidence: '55%'
  },
  'Austria': {
    name: 'Tyrolean Alps',
    ndvi: '0.62',
    peakBloom: 'June 10, 2024',
    species: 'Gentians',
    coordinates: [47, 12],
    bloomIntensity: 'medium',
    temperature: '14°C',
    precipitation: 'Moderate',
    confidence: '60%'
  },
  'Greece': {
    name: 'Peloponnese',
    ndvi: '0.64',
    peakBloom: 'April 5, 2024',
    species: 'Wild Herbs',
    coordinates: [37, 22],
    bloomIntensity: 'medium',
    temperature: '19°C',
    precipitation: 'Low',
    confidence: '58%'
  },
  'Portugal': {
    name: 'Algarve Coast',
    ndvi: '0.67',
    peakBloom: 'March 20, 2024',
    species: 'Rock Roses',
    coordinates: [37, -8],
    bloomIntensity: 'medium',
    temperature: '21°C',
    precipitation: 'Low',
    confidence: '62%'
  },

  // 🌸 AFRICA - Unique Ecosystems
  'Kenya': {
    name: 'Mount Kenya',
    ndvi: '0.72',
    peakBloom: 'July 30, 2024',
    species: 'Lobelias',
    coordinates: [-1, 37],
    bloomIntensity: 'high',
    temperature: '16°C',
    precipitation: 'Moderate',
    confidence: '75%'
  },
  'Tanzania': {
    name: 'Ngorongoro Crater',
    ndvi: '0.68',
    peakBloom: 'November 15, 2024',
    species: 'Wildflowers',
    coordinates: [-3, 35],
    bloomIntensity: 'medium',
    temperature: '22°C',
    precipitation: 'Low',
    confidence: '64%'
  },
  'Morocco': {
    name: 'Atlas Mountains',
    ndvi: '0.59',
    peakBloom: 'April 25, 2024',
    species: 'Wild Iris',
    coordinates: [32, -5],
    bloomIntensity: 'medium',
    temperature: '20°C',
    precipitation: 'Low',
    confidence: '52%'
  },
  'Ethiopia': {
    name: 'Simien Mountains',
    ndvi: '0.71',
    peakBloom: 'August 20, 2024',
    species: 'Giant Lobelias',
    coordinates: [13, 38],
    bloomIntensity: 'high',
    temperature: '18°C',
    precipitation: 'High',
    confidence: '73%'
  },
  'Namibia': {
    name: 'Namib Desert',
    ndvi: '0.29',
    peakBloom: 'Rare Event',
    species: 'Desert Succulents',
    coordinates: [-23, 15],
    bloomIntensity: 'very-low',
    temperature: '30°C',
    precipitation: 'Extremely Low',
    confidence: '18%'
  },

  // 🌺 SOUTH AMERICA - Biodiversity Hotspots
  'Peru': {
    name: 'Machu Picchu',
    ndvi: '0.77',
    peakBloom: 'September 10, 2024',
    species: 'Andean Orchids',
    coordinates: [-13, -72],
    bloomIntensity: 'high',
    temperature: '16°C',
    precipitation: 'Moderate',
    confidence: '80%'
  },
  'Colombia': {
    name: 'Coffee Region',
    ndvi: '0.84',
    peakBloom: 'Year-round',
    species: 'Heliconias',
    coordinates: [5, -75],
    bloomIntensity: 'very-high',
    temperature: '24°C',
    precipitation: 'High',
    confidence: '91%'
  },
  'Ecuador': {
    name: 'Galapagos Islands',
    ndvi: '0.65',
    peakBloom: 'January 15, 2024',
    species: 'Unique Endemics',
    coordinates: [-1, -91],
    bloomIntensity: 'medium',
    temperature: '26°C',
    precipitation: 'Low',
    confidence: '59%'
  },
  'Venezuela': {
    name: 'Angel Falls',
    ndvi: '0.86',
    peakBloom: 'Year-round',
    species: 'Rainforest Canopy',
    coordinates: [6, -63],
    bloomIntensity: 'very-high',
    temperature: '28°C',
    precipitation: 'Very High',
    confidence: '94%'
  },
  'Bolivia': {
    name: 'Salar de Uyuni',
    ndvi: '0.42',
    peakBloom: 'February 5, 2024',
    species: 'Salt-tolerant Flora',
    coordinates: [-20, -68],
    bloomIntensity: 'low',
    temperature: '15°C',
    precipitation: 'Very Low',
    confidence: '32%'
  },

  // 🌼 NORTH AMERICA - Diverse Regions
  'Canada West': {
    name: 'British Columbia',
    ndvi: '0.74',
    peakBloom: 'May 30, 2024',
    species: 'Pacific Rhododendrons',
    coordinates: [49, -123],
    bloomIntensity: 'high',
    temperature: '14°C',
    precipitation: 'High',
    confidence: '77%'
  },
  'Mexico South': {
    name: 'Chiapas Highlands',
    ndvi: '0.79',
    peakBloom: 'March 15, 2024',
    species: 'Bromeliads',
    coordinates: [16, -92],
    bloomIntensity: 'high',
    temperature: '22°C',
    precipitation: 'High',
    confidence: '83%'
  },
  'Alaska': {
    name: 'Denali National Park',
    ndvi: '0.48',
    peakBloom: 'July 5, 2024',
    species: 'Arctic Lupines',
    coordinates: [63, -151],
    bloomIntensity: 'low',
    temperature: '8°C',
    precipitation: 'Moderate',
    confidence: '38%'
  },
  'Hawaii': {
    name: 'Maui Tropical',
    ndvi: '0.82',
    peakBloom: 'Year-round',
    species: 'Hibiscus & Plumeria',
    coordinates: [20, -156],
    bloomIntensity: 'very-high',
    temperature: '26°C',
    precipitation: 'High',
    confidence: '89%'
  },
  'Costa Rica': {
    name: 'Monteverde Cloud Forest',
    ndvi: '0.85',
    peakBloom: 'Year-round',
    species: 'Epiphytes',
    coordinates: [10, -85],
    bloomIntensity: 'very-high',
    temperature: '20°C',
    precipitation: 'Very High',
    confidence: '93%'
  },

  // 🌸 OCEANIA - Island Ecosystems
  'Fiji': {
    name: 'Fiji Islands',
    ndvi: '0.81',
    peakBloom: 'Year-round',
    species: 'Tropical Hibiscus',
    coordinates: [-18, 178],
    bloomIntensity: 'high',
    temperature: '27°C',
    precipitation: 'High',
    confidence: '87%'
  },
  'Papua New Guinea': {
    name: 'Highland Valleys',
    ndvi: '0.87',
    peakBloom: 'Year-round',
    species: 'Orchids & Ferns',
    coordinates: [-6, 147],
    bloomIntensity: 'very-high',
    temperature: '24°C',
    precipitation: 'Very High',
    confidence: '95%'
  },
  'Solomon Islands': {
    name: 'Tropical Archipelago',
    ndvi: '0.83',
    peakBloom: 'Year-round',
    species: 'Coastal Blooms',
    coordinates: [-9, 160],
    bloomIntensity: 'high',
    temperature: '28°C',
    precipitation: 'High',
    confidence: '90%'
  },

  // 🌺 MIDDLE EAST - Arid Regions
  'Turkey': {
    name: 'Cappadocia',
    ndvi: '0.61',
    peakBloom: 'May 5, 2024',
    species: 'Wild Tulips',
    coordinates: [38, 34],
    bloomIntensity: 'medium',
    temperature: '18°C',
    precipitation: 'Low',
    confidence: '56%'
  },
  'Israel': {
    name: 'Negev Desert',
    ndvi: '0.37',
    peakBloom: 'February 20, 2024',
    species: 'Desert Iris',
    coordinates: [31, 35],
    bloomIntensity: 'low',
    temperature: '25°C',
    precipitation: 'Very Low',
    confidence: '26%'
  },
  'Jordan': {
    name: 'Wadi Rum',
    ndvi: '0.33',
    peakBloom: 'March 1, 2024',
    species: 'Desert Acacia',
    coordinates: [30, 35],
    bloomIntensity: 'very-low',
    temperature: '28°C',
    precipitation: 'Extremely Low',
    confidence: '22%'
  },

  // 🌼 CARIBBEAN - Island Paradises
  'Jamaica': {
    name: 'Blue Mountains',
    ndvi: '0.80',
    peakBloom: 'Year-round',
    species: 'Jamaican Blooms',
    coordinates: [18, -77],
    bloomIntensity: 'high',
    temperature: '26°C',
    precipitation: 'High',
    confidence: '85%'
  },
  'Dominican Republic': {
    name: 'Tropical Valleys',
    ndvi: '0.78',
    peakBloom: 'Year-round',
    species: 'Caribbean Flora',
    coordinates: [19, -71],
    bloomIntensity: 'high',
    temperature: '27°C',
    precipitation: 'Moderate',
    confidence: '82%'
  },
  'Bahamas': {
    name: 'Coral Islands',
    ndvi: '0.69',
    peakBloom: 'Year-round',
    species: 'Seaside Flowers',
    coordinates: [25, -77],
    bloomIntensity: 'medium',
    temperature: '28°C',
    precipitation: 'Moderate',
    confidence: '67%'
  },

  // 🌸 POLAR & EXTREME REGIONS
  'Antarctica': {
    name: 'Antarctic Peninsula',
    ndvi: '0.12',
    peakBloom: 'No Bloom',
    species: 'Antarctic Lichen',
    coordinates: [-64, -63],
    bloomIntensity: 'none',
    temperature: '-5°C',
    precipitation: 'Snow',
    confidence: '2%'
  },
  'Svalbard': {
    name: 'Arctic Archipelago',
    ndvi: '0.24',
    peakBloom: 'July 15, 2024',
    species: 'Arctic Moss',
    coordinates: [78, 16],
    bloomIntensity: 'very-low',
    temperature: '2°C',
    precipitation: 'Snow/Rain',
    confidence: '12%'
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