# Interview Notes

## Architecture Decisions

This app uses Next.js with the App Router because it gives the project a professional structure, clean file-based routing, and an easy path to Vercel deployment. The code is intentionally small and readable: reusable UI components live in `components`, mock rental data lives in `data`, and focused utilities such as auth and weather integration live in `lib`.

TypeScript was chosen because it improves clarity without adding much overhead. The property model and weather response types make it easier to explain the shape of data flowing through the app.

## Why Frontend-Only Auth Was Chosen

The assignment prioritizes a working admin flow over production authentication. Frontend-only authentication with hardcoded demo credentials and a `localStorage` flag is not secure, but it demonstrates:

- Login form validation.
- Friendly error handling.
- Protected routes.
- Redirect behavior.
- Logout behavior.
- Refresh-safe demo sessions.

In a production version, I would replace this with backend authentication, secure HTTP-only cookies, session expiration, password hashing, and potentially multi-factor authentication.

## Why Mock Property Data Was Chosen

Mock property data keeps the demo deterministic and avoids spending interview time on backend setup, database schema, migrations, seed scripts, or hosting. This was a deliberate scope decision to focus on the requested UI, routing, component structure, and weather API integration.

The data is tailored to a Costa Rica rental company while still being structured like a realistic API model, with fields such as `id`, `name`, `address`, `city`, `country`, `price`, `imageUrl`, `latitude`, and `longitude`, so it could be replaced with an API response later.

## How the Weather API Integration Works

Each property includes latitude and longitude. The property detail page passes those coordinates to `WeatherCard`, which calls `fetchCurrentWeather` from `lib/weather.ts`.

The weather service:

1. Reads `NEXT_PUBLIC_OPENWEATHER_API_KEY`.
2. If the key exists, calls OpenWeatherMap's current weather endpoint using coordinates and imperial units.
3. Maps the API response into a small app-specific `WeatherData` object.
4. If the key is missing, returns deterministic mock weather based on the city name.

The mock fallback keeps the app reviewable even when a reviewer has not configured an API key.

## How Errors and Loading States Are Handled

`WeatherCard` maintains local `isLoading`, `error`, and `weather` state. It displays:

- A loading state while the request is in flight.
- A friendly error state when the API request fails.
- A weather card when data is available.
- A subtle mock-data pill when fallback weather is being used.

The route protection component also shows a loading state while checking browser storage before rendering protected pages.

## What I Would Improve With More Time

- Backend authentication with secure sessions.
- Database persistence for users and properties.
- Admin CRUD for properties.
- Unit tests for validation, route protection, and weather mapping.
- Role-based access for admins, support users, and read-only users.
- Better API caching with a serverless weather endpoint.
- Image upload support and optimized image delivery.
- CI/CD improvements such as lint, type check, test, and preview deployment gates.
