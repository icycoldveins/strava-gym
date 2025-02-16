import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  RadarController
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  RadarController
);

const Stats = ({ activities }) => {
  const [workoutStats, setWorkoutStats] = useState({
    weeklyVolume: [],
    exerciseTypes: {},
    durationTrend: [],
    timeOfDay: {},
    weekdayDistribution: {},
    monthlyProgress: {},
    intensityDistribution: {}
  });

  useEffect(() => {
    processData(activities);
  }, [activities]);

  const processData = (data) => {
    // Process weekly volume
    const weeklyData = processWeeklyVolume(data);
    // Process exercise types
    const typesData = processExerciseTypes(data);
    // Process duration trend
    const trendData = processDurationTrend(data);
    // Process time of day
    const timeOfDayData = processTimeOfDay(data);
    // Process weekday distribution
    const weekdayDistributionData = processWeekdayDistribution(data);
    // Process monthly progress
    const monthlyProgressData = processMonthlyProgress(data);

    setWorkoutStats({
      weeklyVolume: weeklyData,
      exerciseTypes: typesData,
      durationTrend: trendData,
      timeOfDay: timeOfDayData,
      weekdayDistribution: weekdayDistributionData,
      monthlyProgress: monthlyProgressData,
      intensityDistribution: {}
    });
  };

  const processWeeklyVolume = (activities) => {
    const weeklyVolume = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.start_date);
      const week = `${date.getFullYear()}-W${getWeekNumber(date)}`;
      
      weeklyVolume[week] = (weeklyVolume[week] || 0) + activity.elapsed_time / 3600; // Convert to hours
    });

    return Object.entries(weeklyVolume).map(([week, volume]) => ({
      week,
      volume: Math.round(volume * 10) / 10 // Round to 1 decimal
    })).sort((a, b) => a.week.localeCompare(b.week));
  };

  const processExerciseTypes = (activities) => {
    const types = {};
    
    activities.forEach(activity => {
      types[activity.type] = (types[activity.type] || 0) + 1;
    });

    return types;
  };

  const processDurationTrend = (activities) => {
    return activities
      .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
      .map(activity => ({
        date: new Date(activity.start_date).toLocaleDateString(),
        duration: activity.elapsed_time / 60 // Convert to minutes
      }));
  };

  const processTimeOfDay = (activities) => {
    const timeSlots = {
      'Morning (5-11)': 0,
      'Afternoon (11-17)': 0,
      'Evening (17-22)': 0,
      'Night (22-5)': 0
    };

    activities.forEach(activity => {
      const hour = new Date(activity.start_date).getHours();
      if (hour >= 5 && hour < 11) timeSlots['Morning (5-11)']++;
      else if (hour >= 11 && hour < 17) timeSlots['Afternoon (11-17)']++;
      else if (hour >= 17 && hour < 22) timeSlots['Evening (17-22)']++;
      else timeSlots['Night (22-5)']++;
    });

    return timeSlots;
  };

  const processWeekdayDistribution = (activities) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const distribution = {};
    weekdays.forEach(day => distribution[day] = 0);

    activities.forEach(activity => {
      const day = weekdays[new Date(activity.start_date).getDay()];
      distribution[day]++;
    });

    return distribution;
  };

  const processMonthlyProgress = (activities) => {
    const monthly = {};
    activities.forEach(activity => {
      const month = new Date(activity.start_date).toLocaleString('default', { month: 'short' });
      monthly[month] = (monthly[month] || 0) + activity.elapsed_time / 3600;
    });
    return monthly;
  };

  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        color: '#666',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="stats-container">
      <div className="chart-grid">
        <div className="chart-card">
          <Line
            data={{
              labels: workoutStats.weeklyVolume.map(w => w.week),
              datasets: [{
                label: 'Weekly Training Volume',
                data: workoutStats.weeklyVolume.map(w => w.volume),
                borderColor: '#FF4B4B',
                backgroundColor: 'rgba(255, 75, 75, 0.5)',
                tension: 0.4
              }]
            }}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: 'Weekly Training Volume'
                }
              }
            }}
          />
        </div>

        <div className="chart-card">
          <Bar
            data={{
              labels: Object.keys(workoutStats.exerciseTypes),
              datasets: [{
                label: 'Exercise Distribution',
                data: Object.values(workoutStats.exerciseTypes),
                backgroundColor: [
                  '#FF4B4B',
                  '#4BFFB8',
                  '#4B8BFF',
                  '#FFB84B',
                  '#B84BFF'
                ]
              }]
            }}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: 'Exercise Distribution'
                }
              }
            }}
          />
        </div>

        <div className="chart-card">
          <Doughnut
            data={{
              labels: ['Strength', 'Cardio', 'Flexibility'],
              datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                  '#FF4B4B',
                  '#4BFFB8',
                  '#4B8BFF'
                ]
              }]
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Training Focus Distribution',
                  color: '#666',
                  font: {
                    size: 16
                  }
                }
              }
            }}
          />
        </div>

        <div className="chart-card">
          <Radar
            data={{
              labels: Object.keys(workoutStats.weekdayDistribution),
              datasets: [{
                label: 'Workout Frequency by Day',
                data: Object.values(workoutStats.weekdayDistribution),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
              }]
            }}
            options={{
              ...chartOptions,
              scales: {
                r: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>

        <div className="chart-card">
          <Doughnut
            data={{
              labels: Object.keys(workoutStats.timeOfDay),
              datasets: [{
                data: Object.values(workoutStats.timeOfDay),
                backgroundColor: [
                  '#FFB84B',
                  '#4BFFB8',
                  '#4B8BFF',
                  '#B84BFF'
                ]
              }]
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Preferred Workout Times',
                  color: '#666'
                }
              }
            }}
          />
        </div>

        <div className="chart-card">
          <Line
            data={{
              labels: Object.keys(workoutStats.monthlyProgress),
              datasets: [{
                label: 'Monthly Training Hours',
                data: Object.values(workoutStats.monthlyProgress),
                borderColor: '#4BFFB8',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(75, 255, 184, 0.1)'
              }]
            }}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats; 