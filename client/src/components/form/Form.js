import { useState, useRef, useEffect } from 'react';
import { Input } from '../input';  // твой кастомный input
import { useNavigate } from 'react-router-dom';

const courses = ['Computer Science', 'Math', 'Physics'];
const statuses = ['Pending', 'In Progress', 'Completed'];
const taskStatuses = ['To Do', 'Doing', 'Done'];

const Form = ({ defaultValues = {}, index }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: '',
    surname: '',
    course: '',
    subject: '',
    group: '',
    email: '',
    hasExtra: 'no', 
    extraSelect: '',
    extraText: '',
    projects: [
      { name: '', status: '' }
    ],
  });

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


  const handleProjectChange = (index, field) => (value) => {
    setFormState(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
    changedFields.current.add('projects');
  };

  const addProject = () => {
    setFormState(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', status: '' }],
    }));
  };

  const removeProject = (index) => {
    setFormState(prev => {
      const newProjects = prev.projects.filter((_, i) => i !== index);
      return { ...prev, projects: newProjects };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};
    changedFields.current.forEach(field => {
      if (field === 'projects') {
        payload.projects = formState.projects;
      } else if (formState[field] !== '') {
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
      navigate('/');
    } else {
      alert('Error data sending');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <Input id="name" placeholder="Name" value={formState.name} onChange={handleChange('name')} />
      <Input id="surname" placeholder="Surname" value={formState.surname} onChange={handleChange('surname')} />
      <Input id="subject" placeholder="Subject" value={formState.subject} onChange={handleChange('subject')} />
      <Input id="email" placeholder="Email" value={formState.email} onChange={handleChange('email')} />

      <label className='label'>
        Course*:
        <select value={formState.course} onChange={e => handleChange('course')(e.target.value)}>
          <option value="">Select course</option>
          {courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label className='label'>
        Group (optional):
        <select value={formState.group} onChange={e => handleChange('group')(e.target.value)}>
          <option value="">Select group</option>
          <option value="1/11">1/11</option>
          <option value="2/22">2/22</option>
          <option value="3/33">3/33</option>
        </select>
      </label>


      <fieldset className='fieldset'>
        <legend className='label'>Additional info?</legend>

         <div className="radio-group">
        <label className='label'>
          <input
            type="radio"
            name="hasExtra"
            value="no"
            checked={formState.hasExtra === 'no'}
            onChange={e => handleChange('hasExtra')(e.target.value)}
          />
          No
        </label>
        <label className='label'>
          <input
            type="radio"
            name="hasExtra"
            value="yes"
            checked={formState.hasExtra === 'yes'}
            onChange={e => handleChange('hasExtra')(e.target.value)}
          />
          Yes
        </label>
        </div>

        

        {formState.hasExtra === 'yes' && (
          <>
            <label className='label'>
              Extra Select:
              <select value={formState.extraSelect} onChange={e => handleChange('extraSelect')(e.target.value)}>
                <option value="">Core subject</option>
                <option value="option1">Core subject</option>
                <option value="option2">Standart subject</option>
              </select>
            </label>
            <Input id="comments" placeholder="Comments" value={formState.extraText} onChange={handleChange('extraText')} />
          </>
        )}
      </fieldset>

      <div>
        <fieldset className='fieldset'>
          <legend className='label'>Projects and tasks</legend>
          {formState.projects.map((project, i) => (
            <div key={i} >
              <Input
                id={`project-name-${i}`}
                placeholder="Task Name"
                value={project.name}
                onChange={handleProjectChange(i, 'name')}
              />
              <select value={project.status} onChange={e => handleProjectChange(i, 'status')(e.target.value)}>
                <option value="">Select status</option>
                {taskStatuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button className='button-change' type="button" onClick={() => removeProject(i)}>Remove Task</button>
            </div>
          ))}
          <button className='button-change' type="button" onClick={addProject}>Add Task</button>
        </fieldset> 
      </div>

      <button className='button' type="submit">Submit</button>
    </form>
  );
};

export { Form };
