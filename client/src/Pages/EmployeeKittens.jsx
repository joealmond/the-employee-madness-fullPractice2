import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeKittens = () => {
  const [employeeKittens, setEmployeeKittens] = useState([]);
  const [kittenName, setKittenName] = useState("");
  const [kittenWeight, setKittenWeight] = useState("");

  const { id } = useParams();

  const handleAddKitten = (e) => {
    e.preventDefault();

    try {
      const addKitten = async () => {
        const res = await fetch(`/api/kittens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: kittenName,
            weight: kittenWeight,
            employee: id,
          }),
        });

        if (!res.ok) throw new Error("Could not add item!");

        const resData = await res.json();
        setEmployeeKittens([...employeeKittens, resData]);
        setKittenName("");
        setKittenWeight("");
      };
      addKitten();
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchKittens = async () => {
      const res = await fetch("/api/kittens");
      const kittens = await res.json();
      const kittensData = kittens.filter((kitten) => kitten.employee === id);
      setEmployeeKittens(kittensData);
    };
    fetchKittens();
  }, [id]);

  console.log(kittenName, kittenWeight);

  return (
    <div>
      <h3>Add kitten:</h3>
      <form onSubmit={handleAddKitten}>
        <label>
          Name:
          <input
            type="text"
            value={kittenName}
            onChange={(e) => setKittenName(e.target.value)}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            value={kittenWeight}
            onChange={(e) => setKittenWeight(e.target.value)}
          />
        </label>
        <input type="submit" value="Add kitten" />
      </form>
      <h3>Employee's kittens:</h3>
      <ul>
        {employeeKittens?.map((kitten) => (
          <li key={kitten._id}>
            <span>{kitten.name}</span>
            {" - "}
            <span>{kitten.weight}</span>kg.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeKittens;
