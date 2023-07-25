import React, { useEffect, useState } from "react";

const DivisionList = () => {
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    const getDivisions = async () => {
      const res = await fetch("/api/divisions");
      const resData = await res.json();
      setDivisions(resData);
    };
    getDivisions();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Boss</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {divisions.map((division) => (
            <tr key={division._id}>
              <td>{division.name}</td>
              <td>{division.boss}</td>
              <td>{division.location.city}</td>
              <td>{division.location.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DivisionList;
