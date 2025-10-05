import fetch from "node-fetch";

// Add timeout and retry function
const fetchWithTimeoutAndRetry = async (url, options = {}, timeout = 10000, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error; // Last retry, throw error
      console.log(`Retry ${i + 1} for ${url}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
};

// Updated fetchClimateData with better error handling
export async function fetchClimateData(startDate, endDate, lat, lon) {
  const start = startDate.replace(/-/g, "");
  const end = endDate.replace(/-/g, "");
  
  const url = `https://power.larc.nasa.gov/api/temporal/daily/point?` +
    `parameters=T2M,T2M_MAX,T2M_MIN,PRECTOTCORR&` +
    `community=AG&` +
    `longitude=${lon}&` +
    `latitude=${lat}&` +
    `start=${start}&` +
    `end=${end}&` +
    `format=JSON`;

  try {
    console.log(`Fetching climate data for lat: ${lat}, lon: ${lon}`);
    
    const data = await fetchWithTimeoutAndRetry(url, {}, 15000, 2); // 15s timeout, 2 retries
    
    return {
      location: { lat, lon },
      dateRange: { start: startDate, end: endDate },
      temperature: data.properties.parameter.T2M,
      temperatureMax: data.properties.parameter.T2M_MAX,
      temperatureMin: data.properties.parameter.T2M_MIN,
      precipitation: data.properties.parameter.PRECTOTCORR,
      source: 'NASA_POWER'
    };
  } catch (error) {
    console.error('NASA POWER API failed, using fallback data:', error.message);
    
    // Fallback: Generate realistic mock data based on location and season
    return generateMockClimateData(lat, lon, startDate, endDate);
  }
}

// Generate realistic mock climate data
function generateMockClimateData(lat, lon, startDate, endDate) {
  const isNorthernHemisphere = lat > 0;
  const month = new Date(startDate).getMonth() + 1;
  
  // Base temperatures based on latitude and season
  let baseTemp = 20; // Default
  if (Math.abs(lat) < 23.5) { // Tropical
    baseTemp = 25 + Math.random() * 10;
  } else if (Math.abs(lat) < 35) { // Subtropical
    baseTemp = 15 + Math.random() * 15;
  } else if (Math.abs(lat) < 55) { // Temperate
    baseTemp = 10 + Math.random() * 15;
  } else { // Polar
    baseTemp = -5 + Math.random() * 10;
  }
  
  // Seasonal adjustment
  if ((isNorthernHemisphere && (month >= 11 || month <= 2)) || 
      (!isNorthernHemisphere && (month >= 5 && month <= 8))) {
    baseTemp -= 10; // Winter
  }
  
  // Generate daily data
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  const temperature = {};
  const temperatureMax = {};
  const temperatureMin = {};
  const precipitation = {};
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    const dateKey = currentDate.toISOString().split('T')[0].replace(/-/g, '');
    
    // Realistic temperature variations
    const dailyTemp = baseTemp + (Math.random() * 8 - 4);
    temperature[dateKey] = parseFloat(dailyTemp.toFixed(1));
    temperatureMax[dateKey] = parseFloat((dailyTemp + 5 + Math.random() * 5).toFixed(1));
    temperatureMin[dateKey] = parseFloat((dailyTemp - 5 - Math.random() * 5).toFixed(1));
    
    // Precipitation (mm) - occasional rain
    precipitation[dateKey] = Math.random() > 0.7 ? parseFloat((Math.random() * 15).toFixed(1)) : 0;
  }
  
  return {
    location: { lat, lon },
    dateRange: { start: startDate, end: endDate },
    temperature,
    temperatureMax,
    temperatureMin,
    precipitation,
    source: 'MOCK_DATA'
  };
}
// Add GLOBE Observations function to nasaApi.js
export async function fetchGLOBEObservations(startDate, endDate, lat, lon, locationName) {
  try {
    console.log(`Fetching GLOBE observations for ${locationName} (${lat}, ${lon})`);
    
    // Mock implementation - replace with actual GLOBE API call
    // GLOBE API: https://api.globe.gov/search/v1/measurement/protocol/
    
    // For now, return mock data
    return generateMockGLOBEData(startDate, endDate, lat, lon);
  } catch (error) {
    console.error('GLOBE API error:', error);
    return generateMockGLOBEData(startDate, endDate, lat, lon);
  }
}

function generateMockGLOBEData(startDate, endDate, lat, lon) {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Generate mock GLOBE observation data
  let current = new Date(start);
  while (current <= end) {
    // Simulate occasional observations (30% chance per day)
    if (Math.random() > 0.7) {
      data.push({
        date: current.toISOString().split('T')[0],
        latitude: lat + (Math.random() - 0.5) * 0.01,
        longitude: lon + (Math.random() - 0.5) * 0.01,
        measurement: 'land_cover',
        value: Math.random() > 0.5 ? 'flowers_present' : 'no_flowers',
        source: 'GLOBE_Observer',
        confidence: Math.random() * 0.5 + 0.5 // 0.5-1.0
      });
    }
    current.setDate(current.getDate() + 1);
  }
  
  return data;
}

// Also export the other functions that are used in your bloomController
export async function fetchHistoricalNDVI(startDate, endDate, lat, lon, locationName) {
  // Add your NDVI implementation here
  console.log(`Fetching NDVI data for ${locationName}`);
  return generateMockNDVIData(startDate, endDate);
}

export function calculateClimateMetrics(climateData) {
  // Calculate metrics from climate data
  const temps = Object.values(climateData.temperature);
  const precips = Object.values(climateData.precipitation);
  
  return {
    avgTemperature: temps.reduce((a, b) => a + b, 0) / temps.length,
    totalPrecipitation: precips.reduce((a, b) => a + b, 0),
    avgPrecipitation: precips.reduce((a, b) => a + b, 0) / precips.length,
    daysAbove15C: temps.filter(t => t > 15).length,
    daysWithRain: precips.filter(p => p > 0).length
  };
}

function generateMockNDVIData(startDate, endDate) {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let current = new Date(start);
  while (current <= end) {
    data.push({
      date: current.toISOString().split('T')[0],
      ndvi: 0.5 + Math.random() * 0.3,
      evi: 0.3 + Math.random() * 0.4
    });
    current.setMonth(current.getMonth() + 1);
  }
  
  return data;
}