# Strava Gym Dashboard

A React-based web application that integrates with Strava's API to track and visualize your gym workouts. This application provides detailed analytics and insights into your training patterns.

## Features

- Strava OAuth2 Authentication
- Workout Activity Tracking
- Comprehensive Analytics Dashboard including:
  - Weekly Volume Tracking
  - Exercise Type Distribution
  - Duration Trends
  - Time of Day Analysis
  - Weekday Distribution
  - Monthly Progress

## Technologies Used

- React 19
- Vite
- React Router DOM
- Chart.js & React-Chartjs-2
- Axios
- ESLint

## Prerequisites

- Node.js (Latest LTS version recommended)
- Strava API credentials:
  - Client ID
  - Client Secret

## Setup

1. Clone the repository:
    ```bash
    git clone [your-repository-url]
    cd strava-gym
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with your Strava API credentials:
    ```env
    VITE_STRAVA_CLIENT_ID=your_client_id
    VITE_STRAVA_CLIENT_SECRET=your_client_secret
    VITE_REDIRECT_URI=http://localhost:5173/callback
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint
- `npm run preview` - Previews the production build

## Project Structure

strava-gym/
├── src/
│   ├── components/
│   │   ├── ActivityForm.jsx
│   │   ├── ActivityList.jsx
│   │   ├── Stats.jsx
│   │   └── StravaCallback.jsx
│   ├── services/
│   │   ├── stravaAuth.js
│   │   └── stravaApi.js
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Strava API](https://developers.strava.com/) for providing the API
- [Chart.js](https://www.chartjs.org/) for the visualization libraries
- [Vite](https://vitejs.dev/) for the build tooling
