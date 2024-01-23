import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

const Dataas = () => {
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/company")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });
  }, []);

  const applyFilter = () => {
    if (!filterValue) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        const [field, condition, value] = filterValue.split(" ");
        if (condition === "===") {
          return item[field] === value;
        } else if (condition === ">") {
          return item[field] > value;
        } else if (condition === "<") {
          return item[field] < value;
        }
        return false;
      });
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [filterValue, data]);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          style={{
            height: "50px",
            width: "280px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
          placeholder="Enter filter value"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <table id="dataaaa">
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key, i) => (
                <td key={i}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dataas;