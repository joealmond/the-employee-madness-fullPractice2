import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeKittens = () => {
  const [employee, setEmployee] = useState([]);
  const [kittenName, setKittenName] = useState(null);
  const [kittenWeight, setKittenWeight] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await fetch(`/api/employees/${id}`);
      const data = await res.json();
      setEmployee(data);
    };
    fetchEmployee();
  }, [id]);

  return (
    <ul>
      {employee?.kittens?.map((kitten) => (
        <li key={kitten._id}>
          <input
            type="text"
            value={kittenName ?? kitten.name}
            onChange={(e) => setKittenName(e.target.value)}
          />
          {" - "}
          <input
            type="text"
            value={kittenWeight ?? kitten.weight}
            onChange={(e) => setKittenWeight(e.target.value)}
          />{" "}
          kg.
        </li>
      ))}
    </ul>
  );
};

export default EmployeeKittens;
