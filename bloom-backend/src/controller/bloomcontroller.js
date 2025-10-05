import { fetchClimateData, fetchHistoricalNDVI, calculateClimateMetrics } from "../config/nasaApi.js";
import { formatDateToMDY, shiftDate } from "../utils/utils.js";
import { fetchObservations } from "../config/iNaturalistApi.js";
import { processObservations } from "./iNaturalistcontroller.js";
import { fetchSpeciesDetails } from "../config/geminiApi.js";

export async function getBloomStatus(req, res) {
  try {
    const { startDate, endDate, lat, lon, locationName } = req.body;

    console.log(`Processing bloom status for: ${locationName} (${lat}, ${lon})`);

    const years = Array.from({ length: 3 }, (_, i) => new Date(endDate).getFullYear() - i).reverse(); // Reduced to 3 years for performance

    // Run APIs with individual error handling
    let currentClimate, historicalClimate, ndviData, observations;

    try {
      [currentClimate, historicalClimate] = await Promise.all([
        fetchClimateData(shiftDate(startDate, 30), endDate, lat, lon),
        fetchClimateData(shiftDate(startDate, 30 + 365), shiftDate(endDate, 365), lat, lon)
      ]);
    } catch (climateError) {
      console.error('Climate data error:', climateError.message);
      // Continue with mock data that was generated in fetchClimateData
    }

    try {
      ndviData = await fetchHistoricalNDVI(formatDateToMDY(startDate), formatDateToMDY(endDate), lat, lon, locationName);
    } catch (ndviError) {
      console.error('NDVI data error:', ndviError.message);
      ndviData = generateMockNDVIData(startDate, endDate);
    }

    try {
      observations = await fetchObservations({
        lat,
        lon,
        radius: 10,
        startDate,
        endDate,
        years
      });
    } catch (obsError) {
      console.error('iNaturalist observations error:', obsError.message);
      observations = [];
    }

    // Climate metrics (will use mock data if API failed)
    const currentMetrics = calculateClimateMetrics(currentClimate);
    const historicalMetrics = calculateClimateMetrics(historicalClimate);

    // NDVI average & trend
    const avgNDVI = ndviData.reduce((sum, d) => sum + d.ndvi, 0) / ndviData.length;
    const ndviTrend = ndviData.map(d => ({ date: d.date, value: d.ndvi }));

    // Species processing
    const processedSpecies = processObservations(observations, years);
    const topSpecies = processedSpecies.slice(0, 5); // Reduced to 5 for performance

    // Bloom decision scoring (simplified)
    let score = calculateBloomScore(currentMetrics, historicalMetrics, avgNDVI, ndviData);

    // Bloom status
    const { bloomStatus, confidence } = getBloomStatusFromScore(score);

    // Get species details
    let firstSpecies = await getFeaturedSpecies(topSpecies, lat, lon);

    const response = {
      success: true,
      bloomStatus,
      confidence: Math.min(confidence, 100),
      currentMetrics,
      historicalMetrics,
      avgNDVI: parseFloat(avgNDVI.toFixed(3)),
      ndviTrend,
      score,
      topSpecies: [firstSpecies],
      dataSources: {
        climate: currentClimate.source || 'NASA_POWER',
        ndvi: ndviData.source || 'NASA_AppEEARS',
        species: observations.length > 0 ? 'iNaturalist' : 'Gemini_AI'
      }
    };

    console.log(`Bloom analysis complete: ${bloomStatus} (${confidence}% confidence)`);
    res.json(response);

  } catch (error) {
    console.error("Error in getBloomStatus:", error);
    
    // Fallback response
    const fallbackResponse = {
      success: false,
      bloomStatus: "Data Unavailable",
      confidence: 0,
      currentMetrics: generateFallbackMetrics(),
      historicalMetrics: generateFallbackMetrics(),
      avgNDVI: 0.5,
      ndviTrend: [],
      score: 0,
      topSpecies: [{
        id: null,
        name: "Local Flora",
        common_name: "Regional Plants",
        details: "Bloom data is temporarily unavailable. Please try again later.",
        photos: []
      }],
      dataSources: {
        climate: 'FALLBACK',
        ndvi: 'FALLBACK',
        species: 'FALLBACK'
      },
      error: "Service temporarily unavailable"
    };
    
    res.status(200).json(fallbackResponse); // Return 200 with fallback data
  }
}

// Helper functions
function calculateBloomScore(currentMetrics, historicalMetrics, avgNDVI, ndviData) {
  let score = 0;
  
  // Temperature scoring
  if (currentMetrics.avgTemperature > historicalMetrics.avgTemperature + 1) score += 2;
  else if (currentMetrics.avgTemperature > historicalMetrics.avgTemperature) score += 1;
  
  // Precipitation scoring
  if (currentMetrics.totalPrecipitation >= historicalMetrics.totalPrecipitation * 0.8 &&
      currentMetrics.totalPrecipitation <= historicalMetrics.totalPrecipitation * 1.2) {
    score += 1;
  }
  
  // NDVI scoring
  if (avgNDVI > 0.6) score += 3;
  else if (avgNDVI > 0.4) score += 1;
  
  return Math.max(0, score);
}

function getBloomStatusFromScore(score) {
  if (score >= 5) return { bloomStatus: "Likely to Bloom", confidence: 80 };
  if (score >= 3) return { bloomStatus: "Possibly Blooming", confidence: 60 };
  if (score >= 1) return { bloomStatus: "Limited Bloom Potential", confidence: 40 };
  return { bloomStatus: "Unlikely to Bloom", confidence: 20 };
}

async function getFeaturedSpecies(topSpecies, lat, lon) {
  if (topSpecies.length > 0) {
    try {
      const details = await fetchSpeciesDetails(topSpecies[0].common_name);
      return { ...topSpecies[0], details };
    } catch (error) {
      console.error('Gemini API error:', error.message);
      return { ...topSpecies[0], details: "Species details unavailable" };
    }
  }
  
  // Fallback to Gemini for famous local plants
  try {
    const details = await fetchSpeciesDetails("", lat, lon);
    return {
      id: null,
      name: "Local Flora",
      common_name: "Regional Flowering Plants",
      details,
      photos: []
    };
  } catch (error) {
    return {
      id: null,
      name: "Local Flora",
      common_name: "Regional Plants",
      details: "Various flowering plants native to this region",
      photos: []
    };
  }
}

function generateMockNDVIData(startDate, endDate) {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Generate monthly NDVI data
  let current = new Date(start);
  while (current <= end) {
    data.push({
      date: current.toISOString().split('T')[0],
      ndvi: 0.5 + Math.random() * 0.3, // Realistic NDVI range
      evi: 0.3 + Math.random() * 0.4
    });
    current.setMonth(current.getMonth() + 1);
  }
  
  return data;
}

function generateFallbackMetrics() {
  return {
    avgTemperature: 18.5,
    totalPrecipitation: 45.2,
    avgPrecipitation: 1.5,
    daysAbove15C: 25,
    daysWithRain: 12
  };
}