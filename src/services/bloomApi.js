import { formatDateToMDY } from '../utils/dateUtils';

const API_BASE = 'http://localhost:3000/api'; // Your backend URL

export class BloomAPI {
  static async getBloomStatus(location, dateRange) {
    const response = await fetch(`${API_BASE}/bloom-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: location.lat,
        lon: location.lon,
        locationName: location.name,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })
    });
    return await response.json();
  }

  static async getNDVIData(location, dateRange) {
    const response = await fetch(`${API_BASE}/ndvi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: location.lat,
        lon: location.lon,
        locationName: location.name,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })
    });
    return await response.json();
  }

  static async getObservations(location, dateRange) {
    const response = await fetch(`${API_BASE}/observations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: location.lat,
        lon: location.lon,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        radius: 10
      })
    });
    return await response.json();
  }
}