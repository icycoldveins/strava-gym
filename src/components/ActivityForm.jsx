import React, { useState } from 'react';
import { createActivity } from '../services/stravaApi';

const ActivityForm = ({ accessToken, onActivityCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'WeightTraining',
    description: '',
    elapsed_time: '',
    start_date_local: new Date().toISOString().slice(0, 16)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createActivity(accessToken, {
        ...formData,
        elapsed_time: parseInt(formData.elapsed_time) * 60 // Convert minutes to seconds
      });
      onActivityCreated();
      setFormData({
        name: '',
        type: 'WeightTraining',
        description: '',
        elapsed_time: '',
        start_date_local: new Date().toISOString().slice(0, 16)
      });
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <div>
        <label htmlFor="name">Workout Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>
      <div>
        <label htmlFor="elapsed_time">Duration (minutes):</label>
        <input
          type="number"
          id="elapsed_time"
          value={formData.elapsed_time}
          onChange={(e) => setFormData({...formData, elapsed_time: e.target.value})}
          required
        />
      </div>
      <div>
        <label htmlFor="start_date_local">Date and Time:</label>
        <input
          type="datetime-local"
          id="start_date_local"
          value={formData.start_date_local}
          onChange={(e) => setFormData({...formData, start_date_local: e.target.value})}
          required
        />
      </div>
      <button type="submit">Log Workout</button>
    </form>
  );
};

export default ActivityForm; 