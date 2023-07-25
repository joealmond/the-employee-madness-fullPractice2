import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EmployeeKittens = () => {
  const [employeeKittens, setEmployeeKittens] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchKittens = async () => {
      const res = await fetch('/api/kittens');
      const kittens = await res.json();
      const kittensData = kittens.filter((kitten) => kitten.employee === id)
      setEmployeeKittens(kittensData);
    }
    fetchKittens();
  },[id])

console.log(employeeKittens)

  return (
<div>
      <ul>{employeeKittens?.map((kitten)=>(
        <li key={kitten._id}><span>{kitten.name}</span>{" - "}<span>{kitten.weight}</span>kg.</li>
      ))}</ul>
</div>
  )
}

export default EmployeeKittens