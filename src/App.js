import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from './components/Dropdown';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchChartData();
  }, [selectedMonth, currentPage, searchTerm]);

  const fetchTransactions = async () => {
    const response = await axios.get(`/api/transactions`, {
      params: {
        month: selectedMonth,
        page: currentPage,
        search: searchTerm,
      },
    });
    setTransactions(response.data.transactions);
  };

  const fetchStatistics = async () => {
    const response = await axios.get(`/api/statistics`, { params: { month: selectedMonth } });
    setStats(response.data);
  };

  const fetchChartData = async () => {
    const response = await axios.get(`/api/chart`, { params: { month: selectedMonth } });
    setChartData({
      labels: response.data.labels,
      data: response.data.data,
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  const handlePreviousPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <Dropdown months={months} selectedMonth={selectedMonth} onSelect={setSelectedMonth} />
      <Statistics stats={stats} />
      <TransactionsTable
        transactions={transactions}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
      <BarChart chartData={chartData} />
    </div>
  );
};

export default App;
