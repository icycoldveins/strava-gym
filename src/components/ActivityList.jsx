import React from 'react';

const ActivityList = ({ activities }) => {
  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-card">
          <h3>{activity.name}</h3>
          <p>Date: {new Date(activity.start_date).toLocaleDateString()}</p>
          <p>Type: {activity.type}</p>
          <p>Duration: {Math.floor(activity.elapsed_time / 60)} minutes</p>
          {activity.description && <p>Notes: {activity.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default ActivityList; 