import React from 'react';

const Dropdown = ({ months, selectedMonth, onSelect }) => {
  return (
    <select value={selectedMonth} onChange={(e) => onSelect(e.target.value)}>
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
