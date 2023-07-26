import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DivisionForm = () => {
  const [division, setDivision] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [divisionName, setDivisionName] = useState("");
  const [divisionBoss, setDivisionBoss] = useState("");
  const [divisionCity, setDivisionCity] = useState("");
  const [divisionCountry, setDivisionCountry] = useState("");
  const { divisionId } = useParams();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (divisionId) {
      const updateDivision = async () => {
        const res = await fetch(`/api/divisions/${divisionId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...division,
            name: divisionName,
            boss: divisionBoss,
            location: {
              ...division.location,
              city: divisionCity,
              country: divisionCountry,
            },
          }),
        });
        const resData = await res.json();
        console.log(resData);
        navigate("/divisions");
      };
      updateDivision();
    }

    const createDivision = async () => {
      const res = await fetch("/api/divisions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: divisionName,
          boss: divisionBoss,
          location: {
            city: divisionCity,
            country: divisionCountry,
          },
        }),
      });
      const resData = await res.json();
      console.log(resData);
      navigate("/divisions");

    };
    createDivision();
  };

  useEffect(() => {
    if (divisionId) {
      const getDivision = async () => {
        const res = await fetch(`/api/divisions/${divisionId}`);
        const resData = await res.json();
        setDivision(resData);
        setDivisionName(resData.name);
        setDivisionBoss(resData.boss);
        setDivisionCity(resData.location.city);
        setDivisionCountry(resData.location.country);
      };
      getDivision();
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
      <form onSubmit={handleFormSubmit}>
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
            required
            value={divisionBoss}
            onChange={(e) => setDivisionBoss(e.target.value)}
          >
            {
              <option value={divisionBoss._id ?? ""}>
                {divisionBoss.name ? divisionBoss.name : "-- Select a boss --"}
              </option>
            }
            {employees?.map((employee) => (
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
