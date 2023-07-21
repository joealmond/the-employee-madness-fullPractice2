import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";

const EmployeeTable = ({ employees, onDelete, onSearch }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(selectedOption, searchText)
  }

  return (
    <div className="EmployeeTable">
      <label>
        Search:
        <input type="search" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value={""}>All fields</option>
          <option value={"level"}>Level</option>
          <option value={"position"}>Position</option>
        </select>
        <input type="submit" onClick={handleSearch} />
      </label>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
