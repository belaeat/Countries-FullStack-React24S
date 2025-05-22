# Countries FullStack Application

A modern full-stack application for exploring countries around the world, built with React, TypeScript, and Supabase.

## Features

### Authentication

- User registration and login using Supabase Auth
- Protected routes for authenticated users
- Persistent sessions with PKCE flow
- Secure password handling

### Countries App

- Browse a comprehensive list of countries
- View detailed information about each country including:
  - Basic information (name, flag, population)
  - Geographic details (region, capital)
  - Additional data (languages, currencies, etc.)
- Responsive grid layout for country cards
- Dark/Light theme support
- Implemented pagination
- Filter by categories or search by name.

### Favorites System

- Add countries to favorites
- View favorite countries in a dedicated section
- Remove countries from favorites
- Real-time updates when modifying favorites
- Caching system to reduce API calls

### User Interface

- Modern Material-UI (MUI) components
- Responsive design for all screen sizes
- Dark/Light theme toggle
- Toast notifications for user feedback
- Loading states and error handling
- Clean and intuitive navigation

## Technologies Used

### Frontend

- React 18
- TypeScript
- Material-UI (MUI)
- React Router v6
- React Query
- React Toastify
- Axios
- Redux Toolkit

### Backend

- Supabase
  - Authentication
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Real-time subscriptions

### Development Tools

- Vite
- ESLint
- Prettier
- TypeScript
- Git

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/belaeat/Countries-FullStack-React24S.git
cd Countries-FullStack-React24S
```

2. Install dependencies:

```bash
cd frontend
npm install
```

```bash
  cd backend
  npm install
```

3. Start the development server:

```bash
cd backend
npm run start
```

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5180`

## Features in Detail

### Authentication Flow

- Secure authentication using Supabase Auth
- Protected routes with React Router
- Automatic session management
- User profile management

### Countries Data

- Fetched from REST Countries API
- Cached using React Query
- Real-time updates for favorites
- Optimistic updates for better UX

### Favorites System

- Row Level Security ensures data privacy
- Automatic user_id assignment
- Real-time synchronization
- Optimistic UI updates

### Theme System

- Dynamic theme switching
- Persistent theme preference
- Custom MUI theme configuration
- Responsive design patterns

## Acknowledgments

- REST Countries API for country data
- Material-UI for the component library
- NestJS and Supabase for backend services
