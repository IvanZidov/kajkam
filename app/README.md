# KAJ-KAM? — Web Application

The main KAJ-KAM? web application — an AI-powered waste management app for Zagreb citizens.

## Features

- **AI Scanner** — Camera/upload waste image → Gemini AI classifies it → shows correct bin
- **Map** — Interactive map with 2,523 Zagreb bin locations, color-coded by waste type
- **Chat** — Gemini-powered recycling Q&A chatbot
- **Profile** — Gamification dashboard with EkoBodovi points and rewards

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with the required keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   APP_URL=your_app_url
   SUPABASE_URL=your_supabase_url
   SUPABASE_PUBLIC_KEY=your_supabase_public_key
   SUPABASE_SECRET_KEY=your_supabase_secret_key
   ```
3. Run the app:
   ```bash
   npm run dev
   ```
