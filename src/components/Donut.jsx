import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ totalInvestment, totalReturn }) => {
  // Use useMemo to stabilize data and options
  const data = useMemo(() => ({
    labels: ['Invested amount', 'Est. returns'],
    datasets: [
      {
        data: [totalInvestment, totalReturn], // Example data (replace with your values)
        backgroundColor: ['#e6e6ff', '#4c6ef5'], // Light and dark blue
        hoverBackgroundColor: ['#d9d9ff', '#3c56cc'],
      },
    ],
  }), [totalInvestment, totalReturn]);

  const options = useMemo(() => ({
    cutout: '60%', // Creates the blank center
    plugins: {
      legend: {
        position: 'bottom', // Legend position
      },
    },
  }), []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Doughnut
        data={data}
        options={options}
        width={300} // Set width of the canvas
        height={300} // Set height of the canvas
      />
    </div>
  );
};

export default DonutChart;
