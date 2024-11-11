import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from '../store/searchSlice';
import ResultCard from '../components/ResultCard';
import axios from 'axios';
import "./Dashboard.css"; // Add a CSS file for styling

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5005/api/museumapi", {
        params: { query },
      });
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="content">
        <h1>Museum Search</h1>
        <form onSubmit={handleSearch}>
          <label>
            Search:
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <button type="submit">Search</button>
        </form>

        <div className="results">
          {results.map((item, index) => (
            <div key={index} className="card">
              <img
                src={item.multimedia[0]?.preview?.location || "https://via.placeholder.com/150"}
                alt={item.name[0]?.summary_title || "Unnamed Item"}
                className="card-image"
              />
              <h3>{item.name[0]?.summary_title || "Unnamed Item"}</h3>
              <p>{item.categories[0]?.summary_title || "No category"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;