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
  /**
   * Fetch all streams available for a specific user.
   * @param userId - ID of the user to fetch streams for.
   * @returns Array of ResellerMedia objects.
   */
  async getUserStreams(userId: string): Promise<ResellerMedia[]> {
    try {
      const auth = { username: USERNAME, password: PASSWORD };

      const res = await axios.get(`${BASE_URL}/api/streams?user=${userId}`, { auth });

      if (!Array.isArray(res.data)) {
        console.warn('Unexpected response format from reseller API:', res.data);
        return [];
      }

      return res.data.map((item: any) => ({
        id: item.id ?? '',
        name: item.title ?? 'Untitled',
        category: item.category ?? 'Uncategorized',
        thumbnail: item.thumbnail_url ?? '/placeholder.jpg',
        rating: item.rating ?? 0,
        runtime: item.runtime ?? 0,
        stream_url: item.stream_url ?? '',
      }));
    } catch (err) {
      console.error('Error fetching streams:', err);
      return [];
    }
  },
};
