// src/services/ResellerService.ts
import axios from 'axios';

const BASE_URL = process.env.VITE_RESELLER_PANEL_URL!;
const USERNAME = process.env.VITE_RESELLER_PANEL_USER!;
const PASSWORD = process.env.VITE_RESELLER_PANEL_PASS!;

export interface ResellerMedia {
  id: string;
  title: string;        // consistent with MediaCard / MediaDetailModal
  category: string;
  thumbnail_url: string; // consistent with MediaCard / MediaDetailModal
  rating: number;
  runtime: number;
  stream_url: string;
}

export const ResellerService = {
  async getUserStreams(userId: string): Promise<ResellerMedia[]> {
    try {
      const auth = { username: USERNAME, password: PASSWORD };
      const res = await axios.get(`${BASE_URL}/api/streams?user=${userId}`, { auth });

      // Transform API response to our internal media format
      return res.data.map((item: any) => ({
        id: item.id,
        title: item.title || item.name || 'Untitled',
        category: item.category || 'Unknown',
        thumbnail_url: item.thumbnail_url || '', // fallback empty string
        rating: item.rating ?? 0,
        runtime: item.runtime ?? 0,
        stream_url: item.stream_url || '',
      }));
    } catch (err) {
      console.error('Error fetching streams:', err);
      return [];
    }
  },
};
