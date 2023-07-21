import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleSearch = (selectedOption, searchText) => {
    console.log(selectedOption, searchText);

    switch (selectedOption) {
      case "":
        setEmployees(
          employees.filter((employee) =>
            employee.level.toLowerCase().includes(searchText) ||
            employee.position.toLowerCase().includes(searchText) ||
            employee.name.toLowerCase().includes(searchText)
          )
        );
        break;
      case "level":
        setEmployees(
          employees.filter((employee) =>
            employee.level.toLowerCase().includes(searchText)
          )
        );
        break;
      case "position":
        setEmployees(
          employees.filter((employee) =>
            employee.position.toLowerCase().includes(searchText)
          )
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable
      employees={employees}
      onDelete={handleDelete}
      onSearch={handleSearch}
    />
  );
};

export default EmployeeList;
