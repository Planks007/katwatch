# KatWatch - Premium Streaming Platform

A Netflix-style subscription-based VOD streaming platform built with React, Supabase, and Yoco payments.

## Features

- **User Authentication**: Secure signup/login with Supabase Auth
- **Subscription Management**: R89/month recurring payments via Yoco
- **VOD Library**: Netflix-style interface with 12+ movies across multiple categories
- **Automated Account Creation**: Puppeteer automation for IPTV reseller panel integration
- **Full-Screen Video Player**: Immersive streaming experience
- **Real-time Search**: Filter content by title
- **Responsive Design**: Optimized for all screen sizes

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Payments**: Yoco API
- **Automation**: Puppeteer (via Supabase Edge Functions)

## Database Schema

### Users Table
- id (UUID) - Supabase Auth user ID
- email (text)
- reseller_username (text)
- reseller_password (text)
- created_at (timestamp)

### Subscriptions Table
- id (UUID)
- user_id (UUID) - FK to users
- status (active/expired/canceled)
- next_billing_date (date)
- amount (numeric) - 89.00
- yoco_payment_id (text)

### Media Table
- id (UUID)
- title (text)
- description (text)
- thumbnail_url (text)
- stream_url (text)
- category (text)
- rating (numeric)
- runtime (integer)

## Edge Functions

### create-reseller-account
Automatically creates IPTV reseller panel accounts when users sign up.

### yoco-webhook
Handles Yoco payment webhooks to activate/renew subscriptions.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Configure environment variables in Supabase dashboard:
- RESELLER_PANEL_USERNAME
- RESELLER_PANEL_PASSWORD
- YOCO_SECRET_KEY

## Deployment

The application is designed to be deployed on Vercel with Supabase as the backend.

## Color Palette

- Background: #000000 (Black)
- Primary Accent: #FF6B00 (KatWatch Orange)
- Text: #FFFFFF (White)

## License

Proprietary - All rights reserved
