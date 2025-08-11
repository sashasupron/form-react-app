import { Form } from '../../components/form';
import { useLocation } from 'react-router-dom';


const CreatePage = () => {
  const location = useLocation();
  const entityToEdit = location.state?.entity || null;
  const index = location.state?.index;

  return (
    <div>
      <h1>{entityToEdit ? 'Edit Enrollment' : 'Enroll in a university course'}</h1>
      <Form defaultValues={entityToEdit} index={index} />
    </div>
  );
};

export { CreatePage };
