import React from 'react';

const Statistics = ({ stats }) => {
  return (
    <div>
      <h3>Total Sales: {stats.totalSales}</h3>
      <h3>Total Sold Items: {stats.soldItems}</h3>
      <h3>Total Not Sold Items: {stats.notSoldItems}</h3>
    </div>
  );
};

export default Statistics;
