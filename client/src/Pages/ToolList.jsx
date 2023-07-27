import React, { useEffect, useState } from "react";

const ToolList = () => {
  const [tools, setTools] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [weight, setWeight] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getTools = async () => {
      const res = await fetch("/api/tools");
      const resData = await res.json();
      const filteredData = resData.filter((item) =>
        item.name.toLowerCase().includes(nameQuery)
      );
      setTools(filteredData);
    };
    getTools();
  }, [nameQuery]);

  const handleAddTool = (e) => {
    e.preventDefault();
    const addTool = async () => {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          weight,
        }),
      });
      const resData = await res.json();
      console.log(resData);
      setTools([
        ...tools,
        resData
      ])
      setName("");
      setWeight("");
    };
    addTool();
  };

  return (
    <div>
      <h3>Tools:</h3>
      <div>
        <p>Add tool:</p>
        <form onSubmit={handleAddTool}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <input type="submit" value="Add tool" />
        </form>
      </div>
      <hr />
      <div>
        <label>
          Search by name:{" "}
          <input
            type="text"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
        </label>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool._id}>
              <td>{tool.name}</td>
              <td>{tool.weight} Kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToolList;
