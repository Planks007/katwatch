import axios from 'axios';

const BASE_URL = process.env.REACT_APP_RESELLER_PANEL_URL;
const USERNAME = process.env.REACT_APP_RESELLER_USER;
const PASSWORD = process.env.REACT_APP_RESELLER_PASS;

export interface MediaItem {
  id: string;
  title: string;
  thumbnail_url: string;
  description: string;
  rating: number;
  category: string;
  runtime: number;
}

export interface UserSubscription {
  status: 'active' | 'expired' | 'canceled' | null;
  nextBillingDate: string | null;
}

export const ResellerService = {
  async getUserStreams(email: string): Promise<MediaItem[]> {
    // For metadata only; do not return stream URLs
    // In production, you can fetch this from your panel or your own database
    return [
      {
        id: '1',
        title: 'Movie 1',
        thumbnail_url: '/assets/thumb1.jpg',
        description: 'Action packed movie',
        rating: 4.5,
        category: 'Action',
        runtime: 120
      },
      {
        id: '2',
        title: 'Series 1',
        thumbnail_url: '/assets/thumb2.jpg',
        description: 'Drama series',
        rating: 4.8,
        category: 'Drama',
        runtime: 45
      }
    ];
  },

  async getUserSubscription(email: string): Promise<UserSubscription> {
    // Fetch user subscription from Supabase
    // Placeholder for now; implement Supabase call
    return {
      status: 'active',
      nextBillingDate: '2025-12-20'
    };
  },

  async createSubscription(email: string, planId: string): Promise<boolean> {
    // Call Puppeteer / API to create subscription on reseller panel
    // Return true if successful
    return true;
  },

  async getStreamUrlForUser(email: string, mediaId: string): Promise<string | null> {
    // Check subscription before returning
    const sub = await this.getUserSubscription(email);
    if (sub.status !== 'active') return null;

    // In production, call Puppeteer script or panel API to get M3U URL
    return `http://yourpanel.com/stream/${email}/${mediaId}`;
  }
};
