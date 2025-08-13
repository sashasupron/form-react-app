import { Input } from '../input';  
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";



const courses = ['Computer Science', 'Math', 'Physics'];
const taskStatuses = ['To Do', 'Doing', 'Done'];


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  surname: yup.string().max(20, 'Surname must be at most 20 characters'),
  course: yup.string().required('Course is required'),
  subject: yup.string(),
  email: yup.string().email('Invalid email'),
});



const Form = ({ defaultValues = {}, index }) => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues || {
      name: "",
      surname: "",
      course: "",
      subject: "",
      group: "",
      email: "",
      hasExtra: "no",
      extraSelect: "",
      extraText: "",
      projects: [{ name: "", status: "" }]
    },
    resolver: yupResolver(schema)
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects"
  });


  const hasExtra = watch("hasExtra");

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5000/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      navigate("/");
    } else {
      alert("Error sending data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Name" {...register("name")} />
      {errors.name && <p style={{ color: "red", fontSize: "10px" }}>{errors.name.message}</p>}

      <Input placeholder="Surname" {...register("surname")} />
      {errors.surname && <p style={{ color: "red", fontSize: "10px" }}>{errors.surname.message}</p>}
      
      <Input placeholder="Subject" {...register("subject")} />
      {errors.subject && <p style={{ color: "red", fontSize: "10px" }}>{errors.subject.message}</p>}
      
      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p style={{ color: "red", fontSize: "10px" }}>{errors.email.message}</p>}

      <select {...register("course")}>
        <option value="">Select course</option>
        {courses.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {errors.course && <p style={{ color: "red", fontSize: "10px" }}>{errors.course.message}</p>}

      
      <select {...register("group")}>
        <option value="">Select group</option>
        <option value="1/11">1/11</option>
        <option value="2/22">2/22</option>
        <option value="3/33">3/33</option>
      </select>

      
      <fieldset>
        <legend>Additional info?</legend>
        <label>
          <input type="radio" value="no" {...register("hasExtra")} />
          No
        </label>
        <label>
          <input type="radio" value="yes" {...register("hasExtra")} />
          Yes
        </label>
      </fieldset>

      {hasExtra === "yes" && (
        <>
          <select {...register("extraSelect")}>
            <option value="">Core subject</option>
            <option value="option1">Standard subject</option>
          </select>
          {errors.extraSelect && (
            <p style={{ color: "red" }}>{errors.extraSelect.message}</p>
          )}
          <Input placeholder="Comments" {...register("extraText")} />
        </>
      )}

       <fieldset id='proj-tasks'>
        <legend>Projects and tasks</legend>
        {fields.map((field, i) => (
          <div key={field.id}>
            <Input placeholder="Task Name" {...register(`projects.${i}.name`)} />
            {errors.projects?.[i]?.name && (
              <p style={{ color: "red" }}>{errors.projects[i].name.message}</p>
            )}
            <select {...register(`projects.${i}.status`)}>
              <option value="">Select status</option>
              {taskStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.projects?.[i]?.status && (
              <p style={{ color: "red" }}>{errors.projects[i].status.message}</p>
            )}
            <button className="button-change" type="button" onClick={() => remove(i)}>
              Remove Task
            </button>
          </div>
        ))}
        <button className="button-change" type="button" onClick={() => append({ name: "", status: "" })}>
          Add Task
        </button>
      </fieldset>

      <button className="button" type="submit">Submit</button>
    </form>
  );
}

export { Form };
