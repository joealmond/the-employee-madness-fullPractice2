import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DivisionDetails = () => {
  const [divisionEmployees, setDivisionEmployees] = useState([]);
  const [division, setDivision] = useState({});
  const { divisionId } = useParams();

  useEffect(() => {
    const getDivision = async () => {
      const res = await fetch(`/api/divisions/${divisionId}`);
      const resData = await res.json();
      setDivision(resData);
    };
    getDivision();
  }, [divisionId]);

  useEffect(() => {
    const getEmployees = async () => {
      const res = await fetch(`/api/employees`);
      const resData = await res.json();
      setDivisionEmployees(
        resData.filter((item) => item?.division?._id === divisionId)
      );
    };
    getEmployees();
  }, [divisionId]);

  return (
    <div>
      <h3>{division.name} division details:</h3>
      <p>Boss: {division.boss?.name}</p>
      <p>City: {division.location?.city}</p>
      <p>Country: {division.location?.country}</p>
      <h4>Employees registered in the division:</h4>
      <ul>
        {divisionEmployees.map((emplolyee) => (
          <li key={emplolyee._id}>{emplolyee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DivisionDetails;
