import React, { useEffect, useState } from "react";

const TopPaid = () => {
  const [topEmployees, setTopEmployees] = useState();

  useEffect(() => {
    const getEmployees = async () => {
      const res = await fetch("/api/employees");
      const resData = await res.json();
      setTopEmployees(
        resData.sort((a, b) => b.currentSalary - a.currentSalary).slice(0, 3)
      );
    };
    getEmployees();
  }, []);

  console.log(topEmployees);

  return (
    <div>
      <h3>TopPaid Employees:</h3>
      <ul>
        {topEmployees?.map(employee=>(
            <li><span>{employee.name}</span>{" - "}<span>{employee.currentSalary} Ft.</span></li>
        ))}
      </ul>
    </div>
  );
};

export default TopPaid;
