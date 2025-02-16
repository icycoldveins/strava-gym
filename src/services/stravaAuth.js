import axios from 'axios';

const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';
const TOKEN_URL = 'https://www.strava.com/oauth/token';

export const getAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    response_type: 'code',
    scope: 'activity:read_all,activity:write'
  });

  return `${STRAVA_AUTH_URL}?${params.toString()}`;
};

export const getAccessToken = async (code) => {
  try {
    const response = await axios.post(TOKEN_URL, {
      client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
      client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code'
    });
    return response.data;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}; 