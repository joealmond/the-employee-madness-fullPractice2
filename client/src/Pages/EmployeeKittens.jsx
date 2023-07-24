import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeKittens = () => {
  const [employee, setEmployee] = useState();
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
      {employee?.kittens.map((kitten) => (
        <li key={kitten._id}>
          <span>{kitten.name} </span> - <span> {kitten.weight} kg.</span>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeKittens;
