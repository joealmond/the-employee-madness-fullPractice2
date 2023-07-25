import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const onDelete = (id) => {
    const handleDelete = async () => {
      const res = await fetch(`/api/divisions/${id}`, {
        method: "DELETE"
      });
      const resData = await res.json();
      console.log("deleted:",resData)
      setDivisions(divisions.filter((division)=>division._id !== id))
    };
    handleDelete();
  };

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
              <td>{division.boss.name}</td>
              <td>{division.location.city}</td>
              <td>{division.location.country}</td>
              <td>
                <Link to={`/divisions/update/${division._id}`} ><button>Update</button></Link>
                <button onClick={()=>onDelete(division._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DivisionList;
