import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getAuthUrl } from './services/stravaAuth';
import { getActivities } from './services/stravaApi';
import ActivityList from './components/ActivityList';
import StravaCallback from './components/StravaCallback';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [activities, setActivities] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('strava_access_token');
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
      fetchActivities(token);
    }
  }, []);

  const fetchActivities = async (token) => {
    try {
      const data = await getActivities(token);
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Gym Activity Dashboard</h1>
          {!isAuthenticated ? (
            <a href={getAuthUrl()} className="strava-btn">
              Connect with Strava
            </a>
          ) : (
            <nav>
              <span className="user-status">Connected to Strava</span>
            </nav>
          )}
        </header>

        <main>
          {isAuthenticated && (
            <div className="dashboard-container">
              <div className="stats-section">
                <h2>Performance Analytics</h2>
                <Stats activities={activities} />
              </div>
              <div className="history-section">
                <h2>Workout History</h2>
                <ActivityList activities={activities} />
              </div>
            </div>
          )}
          <Routes>
            <Route 
              path="/callback" 
              element={<StravaCallback setAccessToken={setAccessToken} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
