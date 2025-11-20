// src/services/ResellerService.ts
import axios from 'axios';

const BASE_URL = process.env.VITE_RESELLER_PANEL_URL!;
const USERNAME = process.env.VITE_RESELLER_PANEL_USER!;
const PASSWORD = process.env.VITE_RESELLER_PANEL_PASS!;

export interface ResellerMedia {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  rating: number;
  runtime: number;
  stream_url: string;
}

export const ResellerService = {
  async getUserStreams(userId: string): Promise<ResellerMedia[]> {
    try {
      const auth = { username: USERNAME, password: PASSWORD };
      const res = await axios.get(`${BASE_URL}/api/streams?user=${userId}`, { auth });

      // Transform API response to our media format
      return res.data.map((item: any) => ({
        id: item.id,
        name: item.title,
        category: item.category,
        thumbnail: item.thumbnail_url,
        rating: item.rating ?? 0,
        runtime: item.runtime ?? 0,
        stream_url: item.stream_url,
      }));
    } catch (err) {
      console.error('Error fetching streams:', err);
      return [];
    }
  },
};
