import { useState, useRef, useEffect } from 'react';
import { Input } from '../input';
import { useNavigate } from 'react-router-dom';

const Form = ({ defaultValues = {}, index }) => {
  const [formState, setFormState] = useState({
    name: '',
    surname: '',
    course: '',
    subject: '',
    group: '',
    email: '',
  });

  const navigate = useNavigate();


  useEffect(() => {
    if (defaultValues) {
      setFormState(defaultValues);
    }
  }, [defaultValues]);

  const changedFields = useRef(new Set());

  const handleChange = (field) => (value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    changedFields.current.add(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};
    changedFields.current.forEach(field => {
      if (formState[field] !== '') {
        payload[field] = formState[field];
      }
    });

    if (index !== undefined) {
      payload.index = index;
    }

    const response = await fetch('http://localhost:5000/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      changedFields.current.clear();
    } else {
      alert('Error data sending');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input id="name" placeholder="Name" value={formState.name} onChange={handleChange('name')} />
      <Input id="surname" placeholder="Surname" value={formState.surname} onChange={handleChange('surname')} />
      <Input id="course" placeholder="Course" value={formState.course} onChange={handleChange('course')} />
      <Input id="subject" placeholder="Subject" value={formState.subject} onChange={handleChange('subject')} />
      <Input id="group" placeholder="Group" value={formState.group} onChange={handleChange('group')} />
      <Input id="email" placeholder="Email" value={formState.email} onChange={handleChange('email')} />
      <button className='button' type="submit" onClick={() => (navigate('/'))}>Submit</button>
    </form>
  );
};

export { Form };
