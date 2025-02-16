import axios from 'axios';

const STRAVA_API_URL = 'https://www.strava.com/api/v3';

export const getActivities = async (accessToken) => {
  try {
    const response = await axios.get(`${STRAVA_API_URL}/athlete/activities`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const createActivity = async (accessToken, activityData) => {
  try {
    const response = await axios.post(`${STRAVA_API_URL}/activities`, activityData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
}; 