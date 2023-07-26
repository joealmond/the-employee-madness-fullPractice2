import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeAssign = () => {
  const [employee, setEmployee] = useState(null);
  const [divisions, setDivisions] = useState(null);
  const [selectedDivisionId, setSelectedDivisionId] = useState("");
  const { id: employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployee = async () => {
      const res = await fetch(`/api/employees/${employeeId}`);
      const resData = await res.json();
      setEmployee(resData);
      setSelectedDivisionId(resData.division)
    };
    getEmployee();
  }, [employeeId]);

  useEffect(() => {
    const getDivisions = async () => {
      const res = await fetch("/api/divisions");
      const resData = await res.json();
      setDivisions(resData);
    };
    getDivisions();
  }, []);

  const handleAssignDivision = (e) => {
    e.preventDefault();

    const assignDivision = async () => {
        const res = await fetch(`/api/employees/${employeeId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ...employee,
                division: selectedDivisionId
              })
        });
        const resData = await res.json();
        console.log(resData);
        navigate("/")
    }
    assignDivision();

  }

  return (
    <div>
      <h3>Choose Division for {employee?.name}</h3>
      <form onSubmit={handleAssignDivision}>
        <label>
          Divisions:
          <select
            required
            value={selectedDivisionId}
            onChange={(e) => setSelectedDivisionId(e.target.value)}
          >
            <option value="">-- Select Division --</option>
            {divisions?.map((division) => (
              <option key={division._id} value={division._id}>
                {division.name}
              </option>
            ))}
          </select>
          <input type="submit" value="Select" />
        </label>
      </form>
    </div>
  );
};

export default EmployeeAssign;
