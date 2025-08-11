import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ListPage = () => {
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch('http://localhost:5000/api/enroll')
      .then(res => res.json())
      .then(data => setEntities(data))
      .catch(console.error);
  }, []);


  const handleDelete = async (index) => {
    const response = await fetch(`http://localhost:5000/api/enroll/${index}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();
      setEntities(data.entities);
    } else {
      alert('Failed to delete entity');
    }
  };


  const handleEdit = (index) => {
    navigate('/create', { state: { entity: entities[index], index } });
  };

  return (
    <div>
      <h1>List of all enrolled students</h1>
      <button className='button' onClick={() => navigate('/create')}>Create enrollment</button>
      
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Course</th>
            <th>Subject</th>
            <th>Group</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, index) => (
            <tr key={index} className='table-row'>
              <td>{entity.name}</td>
              <td>{entity.surname}</td>
              <td>{entity.course}</td>
              <td>{entity.subject}</td>
              <td>{entity.group}</td>
              <td>{entity.email}</td>
              <td>
                <button className='button' onClick={() => handleEdit(index)}>Edit</button>
                <button className='button' onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ListPage };
