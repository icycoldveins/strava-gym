import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../services/stravaAuth';

const StravaCallback = ({ setAccessToken }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      
      if (code) {
        try {
          const data = await getAccessToken(code);
          localStorage.setItem('strava_access_token', data.access_token);
          setAccessToken(data.access_token);
          navigate('/activities');
        } catch (error) {
          console.error('Error during authentication:', error);
          navigate('/');
        }
      }
    };

    handleCallback();
  }, [location, navigate, setAccessToken]);

  return (
    <div className="callback-container">
      <p>Authenticating with Strava...</p>
    </div>
  );
};

export default StravaCallback; 