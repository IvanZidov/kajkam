# 🎨 KajKam - App Design Guidelines

## 1. Core Brand Identity & Logo
The app’s visual identity is deeply tied to the official "Zagreb" branding concept, creating a feeling of an official, trustworthy, yet modern city utility.

*   **App Name:** **KajKam** (Written as one word in text, or stacked as `KAJ?` over `KAM?` in the logo).
*   **The Logo:** Use the generated "Idea 1" logo. It consists of the open top-box with stacked text, the downward arrow, the monoline bottle/paper, and the bottom "smile" curve.
*   **The Shape Motif:** The "broken box" and the "smile curve" are your primary brand shapes. You can use the bottom curve as a subtle background watermark on empty states or loading screens.

## 2. Color Palette
The app uses a strict 60-30-10 color rule to maintain the city's clean aesthetic while allowing for functional recycling colors.

**Primary Brand Colors (The City Look):**
*   **ZG Blue (Primary):** `#005BAB` (Approximate). This is your main UI color. Used for the app bar, primary buttons, active icons, and important text.
*   **Crisp White (Background):** `#FFFFFF`. The app should feel airy, clean, and spacious.
*   **ZG Red (Accent/Alert):** `#E10600` (Approximate). Use *very sparingly*. Only for error states, destructive actions, or the "Report Full Bin" map marker.

**Functional Colors (The Recycling Look):**
*Use these strictly within the AI Scanner results, map markers, and UI tags to denote trash types.*
*   🟡 **Plastic & Metal:** `#FFD700` (Yellow)
*   🔵 **Paper:** Use the primary ZG Blue
*   🟤 **Bio-waste:** `#8B4513` (Brown)
*   🟢 **Glass:** `#228B22` (Green)
*   ⚫ **Mixed Waste:** `#333333` (Dark Grey)

## 3. Typography
The typography must reflect the clean, geometric, and highly legible nature of the logo.

*   **Primary Font:** **Inter** or **Montserrat** (Google Fonts). These fonts have the geometric, sans-serif look that matches the ZAGREB branding.
*   **Headings (H1, H2, App Bar Titles):** 
    *   ALL CAPS. 
    *   Medium or Semi-Bold weight.
    *   Left-aligned (just like the text inside the logo box).
*   **Body Text & AI Chat:**
    *   Sentence case.
    *   Regular weight.
    *   Dark grey (`#1A1A1A`) for readability, never pure black.

## 4. Iconography Style
Look at the bottom right corner of your reference image. This is your strict rule for icons:

*   **Style:** Monoline (Line art).
*   **Weight:** Consistent 2px stroke width.
*   **Fill:** NO solid fills. Icons must be transparent/hollow.
*   **Corners:** Slightly rounded corners on the lines (not sharp pixels) to make them friendly.
*   **Navigation Bar Icons:** Use this monoline style for the Camera, Map, Chat, and Profile icons.

## 5. UI Elements & Components

**A. Mobile-First Layout Constraints:**
Because this is a web app meant to act like a mobile app, constrain the main app container to a maximum width of **450px**. Center this container on desktop screens with a light grey background (`#F4F4F9`) outside the container to emphasize the mobile UI.

**B. Buttons (CTAs):**
*   *Primary Button:* Solid ZG Blue background, White text, ALL CAPS. Corner radius of `4px` or `8px` (slightly sharp to match the top box of the logo).
*   *Secondary Button:* White background, ZG Blue monoline outline (2px stroke), ZG Blue text.

**C. Bottom Navigation Bar:**
*   White background, subtle top shadow.
*   4 equal tabs.
*   *Inactive Tab:* Grey monoline icon.
*   *Active Tab:* ZG Blue icon (slightly thicker stroke, e.g., 3px) with a short blue indicator line underneath it.

**D. Cards & Bottom Sheets (For Map Info & Scanner Results):**
*   White background.
*   Instead of standard rounded corners on all 4 sides, try making the top corners sharp (0px radius) and the bottom corners rounded (16px radius) to subtly mimic the logo shape.
*   Drop shadow: Very soft, large spread (e.g., `box-shadow: 0 4px 20px rgba(0,0,0,0.08)`).

## 6. Tone of Voice & UX Copy
Since the app uses AI and gamification, the tone shouldn't be boring municipal bureaucracy. It should be helpful and uniquely "Zagreb".

*   **Greeting:** Friendly (e.g., *"Bok! Kaj bacamo danas?"* - "Hi! What are we throwing away today?").
*   **AI Loading State:** Playful (e.g., *"Gemini prekopava po tvom smeću..."* - "Gemini is digging through your trash...").
*   **Success States (Gamification):** Encouraging. When a user reports a full bin or scans correctly, use positive reinforcement (e.g., *"Bravo! +5 EkoBodova. Zagreb ti zahvaljuje!"*).
*   **Clarity:** Even if using local slang, ensure the actual instructions (where to throw the trash) are 100% clear and unmistakable.