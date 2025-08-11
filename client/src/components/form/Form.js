import { Input } from '../input';
import { useState} from 'react';


const Form = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [course, setCourse] = useState('');
  const [subject, setSubject] = useState('');
  const [group, setGroup] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <Input id="name" placeholder="Name" value={name} onChange={setName} />
      <Input id="surname" placeholder="Surname" value={surname} onChange={setSurname} />
      <Input id="course" placeholder="Course" value={course} onChange={setCourse} />
      <Input id="subject" placeholder="Subject" value={subject} onChange={setSubject} />
      <Input id="group" placeholder="Group" value={group} onChange={setGroup} />
      <Input id="email" placeholder="Email" value={email} onChange={setEmail} />
    </div>
  );
};

export { Form };
