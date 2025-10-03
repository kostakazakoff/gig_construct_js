# GiG Construct - Construction Services Website

A modern Next.js application built with JavaScript and Tailwind CSS for a construction company.

## Features

- 🌐 **Multi-language support** (Bulgarian/English)
- 📱 **Responsive design** with Tailwind CSS
- ⚡ **Next.js 15** with App Router
- 🎨 **Modern UI components** with Headless UI
- 💾 **Persistent language preferences**
- 🏗️ **Construction services showcase**
- 👥 **Partners section**

## Tech Stack

- **Framework:** Next.js 15
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI, Heroicons
- **State Management:** React Context + Custom Hooks

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── _hooks/           # Custom React hooks
│   │   ├── useLanguageContext.jsx
│   │   └── usePersistedState.js
│   ├── _lib/            # Utility libraries
│   │   └── static_data.js
│   ├── _mock_data/      # Mock data for development
│   │   ├── partners.js
│   │   └── services.js
│   ├── _utils/          # Utility functions
│   │   └── Translator.js
│   ├── about/           # About page
│   │   ├── about_client.jsx
│   │   └── page.js
│   ├── layout.js        # Root layout
│   ├── page.js          # Home page
│   └── globals.css      # Global styles
├── components/          # Reusable components
│   ├── navbar.jsx
│   ├── service_card.jsx
│   └── partner_badge.jsx
└── public/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Language Support

The application supports Bulgarian and English languages. Language preference is automatically saved in localStorage and persists across sessions.

## License

This project is private and proprietary.
