# Home Rentals Admin Dashboard

A simple, polished admin dashboard for reviewing rental properties and checking current weather for a selected property location. This project was built as a take-home technical interview submission with a focus on React fundamentals, routing, practical API integration, responsive UI, and clear trade-offs.

## Live Links

- Live demo URL: _Add Vercel deployment URL here_
- GitHub repository: _Add GitHub repository URL here_

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Plain CSS with responsive, component-oriented classes
- OpenWeatherMap current weather API with mock fallback
- Browser `localStorage` for demo-only authentication

## Features Completed

- Login page with hardcoded demo credentials.
- Friendly validation for missing fields, invalid email format, and invalid credentials.
- Protected dashboard and property detail routes.
- Logout flow that clears the auth flag and redirects to login.
- Responsive property dashboard with five realistic mock rental properties.
- Property detail page with image, address, description, pricing, capacity, and status metadata.
- Reusable weather service that fetches by latitude and longitude.
- Weather loading and error states.
- Mock weather fallback when no OpenWeatherMap API key is configured.
- Deployment-ready environment variable example.

## Demo Login Credentials

```text
Email: admin@homerentals.com
Password: Admin123!
```

## How to Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment example:

   ```bash
   cp .env.example .env.local
   ```

3. Optional: add your OpenWeatherMap API key to `.env.local`:

   ```bash
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) and sign in with the demo credentials above.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | No | Optional OpenWeatherMap API key used by the client-side weather service. If omitted, the app returns realistic mock weather so reviewers can run the project immediately. |

The API key is intentionally loaded from an environment variable and is not committed to source control. Because this is a client-side demo integration, a `NEXT_PUBLIC_` variable is visible in the browser bundle. A production app should proxy weather requests through a backend or serverless route to avoid exposing provider keys.

## Architecture Decisions

- **Next.js App Router:** Chosen for professional project structure, file-based routing, and straightforward Vercel deployment.
- **TypeScript:** Used to make data models, component props, and weather API responses easier to reason about during review.
- **Frontend-only auth:** The assignment does not require a backend, so authentication is deliberately scoped to a local demo flag in `localStorage`. This keeps the project focused on UI flow, route protection, and interview-relevant trade-offs.
- **Mock property data:** Local TypeScript data keeps the app deterministic, easy to demo, and easy to explain within a five-hour time limit.
- **Client-side weather integration:** Weather is fetched from a reusable service using property coordinates. When no API key exists, the service returns mock data after a small delay so loading states remain visible.
- **Plain CSS:** Avoids extra UI dependencies while still providing a polished responsive admin experience.

## Features Descoped or Simplified Due to the 5-Hour Time Limit

- Backend authentication and session management.
- Database persistence for users and properties.
- Admin create, update, and delete workflows.
- Server-side API proxy for weather requests.
- Automated unit/integration tests.
- Role-based permissions.
- Image uploads and asset management.

## Suggested Future Improvements

- Replace demo auth with backend authentication, secure sessions, and password handling.
- Persist properties in a database such as Postgres or Supabase.
- Add CRUD screens for property management.
- Add role-based access control for admin vs. support users.
- Move weather calls to a serverless API route and add caching/revalidation.
- Add unit tests for validation, route protection, and weather mapping.
- Add end-to-end tests for login, logout, and property navigation.
- Add image upload support and optimized image handling.
- Add CI/CD checks for linting, type checking, tests, and preview deployments.

## Deployment Notes for Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add `NEXT_PUBLIC_OPENWEATHER_API_KEY` in Vercel Project Settings if live weather is desired.
4. Deploy. If no key is configured, the deployed app still works with mock weather.
