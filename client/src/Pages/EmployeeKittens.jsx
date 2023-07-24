import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeKittens = () => {
  const [employee, setEmployee] = useState([]);
  const [kittenName, setKittenName] = useState("");
  const [kittenWeight, setKittenWeight] = useState("");
  const { id } = useParams();

  const handleAddKitten = (e, id) => {
    e.preventDefault();
    try {
      const addKitten = async () => {
        const res = await fetch(`/api/employees/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...employee,
            kittens: [
              ...employee.kittens,
              { name: kittenName, weight: kittenWeight },
            ],
          }),
        });
  
        if (!res.ok) throw new Error('Could not add item!');
  
        const data = await res.json();
        setEmployee(data)
        setKittenName("")
        setKittenWeight("")
      };
      addKitten();
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await fetch(`/api/employees/${id}`);
      const data = await res.json();
      setEmployee(data);
    };
    fetchEmployee();
  }, [id]);

  return (
    <div>
      <form onSubmit={(e) => handleAddKitten(e, employee._id)}>
        <h3>Add Kitten for {employee?.name}:</h3>
        <label>
          Kitten name:{" "}
          <input
            type="text"
            value={kittenName}
            onChange={(e) => setKittenName(e.target.value)}
          />
        </label>
        <label>
          Kitten weight:{" "}
          <input
            type="number"
            value={kittenWeight}
            onChange={(e) => setKittenWeight(e.target.value)}
          />
        </label>
        <label>
          <input type="submit" value="Add kitten" />
        </label>
      </form>
      <h3>Kittens owned by {employee?.name}:</h3>
      <ul>
        {employee?.kittens?.map((kitten) => (
          <li key={kitten._id}>
            <span>{kitten.name} </span> - <span> {kitten.weight} kg.</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeKittens;
