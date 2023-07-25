import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DivisionForm = () => {
  const [division, setDivision] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [divisionName, setDivisionName] = useState("");
  const [divisionBoss, setDivisionBoss] = useState("");
  const [divisionCity, setDivisionCity] = useState("");
  const [divisionCountry, setDivisionCountry] = useState("");
  const { divisionId } = useParams();

  const handleCreateDivision = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (divisionId) {
      const getDivisions = async () => {
        const res = await fetch(`/api/divisions/${divisionId}`);
        const resData = await res.json();
        setDivision(resData);
        setDivisionName(resData.name);
        setDivisionBoss(resData.boss);
        setDivisionCity(resData.location.city);
        setDivisionCountry(resData.location.country);
      };
      getDivisions();
    }
  }, [divisionId]);

  useEffect(() => {
    const getEmployees = async () => {
      const res = await fetch("/api/employees");
      const resData = await res.json();
      setEmployees(resData);
    };
    getEmployees();
  }, []);

  return (
    <div>
      <form onSubmit={handleCreateDivision}>
        <label>
          Division name:
          <input
            type="text"
            value={divisionName}
            onChange={(e) => setDivisionName(e.target.value)}
          />
        </label>
        <label>
          Boss:
          <select
            value={divisionBoss}
            onChange={(e) => setDivisionBoss(e.target.value)}
          >
            {divisionBoss.name ?? <option value="">-- Select a boss --</option>}
            {employees &&
              employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          City:
          <input
            type="text"
            value={divisionCity}
            onChange={(e) => setDivisionCity(e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            value={divisionCountry}
            onChange={(e) => setDivisionCountry(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value={divisionId ? "Update Division" : "Create Division"}
        />
      </form>
    </div>
  );
};

export default DivisionForm;
