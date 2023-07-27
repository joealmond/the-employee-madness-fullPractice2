import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeAddress = () => {
  const [employee, setEmployee] = useState({});
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployee = async () => {
      const res = await fetch(`/api/employees/${id}`);
      const resData = await res.json();
      setEmployee(resData);
      setCity(resData.address?.city);
      setCountry(resData.address?.country);
      setZipCode(resData.address?.zipCode);
    };
    getEmployee();
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      const updateAddress = async () => {
        const res = await fetch(`/api/employees/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...employee,
            address: {
              ...employee.address,
              city,
              country,
              zipCode,
            },
          }),
        });
        if (!res.ok) throw new Error("Could not save.");
        const resData = await res.json();

        navigate("/");
      };
      updateAddress();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!isEdit ? (
        <div>
          <h3>{employee.name} address:</h3>
          <p>City: {employee.address?.city}</p>
          <p>Country: {employee.address?.country}</p>
          <p>ZipCode: {employee.address?.zipCode}</p>
          <input
            type="button"
            value="Edit"
            onClick={() => setIsEdit(!isEdit)}
          />
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h3>Edit {employee.name} address:</h3>
          <label>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <label>
            ZipCode:
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </label>
          <input type="submit" value="Save" />
        </form>
      )}
    </div>
  );
};

export default EmployeeAddress;
