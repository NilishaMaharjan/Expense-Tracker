import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

const RecentIncomeWithChart = ({ data = [], totalIncome: propTotalIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData([]);
      setTotalIncome(0);
      return;
    }

    const formattedData = data
      .map(item => ({
        name: item.source || 'Unknown',
        amount: Number(item.amount) || 0,
      }))
      .filter(item => item.amount > 0);

    setChartData(formattedData);

    // Calculate total from chartData (fallback to prop if empty)
    const total = formattedData.reduce((acc, item) => acc + item.amount, 0);
    setTotalIncome(total || Number(propTotalIncome || 0));
  }, [data, propTotalIncome]);

  if (!chartData.length) {
    return (
      <div className="card">
        <h5 className="text-lg mb-2">Last 60 Days Income</h5>
        <p className="text-gray-400">No income data available.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;